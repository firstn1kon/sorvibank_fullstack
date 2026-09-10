import { prisma } from './prisma';

export function invalidateUserCodes(userId: string) {
    return prisma.passwordResetCode.deleteMany({ where: { userId } });
}

export function createResetCode(userId: string, code: string, expiresAt: Date) {
    return prisma.passwordResetCode.create({ data: { userId, code, expiresAt } });
}

export function findValidCode(code: string) {
    return prisma.passwordResetCode.findFirst({
        where: { code, used: false, expiresAt: { gt: new Date() } },
    });
}

export function markCodeUsed(id: string) {
    return prisma.passwordResetCode.update({ where: { id }, data: { used: true } });
}
