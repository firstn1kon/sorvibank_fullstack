import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export interface AccessTokenPayload {
    sub: string;
    role: string;
}

const ACCESS_TOKEN_TTL_MIN = Number(process.env.ACCESS_TOKEN_TTL_MIN ?? 15);

export function signAccessToken(payload: AccessTokenPayload): string {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {
        expiresIn: `${ACCESS_TOKEN_TTL_MIN}m`,
    });
}

export function verifyAccessToken(token: string): AccessTokenPayload {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as AccessTokenPayload;
}

// Refresh-токен — случайная строка, а не JWT: его легко отозвать через БД,
// не нужно проверять подпись, а высокая энтропия делает bcrypt избыточным.
export function generateRefreshToken(): string {
    return crypto.randomBytes(64).toString('hex');
}

export function hashToken(rawToken: string): string {
    return crypto.createHash('sha256').update(rawToken).digest('hex');
}

export function generateCsrfToken(): string {
    return crypto.randomBytes(32).toString('hex');
}
