import axios from 'axios';
import type { AxiosError } from 'axios';

export interface ApiErrorResponse {
    message: string;
    errors?: { field: string; message: string }[];
}

export type ApiError = AxiosError<ApiErrorResponse>;

export const api = axios.create({
    baseURL: '/api',
    withCredentials: true, // отправляет httpOnly cookies
});

// подставляем CSRF-токен из обычной (не httpOnly) cookie
api.interceptors.request.use((config) => {
    const csrf = document.cookie.match(/csrf_token=([^;]+)/)?.[1];
    if (csrf) config.headers['X-CSRF-Token'] = csrf;
    return config;
});

// эндпоинты, где 401 не означает "истёк access-токен" — сессии ещё нет,
// поэтому пытаться рефрешить бессмысленно
const AUTH_ENDPOINTS = [
    '/auth/login',
    '/auth/register',
    '/auth/refresh',
    '/auth/restore',
    '/auth/reset-password',
    '/auth/csrf-token',
];

const isAuthEndpoint = (url?: string) => !!url && AUTH_ENDPOINTS.some((endpoint) => url.includes(endpoint));

// автообновление при 401
let refreshPromise: Promise<unknown> | null = null;

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const original = error.config;
        if (error.response?.status === 401 && !original._retry && !isAuthEndpoint(original.url)) {
            original._retry = true;
            refreshPromise ??= api.post('/auth/refresh').finally(() => {
                refreshPromise = null;
            });
            try {
                await refreshPromise;
            } catch {
                return Promise.reject(error); // реджектим исходной 401-ошибкой, а не ошибкой /refresh
            }
            return api(original);
        }
        return Promise.reject(error);
    },
);
