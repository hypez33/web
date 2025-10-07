import { notFound } from "next/navigation";

import { defaultLocale, locales, type Locale } from "./config";

type LocaleParamRecord = {
  locale?: string;
};

export type LocaleParams =
  | LocaleParamRecord
  | Promise<LocaleParamRecord>;

export async function resolveLocaleParam(
  params: LocaleParams
): Promise<Locale> {
  const resolved = await params;
  const candidate = resolved?.locale;

  if (!candidate) {
    return defaultLocale;
  }

  if (locales.includes(candidate as Locale)) {
    return candidate as Locale;
  }

  notFound();
}
