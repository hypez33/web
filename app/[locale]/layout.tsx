import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import { AppProviders } from "@/components/providers/app-providers";
import { getMessages, locales } from "@/i18n/config";
import {
  resolveLocaleParam,
  type LocaleParams
} from "@/i18n/params";

type Props = {
  children: ReactNode;
  params: LocaleParams;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const locale = await resolveLocaleParam(params);

  setRequestLocale(locale);
  const messages = await getMessages(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AppProviders locale={locale}>{children}</AppProviders>
    </NextIntlClientProvider>
  );
}


