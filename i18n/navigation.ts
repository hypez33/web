import { createNavigation } from "next-intl/navigation";

import { defaultLocale, locales } from "./config";

export const localePrefix = "always";

export const localizedPathnames = {
  "/": "/",
  "/vehicles": "/vehicles",
  "/services": "/services",
  "/repairs": "/repairs",
  "/appointments": "/appointments",
  "/reports": "/reports",
  "/notifications": "/notifications",
  "/billing": "/billing",
  "/settings": "/settings",
  "/admin": "/admin"
};

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation({
    locales,
    defaultLocale,
    localePrefix,
    pathnames: localizedPathnames
  });
