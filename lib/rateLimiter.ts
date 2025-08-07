import { LRUCache } from 'lru-cache'
import type { NextApiRequest, NextApiResponse } from 'next'

function getIP(req: NextApiRequest): string {
  return (
    req.headers['x-forwarded-for']?.toString().split(',')[0]?.trim() ||
    req.socket.remoteAddress ||
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
 * @returns A middleware function that returns `true` if the request is allowed,
 *          or sends a 429 response and returns `false` if the limit is exceeded.
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

  return function rateLimitMiddleware(req: NextApiRequest, res: NextApiResponse): boolean {
    const ip = getIP(req)
    const record = cache.get(ip) || { count: 0 }

    if (record.count >= maxRequests) {
      res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.',
        data: null,
      })
      return false
    }

    cache.set(ip, { count: record.count + 1 })
    return true
  }
}

// Rate limit to use globally
// 30 Requests per 5 Minutes
export const globalRateLimit = (maxRequests: number = 30) =>
  createRateLimiter({
    maxRequests,
    windowMs: 5 * 60 * 1000,
  });
