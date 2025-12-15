export const AUTH_REQUIRED = process.env.AUTH_REQUIRED ?? "true";
export const TRUSTIFY_API_URL =
  process.env.TRUSTIFY_API_URL ??
  process.env.TRUSTIFY_UI_URL ??
  "http://localhost:8080/";

/**
 * API only environment variables
 */
export const AUTH_URL = process.env.PLAYWRIGHT_AUTH_URL;
export const AUTH_CLIENT_ID = process.env.PLAYWRIGHT_AUTH_CLIENT_ID ?? "cli";
export const AUTH_CLIENT_SECRET =
  process.env.PLAYWRIGHT_AUTH_CLIENT_SECRET ?? "secret";

/**
 * UI only environment variables
 */
export const AUTH_USER = process.env.PLAYWRIGHT_AUTH_USER ?? "admin";
export const AUTH_PASSWORD = process.env.PLAYWRIGHT_AUTH_PASSWORD ?? "admin";

/**
 * Log definition
 */
const LOG_LEVELS = { debug: 4, info: 3, warn: 2, error: 1, none: 0 };
const CURRENT_LOG_LEVEL =
  // biome-ignore lint/suspicious/noExplicitAny: allowed
  (LOG_LEVELS as any)[process.env.LOG_LEVEL ?? "info"] || LOG_LEVELS.info;

export const logger = {
  debug: (...args: unknown[]) => {
    CURRENT_LOG_LEVEL >= LOG_LEVELS.debug && console.log("[DEBUG]", ...args);
  },
  info: (...args: unknown[]) => {
    CURRENT_LOG_LEVEL >= LOG_LEVELS.info && console.log("[INFO]", ...args);
  },
  warn: (...args: unknown[]) => {
    CURRENT_LOG_LEVEL >= LOG_LEVELS.warn && console.warn("[WARN]", ...args);
  },
  error: (...args: unknown[]) => {
    CURRENT_LOG_LEVEL >= LOG_LEVELS.error && console.error("[ERROR]", ...args);
  },
};

export const SETUP_TIMEOUT = 240_000;
