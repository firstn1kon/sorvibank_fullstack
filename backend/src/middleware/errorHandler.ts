import { NextFunction, Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';
import { AppError } from './AppError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): void {
    if (err instanceof ZodError) {
        res.status(400).json({
            message: 'Ошибка валидации',
            errors: err.issues.map((issue) => ({ field: issue.path.join('.'), message: issue.message })),
        });
        return;
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
        res.status(409).json({ message: 'Запись с такими данными уже существует' });
        return;
    }

    if (err instanceof AppError) {
        res.status(err.statusCode).json({ message: err.message });
        return;
    }

    console.error(err);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
}
