import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next 16 renamed Middleware to Proxy; the contract is unchanged, so
// next-intl's middleware runs here as the default export.
export default createMiddleware(routing);

export const config = {
  // Skip internals, static assets, and the explicit default-locale prefix.
  // Next 16 can re-run Proxy after next-intl rewrites an unprefixed Slovenian
  // URL to /sl; letting that destination render directly avoids a / -> / loop.
  matcher: "/((?!api|_next|_vercel|sl(?:/|$)|.*\\..*).*)",
};
