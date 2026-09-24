-- Move the CAS SSO identity into the existing resource identity columns before
-- removing the duplicate SSO columns. Prefer the newer SSO value if both exist.
UPDATE "Menfess"
SET
  "resourceUsername" = COALESCE("ssoUsername", "resourceUsername"),
  "resourceName" = COALESCE("ssoName", "resourceName"),
  "resourceNpm" = COALESCE("ssoNpm", "resourceNpm"),
  "resourceOrganizationalCode" = COALESCE(
    "ssoOrganizationalCode",
    "resourceOrganizationalCode"
  );

ALTER TABLE "Menfess"
DROP COLUMN "ssoUsername",
DROP COLUMN "ssoName",
DROP COLUMN "ssoNpm",
DROP COLUMN "ssoOrganizationalCode";
