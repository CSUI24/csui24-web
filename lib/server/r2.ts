import {
  CopyObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "node:crypto";
import { ApiError } from "@/lib/api/errors";

export const MAX_MENFESS_IMAGE_BYTES = 1_048_576;
export const MAX_MENFESS_IMAGES = 4;

const imageExtensions = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
} as const;

export type MenfessImageMimeType = keyof typeof imageExtensions;

let cachedClient: S3Client | null = null;

function getR2Config() {
  const accountId = process.env.R2_ACCOUNT_ID?.trim();
  const bucket = process.env.R2_BUCKET_NAME?.trim();
  const accessKeyId = process.env.R2_ACCESS_KEY_ID?.trim();
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY?.trim();

  if (!accountId || !bucket || !accessKeyId || !secretAccessKey) {
    throw new ApiError(503, "Image uploads are not configured yet.");
  }

  return { accountId, bucket, accessKeyId, secretAccessKey };
}

function getR2Client() {
  if (cachedClient) return cachedClient;

  const config = getR2Config();
  cachedClient = new S3Client({
    region: "auto",
    endpoint: "https://" + config.accountId + ".r2.cloudflarestorage.com",
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
    requestChecksumCalculation: "WHEN_REQUIRED",
  });
  return cachedClient;
}

export function isMenfessImageMimeType(
  value: string,
): value is MenfessImageMimeType {
  return Object.prototype.hasOwnProperty.call(imageExtensions, value);
}

export async function createMenfessImageUpload(input: {
  contentType: MenfessImageMimeType;
  size: number;
}) {
  const config = getR2Config();
  const key = "menfess/staging/" + randomUUID() + "." + imageExtensions[input.contentType];
  const url = await getSignedUrl(
    getR2Client(),
    new PutObjectCommand({
      Bucket: config.bucket,
      Key: key,
      ContentType: input.contentType,
      ContentLength: input.size,
    }),
    {
      expiresIn: 300,
      signableHeaders: new Set(["content-type", "content-length"]),
    },
  );

  return { key, url, contentType: input.contentType, size: input.size };
}

export function getMenfessImageUrl(key: string) {
  const baseUrl = process.env.R2_PUBLIC_URL?.trim().replace(/\/+$/, "");
  if (!baseUrl) {
    throw new ApiError(503, "Public image delivery is not configured yet.");
  }

  return baseUrl + "/" + key.split("/").map(encodeURIComponent).join("/");
}

const stagedImageKeyPattern =
  /^menfess\/staging\/([\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12})\.(jpg|png|webp|gif)$/i;

function getImageTypeFromExtension(extension: string): MenfessImageMimeType {
  switch (extension.toLowerCase()) {
    case "jpg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
    default:
      return "image/gif";
  }
}

export async function promoteStagedMenfessImages(keys: string[]) {
  if (keys.length === 0) return [];
  if (keys.length > MAX_MENFESS_IMAGES) {
    throw new ApiError(400, "You can attach up to 4 images.");
  }

  const staged = keys.map((key) => {
    const match = stagedImageKeyPattern.exec(key);
    if (!match) {
      throw new ApiError(400, "One of the uploaded images is invalid.");
    }
    return { key, id: match[1], extension: match[2] };
  });

  const config = getR2Config();
  const client = getR2Client();
  const uploads = await Promise.all(
    staged.map(async (image) => {
      let metadata;
      try {
        metadata = await client.send(
          new HeadObjectCommand({ Bucket: config.bucket, Key: image.key }),
        );
      } catch {
        throw new ApiError(
          400,
          "An uploaded image is missing or expired. Please select it again.",
        );
      }

      const expectedType = getImageTypeFromExtension(image.extension);
      if (
        !metadata.ContentLength ||
        metadata.ContentLength > MAX_MENFESS_IMAGE_BYTES ||
        metadata.ContentLength < 1 ||
        metadata.ContentType !== expectedType
      ) {
        throw new ApiError(
          400,
          "Each image must be a supported image format and no larger than 1 MB.",
        );
      }

      return { ...image, contentType: expectedType };
    }),
  );

  const permanentKeys = uploads.map(
    (image) => "menfess/images/" + image.id + "." + image.extension,
  );

  try {
    await Promise.all(
      uploads.map((image, index) =>
        client.send(
          new CopyObjectCommand({
            Bucket: config.bucket,
            Key: permanentKeys[index],
            CopySource: config.bucket + "/" + image.key,
            ContentType: image.contentType,
            MetadataDirective: "REPLACE",
          }),
        ),
      ),
    );
    await Promise.all(
      uploads.map((image) =>
        client.send(
          new DeleteObjectCommand({ Bucket: config.bucket, Key: image.key }),
        ),
      ),
    );
  } catch (error) {
    await Promise.allSettled(
      permanentKeys.map((key) =>
        client.send(new DeleteObjectCommand({ Bucket: config.bucket, Key: key })),
      ),
    );
    throw error;
  }

  return permanentKeys;
}

export async function deleteMenfessImages(keys: string[]) {
  if (keys.length === 0) return;
  const config = getR2Config();
  const client = getR2Client();
  await Promise.all(
    keys.map((key) =>
      client.send(new DeleteObjectCommand({ Bucket: config.bucket, Key: key })),
    ),
  );
}

export async function deleteStagedMenfessImages(keys: string[]) {
  const safeKeys = keys.filter((key) => stagedImageKeyPattern.test(key));
  if (safeKeys.length === 0) return;

  const config = getR2Config();
  const client = getR2Client();
  await Promise.all(
    safeKeys.map((key) =>
      client.send(new DeleteObjectCommand({ Bucket: config.bucket, Key: key })),
    ),
  );
}
