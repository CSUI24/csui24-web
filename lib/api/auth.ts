import { failure, getBearerToken } from "@/lib/api";

export function requireAdmin(request: Request) {
  const token = getBearerToken(request);

  if (!token) {
    return failure("Unauthorized: Missing or invalid token", 401);
  }

  if (token !== process.env.ADMIN_API_KEY) {
    return failure("Forbidden: Invalid authorization token", 403);
  }

  return null;
}
