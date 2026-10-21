import { api } from '../../api/clients';
import { DataChangePassword } from '../profile/change-password/ChangePassword';

interface UserFieldRegistration {
    name: string;
    login: string;
    phone: string;
    password: string;
    passwordAgain: string;
}

export interface Session {
    id: string;
    deviceInfo: string | null;
    os: string | null;
    ipAddress: string | null;
    createdAt: string;
    expiresAt: string;
    current: boolean;
}

export type Role = 'USER' | 'ADMIN';
export interface User {
    id: string;
    name: string | null;
    email: string;
    phone: string;
    role: Role;
    emailVerified: boolean;
    createdAt: string;
}

export interface UserForAadmin extends User {
    blockedAt: Date | null;
    blockedReason: string | null;
    updatedAt: Date;
}

export type UsersSort = 'createdAt_desc' | 'createdAt_asc' | 'email_asc';
export interface UsersFilters {
    page?: number;
    limit: number;
    search?: string;
    role?: 'USER' | 'ADMIN';
    blocked?: boolean;
    sort: UsersSort;
}
// Неавторизованные и авторизованные пользователи с role USER
export const postRegister = (body: UserFieldRegistration) => api.post<{ user: unknown }>('auth/register', body).then((response) => response.data);
export const postLogin = (body: { login: string; password: string }) => api.post<{ user: unknown }>('auth/login', body).then((response) => response.data);
export const fetchMe = () => api.get<{ user: User }>('auth/me').then((response) => response.data.user);
export const logout = () => api.post<{ message: string }>('auth/logout').then((response) => response.data);
export const postRestore = (body: { login: string }) => api.post('auth/restore', body).then((response) => response);
export const postReset = (body: { code: string; password: string; passwordAgain: string }) =>
    api.post('auth/reset-password', body).then((response) => response);
export const getSessions = () => api.get<{ sessions: Session[] }>('auth/sessions').then((response) => response.data.sessions);
export const deleteSession = (id: string) => api.delete<{ message: string }>(`auth/sessions/${id}`).then((response) => response.data);
export const logoutAll = () => api.post('/auth/logout-all').then((response) => response.data);
export const postChangePassword = (body: DataChangePassword) => api.post('/auth/change-password', body).then((response) => response.data);
export const patchMe = (body: { name: string }) => api.patch('/auth/me', body).then((response) => response.data.user);

// Только авторизованные с role ADMIN
export const getUsers = (params: UsersFilters) =>
    api.get<{ items: UserForAadmin[]; total: number; page: number; limit: number }>('admin/users', { params }).then((response) => response.data);
