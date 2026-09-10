import { prisma } from './prisma';

interface CreateRefreshTokenInput {
    userId: string;
    tokenHash: string;
    deviceInfo?: string;
    ipAddress?: string;
    expiresAt: Date;
}

export function createRefreshToken(data: CreateRefreshTokenInput) {
    return prisma.refreshToken.create({ data });
}

export function findRefreshTokenByHash(tokenHash: string) {
    return prisma.refreshToken.findUnique({ where: { tokenHash } });
}

export function findRefreshTokenById(id: string) {
    return prisma.refreshToken.findUnique({ where: { id } });
}

export function revokeRefreshToken(id: string) {
    return prisma.refreshToken.update({ where: { id }, data: { revokedAt: new Date() } });
}

export function revokeAllUserRefreshTokens(userId: string) {
    return prisma.refreshToken.updateMany({
        where: { userId, revokedAt: null },
        data: { revokedAt: new Date() },
    });
}

export function findActiveSessions(userId: string) {
    return prisma.refreshToken.findMany({
        where: { userId, revokedAt: null, expiresAt: { gt: new Date() } },
        orderBy: { createdAt: 'desc' },
        select: { id: true, deviceInfo: true, ipAddress: true, createdAt: true, expiresAt: true },
    });
}
