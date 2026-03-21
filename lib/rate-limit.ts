// Simple in-memory rate limiter — resets on server restart (fine for serverless edge cases)
// For production at scale, swap the store for Redis/Upstash.

const store = new Map<string, { count: number; resetAt: number }>();

/**
 * Returns true if the request should be blocked.
 * @param key    Unique identifier (e.g. IP address)
 * @param limit  Max requests allowed in the window
 * @param windowMs  Window duration in milliseconds
 */
export function isRateLimited(
  key: string,
  limit: number,
  windowMs: number,
): boolean {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (entry.count >= limit) return true;

  entry.count++;
  return false;
}
