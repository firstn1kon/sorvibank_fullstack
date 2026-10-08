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
