-- AlterTable
ALTER TABLE "Menfess"
ADD COLUMN "fingerprint" TEXT,
ADD COLUMN "tweetId" TEXT;

-- CreateTable
CREATE TABLE "BannedFingerprint" (
    "id" TEXT NOT NULL,
    "fingerprint" TEXT NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BannedFingerprint_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Menfess_fingerprint_idx" ON "Menfess"("fingerprint");

-- CreateIndex
CREATE UNIQUE INDEX "Menfess_tweetId_key" ON "Menfess"("tweetId");

-- CreateIndex
CREATE UNIQUE INDEX "BannedFingerprint_fingerprint_key" ON "BannedFingerprint"("fingerprint");
