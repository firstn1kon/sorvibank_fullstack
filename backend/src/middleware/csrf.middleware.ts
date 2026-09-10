import { NextFunction, Request, Response } from 'express';
import { CSRF_COOKIE } from '../utils/cookies';
import { AppError } from './AppError';

// Double-submit cookie pattern: значение cookie должно совпадать с заголовком.
// Защищаем только эндпоинты, работающие поверх уже существующей cookie-сессии
// (refresh/logout/logout-all/sessions) — на register/login CSRF ещё нет смысла,
// сессии пока не существует.
export function csrfMiddleware(req: Request, res: Response, next: NextFunction): void {
    const cookieToken = req.cookies?.[CSRF_COOKIE];
    const headerToken = req.header('X-CSRF-Token');

    if (!cookieToken || !headerToken || cookieToken !== headerToken) {
        next(new AppError('Неверный CSRF-токен', 403));
        return;
    }

    next();
}
