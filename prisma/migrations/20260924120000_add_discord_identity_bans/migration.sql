ALTER TABLE "Menfess"
ADD COLUMN "ipAddressHash" TEXT;

CREATE INDEX "Menfess_ipAddressHash_idx" ON "Menfess"("ipAddressHash");

CREATE TABLE "BannedSsoIdentity" (
    "id" TEXT NOT NULL,
    "identityHash" TEXT NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BannedSsoIdentity_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "BannedSsoIdentity_identityHash_key"
ON "BannedSsoIdentity"("identityHash");

CREATE TABLE "BannedIpAddress" (
    "id" TEXT NOT NULL,
    "ipHash" TEXT NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BannedIpAddress_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "BannedIpAddress_ipHash_key"
ON "BannedIpAddress"("ipHash");
