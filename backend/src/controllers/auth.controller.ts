import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { RevokeReason } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.middleware';
import { AppError } from '../middleware/AppError';
import {
    registerSchema,
    loginSchema,
    restoreSchema,
    resetPasswordSchema,
    changePasswordSchema,
    updateProfileSchema,
} from '../validation/auth.validation';
import {
    createUser,
    findUserByEmail,
    findUserById,
    findUserByPhone,
    toPublicUser,
    updateUserName,
    updateUserPassword,
} from '../models/user.model';
import {
    createRefreshToken,
    findActiveSessions,
    findRefreshTokenByHash,
    findRefreshTokenById,
    revokeAllUserRefreshTokens,
    revokeOtherUserRefreshTokens,
    revokeRefreshToken,
} from '../models/refreshToken.model';
import { createResetCode, findValidCode, invalidateUserCodes, markCodeUsed } from '../models/passwordResetCode.model';
import { generateCsrfToken, generateRefreshToken, hashToken, signAccessToken } from '../utils/tokens';
import { REFRESH_COOKIE, clearAuthCookies, setAuthCookies, setCsrfCookie } from '../utils/cookies';
import { parseDeviceInfo } from '../utils/deviceInfo';

const REFRESH_TOKEN_TTL_DAYS = Number(process.env.REFRESH_TOKEN_TTL_DAYS ?? 30);
const RESET_CODE_TTL_MINUTES = Number(process.env.RESET_CODE_TTL_MINUTES ?? 15);

function normalizePhone(phone: string): string {
    return phone.replace(/\D/g, '');
}

async function getVerifiedSession(req: AuthRequest | Request) {
    const rawToken = req.cookies?.[REFRESH_COOKIE];
    if (!rawToken) {
        throw new AppError('Не авторизован', 401);
    }

    const record = await findRefreshTokenByHash(hashToken(rawToken));

    if (!record || record.revokedAt || record.expiresAt < new Date()) {
        throw new AppError('Не авторизован', 401);
    }

    return record;
}

async function issueSession(res: Response, req: Request, user: { id: string; role: string }) {
    const accessToken = signAccessToken({ sub: user.id, role: user.role });
    const refreshToken = generateRefreshToken();
    const csrfToken = generateCsrfToken();

    const parsedDeviceInfo = parseDeviceInfo(req.headers['user-agent']);

    await createRefreshToken({
        userId: user.id,
        tokenHash: hashToken(refreshToken),
        deviceInfo: parsedDeviceInfo?.label,
        os: parsedDeviceInfo?.os,
        ipAddress: req.ip,
        expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000),
    });

    setAuthCookies(res, { accessToken, refreshToken, csrfToken });
}

