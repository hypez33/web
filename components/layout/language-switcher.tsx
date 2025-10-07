"use client";

import { useTransition } from "react";

import { locales, type Locale } from "../../i18n/config";
import { usePathname, useRouter } from "../../i18n/navigation";

type Props = {
  currentLocale: Locale;
};

export function LanguageSwitcher({ currentLocale }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">Language</span>
      <select
        className="h-9 appearance-none rounded-full border border-muted bg-card px-4 pr-9 text-sm font-medium text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        value={currentLocale}
        onChange={(event) => {
          const nextLocale = event.target.value as Locale;
          startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
          });
        }}
        disabled={isPending}
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {locale.toUpperCase()}
          </option>
        ))}
      </select>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-3 text-xs text-muted-foreground"
      >
        ▾
      </span>
    </label>
  );
}
