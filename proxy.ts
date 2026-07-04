import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next 16 renamed Middleware to Proxy; the contract is unchanged, so
// next-intl's middleware runs here as the default export.
export default createMiddleware(routing);

export const config = {
  // Skip internals and static assets; run on everything else.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
