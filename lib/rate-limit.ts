type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

const LIMITS = {
  profile: { limit: 60, windowMs: 60_000 },
  "api:read": { limit: 30, windowMs: 60_000 },
  "api:write": { limit: 20, windowMs: 60_000 },
} as const;

export type RateLimitScope = keyof typeof LIMITS;

function cleanupExpired(now: number) {
  if (buckets.size < 500) return;

  for (const [key, bucket] of buckets) {
    if (now >= bucket.resetAt) {
      buckets.delete(key);
    }
  }
}

export function rateLimit(
  key: string,
  scope: RateLimitScope
): { success: true } | { success: false; retryAfter: number } {
  const { limit, windowMs } = LIMITS[scope];
  const now = Date.now();
  cleanupExpired(now);

  const bucketKey = `${scope}:${key}`;
  const bucket = buckets.get(bucketKey);

  if (!bucket || now >= bucket.resetAt) {
    buckets.set(bucketKey, { count: 1, resetAt: now + windowMs });
    return { success: true };
  }

  if (bucket.count >= limit) {
    return {
      success: false,
      retryAfter: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  bucket.count += 1;
  return { success: true };
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }

  return "unknown";
}
