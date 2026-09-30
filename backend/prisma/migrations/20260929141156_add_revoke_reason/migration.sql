-- CreateEnum
CREATE TYPE "RevokeReason" AS ENUM ('ROTATED', 'LOGOUT', 'LOGOUT_ALL', 'SESSION_REVOKED', 'REUSE_DETECTED');

-- AlterTable
ALTER TABLE "RefreshToken" ADD COLUMN     "revokedReason" "RevokeReason";
