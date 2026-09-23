import { z } from "zod";

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export function json<T>(body: T, init?: ResponseInit) {
  return Response.json(body, init);
}

export function success<T>(message: string, data: T) {
  return json({
    success: true,
    message,
    data,
  });
}

export function failure(
  message: string,
  status: number,
  data: unknown = null,
  headers?: HeadersInit,
) {
  return json(
    {
      success: false,
      message,
      data,
    },
    { status, headers },
  );
}

export function internalServerError(error: unknown, context: string) {
  console.error(context, error);
  return failure("Internal server error", 500);
}

export function methodNotAllowed(methods: readonly string[]) {
  return failure("Method not allowed", 405, null, {
    Allow: methods.join(", "),
  });
}

export async function parseJson<TSchema extends z.ZodType>(
  request: Request,
  schema: TSchema,
): Promise<z.infer<TSchema> | null> {
  const body = await readJson<unknown>(request);
  const result = schema.safeParse(body);
  return result.success ? result.data : null;
}

export function getBearerToken(request: Request) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return null;
  }

  return authorization.slice("Bearer ".length).trim() || null;
}

export async function readJson<T>(request: Request): Promise<T | null> {
  try {
    return (await request.json()) as T;
  } catch {
    return null;
  }
}

export function parsePositiveInt(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined;
}
