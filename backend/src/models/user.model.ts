import { Prisma, Role } from '@prisma/client';
import { prisma } from './prisma';

interface CreateUserInput {
    name: string;
    email: string;
    phone: string;
    passwordHash: string;
}

export function findUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
}

export function findUserByPhone(phone: string) {
    return prisma.user.findUnique({ where: { phone } });
}

export function findUserById(id: string) {
    return prisma.user.findUnique({ where: { id } });
}

export function createUser(data: CreateUserInput) {
    return prisma.user.create({ data });
}

export function updateUserPassword(userId: string, passwordHash: string) {
    return prisma.user.update({ where: { id: userId }, data: { passwordHash } });
}

export function updateUserName(userId: string, name: string) {
    return prisma.user.update({ where: { id: userId }, data: { name } });
}

// Минимум полей для authMiddleware: роль и блокировка берутся из БД, а не из JWT,
// чтобы разжалование/блокировка действовали сразу, а не через 15 мин.
export function findUserAuthState(id: string) {
    return prisma.user.findUnique({ where: { id }, select: { id: true, role: true, blockedAt: true } });
}

export type UserSort = 'createdAt_desc' | 'createdAt_asc' | 'email_asc';

interface ListUsersParams {
    page: number;
    limit: number;
    search?: string;
    role?: Role;
    blocked?: boolean;
    sort: UserSort;
}

const USER_SORT_ORDER: Record<UserSort, Prisma.UserOrderByWithRelationInput> = {
    createdAt_desc: { createdAt: 'desc' },
    createdAt_asc: { createdAt: 'asc' },
    email_asc: { email: 'asc' },
};

export async function listUsers({ page, limit, search, role, blocked, sort }: ListUsersParams) {
    const where: Prisma.UserWhereInput = {};

    if (search) {
        const phoneDigits = search.replace(/\D/g, '');
        where.OR = [
            { email: { contains: search, mode: 'insensitive' } },
            { name: { contains: search, mode: 'insensitive' } },
            ...(phoneDigits ? [{ phone: { contains: phoneDigits } }] : []),
        ];
    }
    if (role) {
        where.role = role;
    }
    if (blocked !== undefined) {
        where.blockedAt = blocked ? { not: null } : null;
    }

    const [items, total] = await prisma.$transaction([
        prisma.user.findMany({
            where,
            orderBy: USER_SORT_ORDER[sort],
            skip: (page - 1) * limit,
            take: limit,
        }),
        prisma.user.count({ where }),
    ]);

    return { items, total };
}

export function updateUserByAdmin(
    userId: string,
    data: { email?: string; name?: string; phone?: string; emailVerified?: boolean },
) {
    return prisma.user.update({ where: { id: userId }, data });
}

export function setUserBlocked(userId: string, blockedAt: Date | null, blockedReason: string | null) {
    return prisma.user.update({ where: { id: userId }, data: { blockedAt, blockedReason } });
}

export function toPublicUser(user: {
    id: string;
    name: string | null;
    email: string;
    phone: string;
    role: string;
    emailVerified: boolean;
    createdAt: Date;
}) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt,
    };
}

export function toAdminUser(user: Parameters<typeof toPublicUser>[0] & {
    blockedAt: Date | null;
    blockedReason: string | null;
    updatedAt: Date;
}) {
    return {
        ...toPublicUser(user),
        blockedAt: user.blockedAt,
        blockedReason: user.blockedReason,
        updatedAt: user.updatedAt,
    };
}
