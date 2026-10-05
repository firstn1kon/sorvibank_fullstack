import { RevokeReason } from "@prisma/client";
import { prisma } from "./prisma";

interface CreateRefreshTokenInput {
    userId: string;
    tokenHash: string;
    deviceInfo?: string;
    os?: string;
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

export function revokeRefreshToken(id: string, reason: RevokeReason) {
    return prisma.refreshToken.update({
        where: { id },
        data: { revokedAt: new Date(), revokedReason: reason },
    });
}

export function revokeAllUserRefreshTokens(userId: string, reason: RevokeReason) {
    return prisma.refreshToken.updateMany({
        where: { userId, revokedAt: null },
        data: { revokedAt: new Date(), revokedReason: reason },
    });
}

export function revokeOtherUserRefreshTokens(userId: string, keepId: string, reason: RevokeReason) {
    return prisma.refreshToken.updateMany({
        where: { userId, revokedAt: null, id: { not: keepId } },
        data: { revokedAt: new Date(), revokedReason: reason },
    });
}

export async function findActiveSessions(
    userId: string,
    currenttokenHash: string | null,
) {
    const sessions = await prisma.refreshToken.findMany({
        where: { userId, revokedAt: null, expiresAt: { gt: new Date() } },
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            deviceInfo: true,
            os: true,
            ipAddress: true,
            createdAt: true,
            expiresAt: true,
            tokenHash: true,
        },
    });
    return sessions
        .map(({ tokenHash, ...rest }) => ({
            ...rest,
            current: tokenHash === currenttokenHash,
        }))
        .sort((a, b) => Number(b.current) - Number(a.current));
}
