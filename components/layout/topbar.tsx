"use client";

import { Bell, Menu, Search } from "lucide-react";
import { useTranslations } from "next-intl";

import type { Locale } from "../../i18n/config";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

type Props = {
  onMenuClick: () => void;
  locale: Locale;
  trialDaysLeft?: number | null;
};

export function Topbar({ onMenuClick, locale, trialDaysLeft = null }: Props) {
  const tApp = useTranslations("app");
  const tDashboard = useTranslations("dashboard");
  const trialLabel =
    trialDaysLeft == null
      ? null
      : tDashboard("trialBanner", { days: Math.max(trialDaysLeft, 0) });

  return (
    <header className="sticky top-0 z-20 border-b border-muted/80 bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-muted text-foreground transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface lg:hidden"
            aria-label="Show navigation"
          >
            <Menu className="h-4 w-4" aria-hidden />
          </button>
          <div className="hidden sm:flex sm:flex-col">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {tApp("title")}
            </span>
            <span className="text-sm text-muted-foreground">
              {tApp("tagline")}
            </span>
          </div>
        </div>

        <div className="flex flex-1 items-center gap-3 sm:gap-4">
          <div className="relative hidden max-w-md flex-1 items-center sm:flex">
            <Search
              className="absolute left-3 h-4 w-4 text-muted-foreground"
              aria-hidden
            />
            <input
              type="search"
              className="h-10 w-full rounded-full border border-muted bg-card pl-10 pr-4 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              placeholder="Search vehicles, services, reports..."
              autoComplete="off"
            />
          </div>
          <LanguageSwitcher currentLocale={locale} />
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-muted bg-card text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            aria-label="View notifications"
          >
            <Bell className="h-4 w-4" aria-hidden />
          </button>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-muted bg-gradient-to-br from-primary/20 to-primary/60 text-sm font-semibold text-primary shadow-sm shadow-primary/40">
            OW
          </span>
        </div>
      </div>
      {trialLabel ? (
        <div className="border-t border-primary/20 bg-primary/10 px-4 py-2 text-center text-xs font-medium text-primary sm:text-sm">
          {trialLabel}
        </div>
      ) : null}
    </header>
  );
}
