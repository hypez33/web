"use client";

import { useState, type ReactNode } from "react";

import type { Locale } from "../../i18n/config";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

export type NavIcon =
  | "dashboard"
  | "vehicles"
  | "services"
  | "repairs"
  | "appointments"
  | "reports"
  | "notifications"
  | "billing"
  | "settings"
  | "admin";

export type NavItem = {
  href: string;
  label: string;
  icon: NavIcon;
  badge?: string;
  soon?: boolean;
};

type Props = {
  locale: Locale;
  navItems: NavItem[];
  children: ReactNode;
  trialDaysLeft?: number | null;
  sidebarSections: {
    overview: string;
    analytics: string;
    platform: string;
  };
  statusLabels: {
    green: string;
    amber: string;
    red: string;
  };
};

export function AppShell({
  children,
  locale,
  navItems,
  trialDaysLeft = null,
  sidebarSections,
  statusLabels
}: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen bg-surface text-foreground">
      <Sidebar
        items={navItems}
        mobileOpen={mobileOpen}
        onMobileChange={setMobileOpen}
        sections={sidebarSections}
        statusLabels={statusLabels}
      />
      <div className="flex min-h-screen flex-1 flex-col lg:pl-72">
        <a
          href="#main"
          className="focus-visible:ring-primary fixed left-4 top-4 z-40 inline-flex -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground outline-none transition focus-visible:translate-y-0 focus-visible:ring focus-visible:ring-offset-2 dark:ring-offset-surface"
        >
          Skip to main content
        </a>
        <Topbar
          locale={locale}
          onMenuClick={() => setMobileOpen(true)}
          trialDaysLeft={trialDaysLeft}
        />
        <main
          id="main"
          className="flex flex-1 flex-col px-4 pb-10 pt-6 sm:px-6 lg:px-8"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
