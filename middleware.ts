import createMiddleware from "next-intl/middleware";

import { defaultLocale, locales, localePrefix } from "./i18n/config";

export default createMiddleware({
  defaultLocale,
  locales,
  localePrefix,
  localeDetection: true
});

export const config = {
  matcher: [
    "/((?!_next|_vercel|.*\\..*).*)"
  ]
};
