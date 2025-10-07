"use client";

import {
  useEffect,
  type ReactNode,
  type ComponentType,
  createElement
} from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";

import type { Locale } from "../../i18n/config";
import { QueryProvider } from "./query-provider";

type Props = {
  children: ReactNode;
  locale: Locale;
};

export function AppProviders({ children, locale }: Props) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const themeProps = {
    attribute: "class",
    defaultTheme: "dark",
    enableSystem: false,
    children: <QueryProvider>{children}</QueryProvider>
  };

  return createElement(
    NextThemeProvider as unknown as ComponentType<Record<string, unknown>>,
    themeProps
  );
}
