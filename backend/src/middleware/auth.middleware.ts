import { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../utils/tokens';
import { ACCESS_COOKIE } from '../utils/cookies';
import { AppError } from './AppError';

export interface AuthRequest extends Request {
    user?: { id: string; role: string };
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
    const token = req.cookies?.[ACCESS_COOKIE];

    if (!token) {
        next(new AppError('Не авторизован', 401));
        return;
    }

    try {
        const payload = verifyAccessToken(token);
        req.user = { id: payload.sub, role: payload.role };
        next();
    } catch {
        next(new AppError('Не авторизован', 401));
    }
}
