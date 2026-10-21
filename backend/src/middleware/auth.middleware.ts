import { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../utils/tokens';
import { ACCESS_COOKIE } from '../utils/cookies';
import { findUserAuthState } from '../models/user.model';
import { AppError } from './AppError';

export interface AuthRequest extends Request {
    user?: { id: string; role: string };
}

export async function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    const token = req.cookies?.[ACCESS_COOKIE];

    if (!token) {
        next(new AppError('Не авторизован', 401));
        return;
    }

    let userId: string;
    try {
        userId = verifyAccessToken(token).sub;
    } catch {
        next(new AppError('Не авторизован', 401));
        return;
    }

    try {
        // Роль и блокировка — из БД, а не из JWT: access-токен живёт до 15 мин,
        // а разжалование/блокировка должны действовать сразу.
        const user = await findUserAuthState(userId);
        if (!user) {
            next(new AppError('Не авторизован', 401));
            return;
        }
        // 403, а не 401 — чтобы фронтовый обработчик 401 не уходил в refresh-цикл.
        if (user.blockedAt) {
            next(new AppError('Аккаунт заблокирован', 403));
            return;
        }

        req.user = { id: user.id, role: user.role };
        next();
    } catch (err) {
        next(err);
    }
}
