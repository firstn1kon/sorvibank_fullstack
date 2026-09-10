import { Response } from 'express';

export const ACCESS_COOKIE = 'access_token';
export const REFRESH_COOKIE = 'refresh_token';
export const CSRF_COOKIE = 'csrf_token';

const isProd = process.env.NODE_ENV === 'production';

const ACCESS_TOKEN_TTL_MIN = Number(process.env.ACCESS_TOKEN_TTL_MIN ?? 15);
const REFRESH_TOKEN_TTL_DAYS = Number(process.env.REFRESH_TOKEN_TTL_DAYS ?? 30);

const baseOptions = {
    httpOnly: true,
    secure: isProd,
    sameSite: 'strict' as const,
};

interface AuthCookies {
    accessToken: string;
    refreshToken: string;
    csrfToken: string;
}

export function setAuthCookies(res: Response, { accessToken, refreshToken, csrfToken }: AuthCookies): void {
    res.cookie(ACCESS_COOKIE, accessToken, {
        ...baseOptions,
        maxAge: ACCESS_TOKEN_TTL_MIN * 60 * 1000,
        path: '/',
    });

    // Path ограничен /api/auth — refresh-токен нужен только эндпоинтам логина/рефреша/логаута.
    res.cookie(REFRESH_COOKIE, refreshToken, {
        ...baseOptions,
        maxAge: REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000,
        path: '/api/auth',
    });

    setCsrfCookie(res, csrfToken);
}

export function setCsrfCookie(res: Response, csrfToken: string): void {
    // Не httpOnly — фронту нужно прочитать значение и продублировать его в заголовке X-CSRF-Token.
    res.cookie(CSRF_COOKIE, csrfToken, {
        httpOnly: false,
        secure: isProd,
        sameSite: 'strict',
        maxAge: REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000,
        path: '/',
    });
}

export function clearAuthCookies(res: Response): void {
    res.clearCookie(ACCESS_COOKIE, { path: '/' });
    res.clearCookie(REFRESH_COOKIE, { path: '/api/auth' });
    res.clearCookie(CSRF_COOKIE, { path: '/' });
}
