import { z } from 'zod';
import { emailField, nameField, phoneField } from './auth.validation';

export const listUsersQuerySchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    search: z.string().trim().min(1).optional(),
    role: z.enum(['USER', 'ADMIN']).optional(),
    blocked: z
        .enum(['true', 'false'])
        .transform((v) => v === 'true')
        .optional(),
    sort: z.enum(['createdAt_desc', 'createdAt_asc', 'email_asc']).default('createdAt_desc'),
});

export const adminUpdateUserSchema = z
    .object({
        email: emailField.optional(),
        name: z.string().trim().pipe(nameField).optional(),
        phone: phoneField.optional(),
    })
    .refine((d) => d.email !== undefined || d.name !== undefined || d.phone !== undefined, {
        message: 'Нужно передать хотя бы одно поле',
    });

export const blockUserSchema = z.object({
    reason: z.string().trim().max(500, 'Максимум 500 символов').optional(),
});
