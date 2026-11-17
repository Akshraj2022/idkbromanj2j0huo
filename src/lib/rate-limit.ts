const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = process.env.NODE_ENV === 'development' ? 50 : 5;
const CLEANUP_INTERVAL_MS = 60 * 1000; // clean up every 60 seconds

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Periodic cleanup of expired entries
let cleanupTimer: ReturnType<typeof setInterval> | null = null;

function ensureCleanup() {
  if (cleanupTimer) return;
  cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of store) {
      if (now >= entry.resetAt) {
        store.delete(ip);
      }
    }
    // Stop the timer if the map is empty to avoid keeping the process alive
    if (store.size === 0 && cleanupTimer) {
      clearInterval(cleanupTimer);
      cleanupTimer = null;
    }
  }, CLEANUP_INTERVAL_MS);
  // Allow the Node.js process to exit even if the timer is running
  if (cleanupTimer && typeof cleanupTimer === 'object' && 'unref' in cleanupTimer) {
    cleanupTimer.unref();
  }
}

export function checkRateLimit(ip: string): {
  allowed: boolean;
  retryAfter?: number;
} {
  const now = Date.now();
  const entry = store.get(ip);

  // No record or window expired — allow and start a new window
  if (!entry || now >= entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    ensureCleanup();
    return { allowed: true };
  }

  // Within window
  if (entry.count < MAX_REQUESTS) {
    entry.count += 1;
    return { allowed: true };
  }

  // Rate limited
  const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
  return { allowed: false, retryAfter };
}
