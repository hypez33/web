"use client";

import { Fragment, useMemo } from "react";
import { Dialog, DialogPanel, Transition } from "@headlessui/react";
import { clsx } from "clsx";
import {
  BarChart3,
  CalendarCheck,
  CarFront,
  CreditCard,
  GaugeCircle,
  LayoutDashboard,
  ShieldCheck,
  Settings2,
  Wrench,
  WrenchIcon
} from "lucide-react";

import { Link, usePathname } from "../../i18n/navigation";
import type { NavItem, NavIcon } from "./app-shell";

type Props = {
  items: NavItem[];
  mobileOpen: boolean;
  onMobileChange: (open: boolean) => void;
  sections: {
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

const ICONS: Record<NavIcon, React.ComponentType<{ className?: string }>> = {
  dashboard: LayoutDashboard,
  vehicles: CarFront,
  services: Wrench,
  repairs: WrenchIcon,
  appointments: CalendarCheck,
  reports: BarChart3,
  notifications: GaugeCircle,
  billing: CreditCard,
  settings: Settings2,
  admin: ShieldCheck
};

function NavContent({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  const normalizedPath = pathname
    ? normalizePathname(pathname)
    : "/";

  return (
    <nav className="mt-6 flex flex-1 flex-col gap-1">
      {items.map((item) => {
        const Icon = ICONS[item.icon];
        const isActive = matchPath(normalizedPath, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "group relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
            )}
          >
            <Icon
              className={clsx(
                "h-5 w-5 shrink-0 transition",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
              aria-hidden="true"
            />
            <span className="truncate">{item.label}</span>
            {item.badge ? (
              <span className="ml-auto inline-flex min-w-[1.5rem] items-center justify-center rounded-full bg-primary/20 px-2 text-[10px] font-semibold uppercase tracking-wide text-primary">
                {item.badge}
              </span>
            ) : null}
            {item.soon ? (
              <span className="ml-auto text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/60">
                Soon
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}

export function Sidebar({
  items,
  mobileOpen,
  onMobileChange,
  sections,
  statusLabels
}: Props) {
  const groupedItems = useMemo(() => {
    const primary = items.filter(
      (item) =>
        !["reports", "billing", "admin", "notifications"].includes(item.icon)
    );
    const secondary = items.filter((item) =>
      ["reports", "billing", "notifications"].includes(item.icon)
    );
    const admin = items.filter((item) => item.icon === "admin");
    return { primary, secondary, admin };
  }, [items]);

  const sidebarInner = (
    <>
      <div className="flex items-center gap-2 px-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
          <span className="text-lg font-bold">FM</span>
        </div>
        <div>
          <p className="text-sm font-semibold leading-tight">Fuhrpark Manager</p>
          <p className="text-xs text-muted-foreground">CRM Platform</p>
        </div>
      </div>
      <NavSection
        title={sections.overview}
        className="mt-4"
        items={groupedItems.primary}
      />
      {groupedItems.secondary.length ? (
        <NavSection
          title={sections.analytics}
          items={groupedItems.secondary}
        />
      ) : null}
      {groupedItems.admin.length ? (
        <NavSection title={sections.platform} items={groupedItems.admin} />
      ) : null}
      <div className="mt-auto space-y-3 rounded-2xl border border-muted bg-muted/50 p-3 text-xs text-muted-foreground">
        <p className="font-medium text-foreground">Status</p>
        <ul className="space-y-2">
          <Legend color="bg-emerald-500/80">{statusLabels.green}</Legend>
          <Legend color="bg-amber-400/80">{statusLabels.amber}</Legend>
          <Legend color="bg-rose-500/80">{statusLabels.red}</Legend>
        </ul>
      </div>
    </>
  );

  return (
    <>
      <Transition show={mobileOpen} as={Fragment}>
        <Dialog className="relative z-50 lg:hidden" onClose={onMobileChange}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-in-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in-out duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-surface/70 backdrop-blur" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-200 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-200 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <DialogPanel className="fixed inset-y-0 left-0 flex w-72 flex-col gap-6 overflow-y-auto border-r border-muted bg-card px-4 py-6 shadow-2xl">
              {sidebarInner}
            </DialogPanel>
          </Transition.Child>
        </Dialog>
      </Transition>

      <div className="hidden w-72 shrink-0 flex-col gap-6 border-r border-muted bg-card px-4 py-6 lg:fixed lg:inset-y-0 lg:flex">
        {sidebarInner}
      </div>
    </>
  );
}

function NavSection({
  title,
  items,
  className
}: {
  title: string;
  items: NavItem[];
  className?: string;
}) {
  if (!items.length) {
    return null;
  }

  return (
    <div className={clsx("space-y-2", className)}>
      <p className="px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </p>
      <NavContent items={items} />
    </div>
  );
}

function Legend({
  color,
  children
}: {
  color: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-center gap-2">
      <span className={clsx("h-2 w-2 rounded-full", color)} aria-hidden="true" />
      <span>{children}</span>
    </li>
  );
}

function normalizePathname(pathname: string) {
  const withoutLocale = pathname.replace(
    /^\/([a-z]{2}(?:-[A-Z]{2})?)(?=\/|$)/,
    ""
  );

  if (!withoutLocale || withoutLocale === "/") {
    return "/";
  }

  return withoutLocale.startsWith("/")
    ? withoutLocale
    : `/${withoutLocale}`;
}

function matchPath(currentPath: string, targetPath: string) {
  if (targetPath === "/") {
    return currentPath === "/";
}

  if (currentPath === targetPath) {
    return true;
  }

  return currentPath.startsWith(
    targetPath.endsWith("/")
      ? targetPath
      : `${targetPath}/`
  );
}
