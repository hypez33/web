import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";

import { AppShell, type NavItem } from "@/components/layout/app-shell";
import {
  resolveLocaleParam,
  type LocaleParams
} from "@/i18n/params";

type Props = {
  children: ReactNode;
  params: LocaleParams;
};

export default async function DashboardLayout({ children, params }: Props) {
  const locale = await resolveLocaleParam(params);
  const tNav = await getTranslations({ locale, namespace: "navigation" });
  const tSidebar = await getTranslations({ locale, namespace: "sidebar" });
  const tStatus = await getTranslations({ locale, namespace: "status" });

  const navItems: NavItem[] = [
    {
      href: "/",
      icon: "dashboard",
      label: tNav("dashboard")
    },
    {
      href: "/vehicles",
      icon: "vehicles",
      label: tNav("vehicles")
    },
    {
      href: "/services",
      icon: "services",
      label: tNav("services")
    },
    {
      href: "/repairs",
      icon: "repairs",
      label: tNav("repairs")
    },
    {
      href: "/appointments",
      icon: "appointments",
      label: tNav("appointments")
    },
    {
      href: "/reports",
      icon: "reports",
      label: tNav("reports"),
      soon: true
    },
    {
      href: "/notifications",
      icon: "notifications",
      label: tNav("notifications"),
      badge: "3"
    },
    {
      href: "/billing",
      icon: "billing",
      label: tNav("billing")
    },
    {
      href: "/settings",
      icon: "settings",
      label: tNav("settings")
    },
    {
      href: "/admin",
      icon: "admin",
      label: tNav("admin")
    }
  ];

  return (
    <AppShell
      locale={locale}
      navItems={navItems}
      sidebarSections={{
        overview: tSidebar("overview"),
        analytics: tSidebar("analytics"),
        platform: tSidebar("platform")
      }}
      statusLabels={{
        green: tStatus("green"),
        amber: tStatus("amber"),
        red: tStatus("red")
      }}
      trialDaysLeft={6}
    >
      {children}
    </AppShell>
  );
}

