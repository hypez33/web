import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "de";
export const localePrefix = "always";

const dictionaries = {
  de: () => import("../messages/de.json").then((module) => module.default),
  en: () => import("../messages/en.json").then((module) => module.default)
} as const satisfies Record<Locale, () => Promise<Record<string, unknown>>>;

async function loadMessages(locale: Locale) {
  const loader = dictionaries[locale as keyof typeof dictionaries];

  if (!loader) {
    notFound();
  }

  return loader();
}

export type Messages = Awaited<ReturnType<typeof loadMessages>>;

export async function getMessages(locale: Locale) {
  return loadMessages(locale);
}

export default getRequestConfig(async ({ locale }) => {
  const normalizedLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;

  return {
    locale: normalizedLocale,
    messages: await loadMessages(normalizedLocale)
  };
});

