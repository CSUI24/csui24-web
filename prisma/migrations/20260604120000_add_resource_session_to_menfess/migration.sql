-- AlterTable
ALTER TABLE "Menfess"
ADD COLUMN     "resourceUserId" TEXT,
ADD COLUMN     "resourceUsername" TEXT,
ADD COLUMN     "resourceName" TEXT,
ADD COLUMN     "resourceEmail" TEXT,
ADD COLUMN     "resourceNpm" TEXT,
ADD COLUMN     "resourceOrganizationalCode" TEXT;

-- CreateIndex
CREATE INDEX "Menfess_resourceUserId_idx" ON "Menfess"("resourceUserId");
