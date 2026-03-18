/**
 * Dev server warmup script.
 * Waits for Next.js to be ready, then pre-fetches all known routes so
 * Turbopack compiles them at startup instead of on the user's first visit.
 */

const BASE_URL = "http://localhost:3000";
const MAX_WAIT_MS = 60_000;
const POLL_INTERVAL_MS = 1_000;

const ROUTES = [
  "/pt",
  "/en",
  "/pt/blog",
  "/en/blog",
  "/pt/projects",
  "/en/projects",
  "/pt/blog/hello-world",
  "/en/blog/hello-world",
];

async function waitForServer() {
  const start = Date.now();
  while (Date.now() - start < MAX_WAIT_MS) {
    try {
      await fetch(`${BASE_URL}/pt`, { signal: AbortSignal.timeout(2000) });
      return true;
    } catch {
      await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
    }
  }
  return false;
}

async function warmup() {
  console.log("[warmup] Waiting for dev server...");
  const ready = await waitForServer();
  if (!ready) {
    console.error("[warmup] Server did not start in time.");
    return;
  }

  console.log("[warmup] Server ready — pre-compiling all routes...");
  await Promise.all(
    ROUTES.map(async (route) => {
      try {
        const res = await fetch(`${BASE_URL}${route}`, {
          signal: AbortSignal.timeout(30_000),
        });
        console.log(`[warmup] ${res.status} ${route}`);
      } catch (err) {
        console.warn(`[warmup] failed ${route}:`, err.message);
      }
    })
  );
  console.log("[warmup] All routes pre-compiled.");
}

warmup();