export async function register(req: Request, res: Response) {
    const data = registerSchema.parse(req.body);
    const phone = normalizePhone(data.phone);

    const existing = await findUserByEmail(data.login.toLocaleLowerCase());
    if (existing) {
        throw new AppError('Пользователь с таким email уже существует', 409);
    }

    const existingPhone = await findUserByPhone(phone);
    if (existingPhone) {
        throw new AppError('Пользователь с таким телефоном уже существует', 409);
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = await createUser({
        name: data.name,
        email: data.login.toLocaleLowerCase(),
        phone,
        passwordHash,
    });

    await issueSession(res, req, { id: user.id, role: user.role });

    res.status(201).json({ user: toPublicUser(user) });
}

export async function login(req: Request, res: Response) {
    const data = loginSchema.parse(req.body);

    const user = await findUserByEmail(data.login.toLocaleLowerCase());
    if (!user) {
        throw new AppError('Неверный логин или пароль', 401);
    }

    const passwordMatches = await bcrypt.compare(data.password, user.passwordHash);
    if (!passwordMatches) {
        throw new AppError('Неверный логин или пароль', 401);
    }

    await issueSession(res, req, { id: user.id, role: user.role });

    res.json({ user: toPublicUser(user) });
}

export function csrfToken(req: Request, res: Response) {
    const token = generateCsrfToken();
    setCsrfCookie(res, token);
    res.json({ csrfToken: token });
}

export async function refresh(req: Request, res: Response) {
    const rawToken = req.cookies?.[REFRESH_COOKIE];
    if (!rawToken) {
        throw new AppError('Не авторизован', 401);
    }

    const tokenHash = hashToken(rawToken);
    const record = await findRefreshTokenByHash(tokenHash);

    if (!record) {
        throw new AppError('Не авторизован', 401);
    }

    if (record.revokedAt) {
        if (record.revokedReason === RevokeReason.ROTATED) {
            // Токен уже был обменян на новый при ротации, а его снова пытаются
            // использовать — это и есть признак кражи refresh-токена.
            await revokeAllUserRefreshTokens(record.userId, RevokeReason.REUSE_DETECTED);
            clearAuthCookies(res);
            throw new AppError('Сессия отозвана, войдите заново', 401);
        }

        // Токен отозван легитимно (logout/logoutAll/deleteSession с другого
        // устройства или сессии) — устройство просто не знает об этом и по-прежнему
        // хранит старый cookie. Это не кража, каскадный отзыв всех сессий не нужен.
        clearAuthCookies(res);
        throw new AppError('Сессия отозвана, войдите заново', 401);
    }

    if (record.expiresAt.getTime() < Date.now()) {
        throw new AppError('Сессия истекла, войдите заново', 401);
    }

    const user = await findUserById(record.userId);
    if (!user) {
        throw new AppError('Пользователь не найден', 404);
    }

    await revokeRefreshToken(record.id, RevokeReason.ROTATED);
    await issueSession(res, req, { id: user.id, role: user.role });

    res.json({});
}

export async function logout(req: Request, res: Response) {
    const rawToken = req.cookies?.[REFRESH_COOKIE];

    if (rawToken) {
        const record = await findRefreshTokenByHash(hashToken(rawToken));
        if (record && !record.revokedAt) {
            await revokeRefreshToken(record.id, RevokeReason.LOGOUT);
        }
    }

    clearAuthCookies(res);
    res.json({ message: 'Вы вышли из аккаунта' });
}

export async function logoutAll(req: AuthRequest, res: Response) {
    if (!req.user) {
        throw new AppError('Не авторизован', 401);
    }

    await revokeAllUserRefreshTokens(req.user.id, RevokeReason.LOGOUT_ALL);
    clearAuthCookies(res);
    res.json({ message: 'Вы вышли со всех устройств' });
}

export async function sessions(req: AuthRequest, res: Response) {
    if (!req.user) {
        throw new AppError('Не авторизован', 401);
    }

    const rawToken = req.cookies?.[REFRESH_COOKIE];
    const currentTokenHash = rawToken ? hashToken(rawToken) : null;

    const list = await findActiveSessions(req.user.id, currentTokenHash);
    res.json({ sessions: list });
}

export async function deleteSession(req: AuthRequest, res: Response) {
    if (!req.user) {
        throw new AppError('Не авторизован', 401);
    }

    const id = req.params.id as string;
    const record = await findRefreshTokenById(id);

    if (!record) {
        throw new AppError('Сессия не найдена', 404);
    }
    if (record.userId !== req.user.id) {
        throw new AppError('Нет доступа к этой сессии', 403);
    }

    if (!record.revokedAt) {
        await revokeRefreshToken(record.id, RevokeReason.SESSION_REVOKED);
    }

    res.json({ message: `Вы вышли на устройстве ${record.deviceInfo}` });
}

export async function me(req: AuthRequest, res: Response) {
    if (!req.user) {
        throw new AppError('Не авторизован', 401);
    }

    const user = await findUserById(req.user.id);
    if (!user) {
        throw new AppError('Пользователь не найден', 404);
    }

    res.json({ user: toPublicUser(user) });
}

export async function updateMe(req: AuthRequest, res: Response) {
    if (!req.user) {
        throw new AppError('Не авторизован', 401);
    }
    const data = updateProfileSchema.parse(req.body);

    const user = await findUserById(req.user.id);
    if (!user) {
        throw new AppError('Пользователь не найден', 404);
    }

    const updated = await updateUserName(user.id, data.name);

    res.json({ user: toPublicUser(updated) });
}

export async function restore(req: Request, res: Response) {
    const data = restoreSchema.parse(req.body);

    const user = await findUserByEmail(data.login);
    if (!user) {
        throw new AppError('Пользователь с таким email не найден', 404);
    }

    const code = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = new Date(Date.now() + RESET_CODE_TTL_MINUTES * 60 * 1000);

    await invalidateUserCodes(user.id);
    await createResetCode(user.id, code, expiresAt);

    // TODO: подключить реальную отправку письма (nodemailer / Resend). Пока код логируется.
    console.log(`[DEV] Код восстановления для ${user.email}: ${code} (действует ${RESET_CODE_TTL_MINUTES} мин)`);

    res.json({ message: 'Код отправлен на почту' });
}

export async function resetPassword(req: Request, res: Response) {
    const data = resetPasswordSchema.parse(req.body);

    const record = await findValidCode(data.code);
    if (!record) {
        throw new AppError('Код недействителен или истёк', 400);
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    await updateUserPassword(record.userId, passwordHash);
    await markCodeUsed(record.id);

    res.json({ message: 'Пароль успешно изменён' });
}

export async function changePassword(req: AuthRequest, res: Response) {
    if (!req.user) {
        throw new AppError('Не авторизован', 401);
    }
    const data = changePasswordSchema.parse(req.body);

    // Access-токен живёт до 15 мин после отзыва сессии — для смены пароля
    // дополнительно убеждаемся, что refresh-сессия жива и принадлежит тому же пользователю.
    const session = await getVerifiedSession(req);
    if (session.userId !== req.user.id) {
        throw new AppError('Не авторизован', 401);
    }

    const user = await findUserById(req.user.id);
    if (!user) {
        throw new AppError('Пользователь не найден', 404);
    }

    // 400, а не 401 — чтобы фронтовый обработчик 401 не пытался делать refresh/разлогин.
    const passwordMatches = await bcrypt.compare(data.currentPassword, user.passwordHash);
    if (!passwordMatches) {
        throw new AppError('Неверный текущий пароль', 400);
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    await updateUserPassword(user.id, passwordHash);
    await revokeOtherUserRefreshTokens(user.id, session.id, RevokeReason.LOGOUT_ALL);

    res.json({ message: 'Пароль успешно изменён' });
}
