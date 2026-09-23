import { LRUCache } from 'lru-cache'

function getIP(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    ''
  )
}

/**
 * Factory to create a per-endpoint rate limiter middleware using an LRU cache.
 * 
 * @param options.windowMs - Time window in milliseconds for the rate limit.
 * @param options.maxRequests - Maximum number of allowed requests per IP in the time window.
 * @param options.maxEntries - Maximum number of unique IPs to track in the cache (optional). Default = 1000
 * 
 * @returns A middleware function that returns a 429 response when the request
 *          is over the limit, or `null` when the request is allowed.
 */
export function createRateLimiter(options: {
  windowMs: number
  maxRequests: number
  maxEntries?: number
}) {
  const { windowMs, maxRequests, maxEntries = 1000 } = options

  const cache = new LRUCache<string, { count: number }>({
    ttl: windowMs,
    max: maxEntries,
  })

  return function rateLimitMiddleware(request: Request): Response | null {
    const ip = getIP(request)
    const record = cache.get(ip) || { count: 0 }

    if (record.count >= maxRequests) {
      return Response.json({
        success: false,
        message: 'Too many requests. Please try again later.',
        data: null,
      }, { status: 429 })
    }

    cache.set(ip, { count: record.count + 1 })
    return null
  }
}

// Rate limit to use globally
// 30 Requests per 5 Minutes
export const globalRateLimit = (maxRequests: number = 30) =>
  createRateLimiter({
    maxRequests,
    windowMs: 5 * 60 * 1000,
  });
