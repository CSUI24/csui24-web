export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export function json<T>(body: T, init?: ResponseInit) {
  return Response.json(body, init);
}

export function methodNotAllowed(methods: readonly string[]) {
  return json(
    {
      success: false,
      message: "Method not allowed",
      data: null,
    },
    {
      status: 405,
      headers: {
        Allow: methods.join(", "),
      },
    },
  );
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
