import { api } from '../../api/clients';

interface UserFieldRegistration {
    name: string;
    login: string;
    phone: string;
    password: string;
    passwordAgain: string;
}

export const postRegister = (body: UserFieldRegistration) =>
    api.post<{ user: unknown }>('auth/register', body).then((response) => response.data);
export const postLogin = (body: { login: string; password: string }) =>
    api.post<{ user: unknown }>('auth/login', body).then((response) => response.data);
export const fetchMe = () => api.get('auth/me').then((response) => response.data.user);
export const logout = () => api.post('auth/logout').then((response) => response);
export const postRestore = (body: { login: string }) => api.post('auth/restore', body).then((response) => response);
export const postReset = (body: { code: string; password: string; passwordAgain: string }) =>
    api.post('auth/reset-password', body).then((response) => response);
export const getSessions = () => api.get('auth/sessions').then((response) => response.data);
