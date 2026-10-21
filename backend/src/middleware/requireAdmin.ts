import { NextFunction, Response } from 'express';
import { Role } from '@prisma/client';
import { AuthRequest } from './auth.middleware';
import { AppError } from './AppError';

// Ставится строго после authMiddleware: req.user.role уже свежий из БД.
export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction): void {
    if (!req.user) {
        next(new AppError('Не авторизован', 401));
        return;
    }
    if (req.user.role !== Role.ADMIN) {
        next(new AppError('Недостаточно прав', 403));
        return;
    }
    next();
}
