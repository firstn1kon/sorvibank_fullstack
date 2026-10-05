import { z } from 'zod';

const emailField = z.string().regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+$/, 'Некорректный формат email');

const passwordField = z.string().min(8, 'Минимум 8 символов');

const phoneField = z
    .string()
    .transform((v) => v.replace(/\D/g, ''))
    .refine((v) => v.length === 11, 'Введите телефон полностью');

// Фронт разрешает только одно кириллическое слово без пробелов — зеркалим ровно это.
const nameField = z.string().min(2, 'Минимум 2 символа');
// .regex(/^[А-Яа-яЁё]+$/, 'Только кириллица');

const codeField = z
    .string()
    .length(6, 'Код должен содержать 6 цифр')
    .regex(/^[0-9]+$/, 'Код содержит только цифры');

export const registerSchema = z
    .object({
        name: nameField,
        login: emailField,
        phone: phoneField,
        password: passwordField,
        passwordAgain: passwordField,
    })
    .refine((d) => d.password === d.passwordAgain, {
        message: 'Пароли не совпадают',
        path: ['passwordAgain'],
    });

export const loginSchema = z.object({
    login: emailField,
    password: passwordField,
});

export const restoreSchema = z.object({
    login: emailField,
});

export const resetPasswordSchema = z
    .object({
        code: codeField,
        password: passwordField,
        passwordAgain: passwordField,
    })
    .refine((d) => d.password === d.passwordAgain, {
        message: 'Пароли не совпадают',
        path: ['passwordAgain'],
    });

export const changePasswordSchema = z
    .object({
        currentPassword: passwordField,
        password: passwordField,
        passwordAgain: passwordField,
    })
    .refine((d) => d.password === d.passwordAgain, {
        message: 'Пароли не совпадают',
        path: ['passwordAgain'],
    })
    .refine((d) => d.password !== d.currentPassword, {
        message: 'Новый пароль должен отличаться от текущего',
        path: ['password'],
    });
