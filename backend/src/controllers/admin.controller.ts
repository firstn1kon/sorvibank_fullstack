import { Response } from 'express';
import { RevokeReason, Role } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.middleware';
import { AppError } from '../middleware/AppError';
import { adminUpdateUserSchema, blockUserSchema, listUsersQuerySchema } from '../validation/admin.validation';
import {
    findUserByEmail,
    findUserById,
    findUserByPhone,
    listUsers,
    setUserBlocked,
    toAdminUser,
    updateUserByAdmin,
} from '../models/user.model';
import { findActiveSessions, revokeAllUserRefreshTokens } from '../models/refreshToken.model';
import { normalizePhone } from '../utils/phone';
import { issueResetCode } from '../utils/resetCode';

async function getTargetUser(req: AuthRequest) {
    const user = await findUserById(req.params.id as string);
    if (!user) {
        throw new AppError('Пользователь не найден', 404);
    }
    return user;
}

// Админы управляются только через БД/скрипт make-admin — через API их не блокируем,
// заодно исключаем блокировку самого себя.
function assertNotAdmin(user: { role: Role }) {
    if (user.role === Role.ADMIN) {
        throw new AppError('Нельзя выполнить это действие над администратором', 403);
    }
}

export async function getUsers(req: AuthRequest, res: Response) {
    const query = listUsersQuerySchema.parse(req.query);
    const { items, total } = await listUsers(query);

    res.json({ items: items.map(toAdminUser), total, page: query.page, limit: query.limit });
}

export async function getUser(req: AuthRequest, res: Response) {
    const user = await getTargetUser(req);
    const sessions = await findActiveSessions(user.id, null);

    res.json({ user: toAdminUser(user), sessions });
}

export async function updateUser(req: AuthRequest, res: Response) {
    const data = adminUpdateUserSchema.parse(req.body);
    const user = await getTargetUser(req);

    const update: { email?: string; name?: string; phone?: string; emailVerified?: boolean } = {};

    if (data.email !== undefined) {
        const email = data.email.toLocaleLowerCase();
        if (email !== user.email) {
            const existing = await findUserByEmail(email);
            if (existing) {
                throw new AppError('Пользователь с таким email уже существует', 409);
            }
            update.email = email;
            update.emailVerified = false;
        }
    }

    if (data.phone !== undefined) {
        const phone = normalizePhone(data.phone);
        if (phone !== user.phone) {
            const existing = await findUserByPhone(phone);
            if (existing) {
                throw new AppError('Пользователь с таким телефоном уже существует', 409);
            }
            update.phone = phone;
        }
    }

    if (data.name !== undefined) {
        update.name = data.name;
    }

    const updated = Object.keys(update).length ? await updateUserByAdmin(user.id, update) : user;

    res.json({ user: toAdminUser(updated) });
}

export async function blockUser(req: AuthRequest, res: Response) {
    const data = blockUserSchema.parse(req.body ?? {});
    const user = await getTargetUser(req);
    assertNotAdmin(user);

    const updated = await setUserBlocked(user.id, user.blockedAt ?? new Date(), data.reason ?? null);
    await revokeAllUserRefreshTokens(user.id, RevokeReason.BLOCKED);

    res.json({ user: toAdminUser(updated) });
}

export async function unblockUser(req: AuthRequest, res: Response) {
    const user = await getTargetUser(req);

    const updated = await setUserBlocked(user.id, null, null);

    res.json({ user: toAdminUser(updated) });
}

export async function resetUserPassword(req: AuthRequest, res: Response) {
    const user = await getTargetUser(req);
    assertNotAdmin(user);

    await revokeAllUserRefreshTokens(user.id, RevokeReason.ADMIN_PASSWORD_RESET);
    await issueResetCode(user);

    res.json({ message: 'Сессии пользователя завершены, код восстановления отправлен на почту' });
}
