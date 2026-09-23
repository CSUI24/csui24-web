-- CreateEnum
CREATE TYPE "MenfessApprovalStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "Menfess"
ADD COLUMN "ssoUsername" TEXT,
ADD COLUMN "ssoName" TEXT,
ADD COLUMN "ssoNpm" TEXT,
ADD COLUMN "ssoOrganizationalCode" TEXT,
ADD COLUMN "approvalStatus" "MenfessApprovalStatus" NOT NULL DEFAULT 'APPROVED';

-- CreateIndex
CREATE INDEX "Menfess_approvalStatus_createdAt_idx" ON "Menfess"("approvalStatus", "createdAt");
