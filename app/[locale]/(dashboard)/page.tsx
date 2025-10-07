import { Fragment } from "react";
import { getTranslations } from "next-intl/server";
import {
  AlertTriangle,
  CalendarClock,
  CarFront,
  FileDown,
  ShieldCheck,
  Wrench
} from "lucide-react";

import { Link } from "@/i18n/navigation";
import { StatCard } from "@/components/ui/stat-card";
import {
  resolveLocaleParam,
  type LocaleParams
} from "@/i18n/params";

type Props = {
  params: LocaleParams;
};

type MockVehicle = {
  id: string;
  name: string;
  mileage: string;
  tuvDue: string;
  status: AmpelTone;
  services: string[];
};

const mockVehicles: MockVehicle[] = [
  {
    id: "EH-1274",
    name: "VW Crafter 3.5t",
    mileage: "142.350 km",
    tuvDue: "12.11.2025",
    status: "amber",
    services: ["Brake inspection", "Oil change"]
  },
  {
    id: "HH-2045",
    name: "Mercedes Vito",
    mileage: "98.240 km",
    tuvDue: "04.02.2026",
    status: "green",
    services: ["Annual inspection"]
  },
  {
    id: "B-8823",
    name: "Tesla Model Y",
    mileage: "54.120 km",
    tuvDue: "01.07.2025",
    status: "red",
    services: ["Battery diagnostics", "Tyre rotation"]
  }
];

const repairHistory = [
  {
    id: "R-23018",
    vehicle: "B-8823",
    title: "Drive unit replacement",
    date: "2025-01-28",
    mileage: "51.980 km",
    cost: "2.430 €"
  },
  {
    id: "R-23007",
    vehicle: "EH-1274",
    title: "Brake system overhaul",
    date: "2024-12-16",
    mileage: "137.540 km",
    cost: "1.180 €"
  },
  {
    id: "R-22998",
    vehicle: "HH-2045",
    title: "Climate compressor",
    date: "2024-11-21",
    mileage: "92.340 km",
    cost: "640 €"
  }
] as const;

type AmpelTone = "green" | "amber" | "red";

const toneStyles: Record<AmpelTone, string> = {
  green: "bg-emerald-500/15 text-emerald-400",
  amber: "bg-amber-400/15 text-amber-500",
  red: "bg-rose-500/15 text-rose-400"
};

export default async function DashboardPage({ params }: Props) {
  const locale = await resolveLocaleParam(params);
  const tApp = await getTranslations({ locale, namespace: "app" });
  const tDashboard = await getTranslations({ locale, namespace: "dashboard" });
  const tStatus = await getTranslations({ locale, namespace: "status" });

  return (
    <div className="space-y-10">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">
            {tDashboard("welcome", { name: "Olivia" })}
          </h1>
          <p className="text-sm text-muted-foreground">{tApp("tagline")}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/vehicles"
            className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            <CarFront className="h-4 w-4" aria-hidden />
            {tDashboard("actions.addVehicle")}
          </Link>
          <Link
            href="/appointments"
            className="inline-flex items-center gap-2 rounded-full border border-muted bg-card px-4 py-2 text-sm font-semibold text-foreground transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            <CalendarClock className="h-4 w-4" aria-hidden />
            {tDashboard("actions.requestAppointment")}
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<CarFront className="h-5 w-5" aria-hidden />}
          title={tDashboard("kpi.activeVehicles")}
          value="48"
          description="5 assigned to Service Partner Werk34"
        />
        <StatCard
          icon={<Wrench className="h-5 w-5" aria-hidden />}
          title={tDashboard("kpi.upcomingServices")}
          value="12"
          tone="warning"
          trend={{ value: 8, label: "vs. last month", direction: "down" }}
        />
        <StatCard
          icon={<AlertTriangle className="h-5 w-5" aria-hidden />}
          title={tDashboard("kpi.overdueItems")}
          value="3"
          tone="danger"
          description="2 TÜV, 1 Inspection"
        />
        <StatCard
          icon={<ShieldCheck className="h-5 w-5" aria-hidden />}
          title={tDashboard("kpi.monthlyCost")}
          value="7.420 €"
          tone="success"
          trend={{ value: 4.2, label: "savings vs. baseline", direction: "down" }}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="rounded-3xl border border-muted bg-card/90 shadow-sm shadow-black/5">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-muted px-5 py-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Ampelstatus</h2>
              <p className="text-sm text-muted-foreground">
                TÜV, Services und Reifenstatus pro Fahrzeug
              </p>
            </div>
            <Link
              href="/vehicles"
              className="inline-flex items-center gap-2 rounded-full border border-muted px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground transition hover:text-primary"
            >
              Übersicht öffnen
            </Link>
          </header>
          <ul className="divide-y divide-muted/80">
            {mockVehicles.map((vehicle) => (
              <li
                key={vehicle.id}
                className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-muted bg-muted/40 text-foreground">
                    <CarFront className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {vehicle.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{vehicle.id}</p>
                  </div>
                </div>
                <div className="flex flex-1 flex-wrap items-center gap-3">
                  <StatusPill tone={vehicle.status}>{tStatus(vehicle.status)}</StatusPill>
                  <InfoPill label="Mileage" value={vehicle.mileage} />
                  <InfoPill label="TÜV" value={vehicle.tuvDue} />
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    {vehicle.services.map((service) => (
                      <Fragment key={service}>
                        <span>{service}</span>
                        <span aria-hidden="true">•</span>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-3xl border border-muted bg-card/90 p-5 shadow-sm shadow-black/5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Nächste Service-Termine
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start justify-between gap-3 rounded-2xl border border-muted bg-muted/50 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    VW Crafter 3.5t &middot; Werk34
                  </p>
                  <p className="text-xs text-muted-foreground">
                    12. Nov 2025 · Bremse & Reifenwechsel
                  </p>
                </div>
                <span className="rounded-full bg-amber-400/15 px-3 py-1 text-xs font-semibold text-amber-500">
                  {tStatus("amber")}
                </span>
              </li>
              <li className="flex items-start justify-between gap-3 rounded-2xl border border-muted bg-muted/50 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Tesla Model Y &middot; Servicepartner Nord
                  </p>
                  <p className="text-xs text-muted-foreground">
                    05. Mär 2025 · Hochvolt-Diagnose
                  </p>
                </div>
                <span className="rounded-full bg-rose-500/15 px-3 py-1 text-xs font-semibold text-rose-400">
                  {tStatus("red")}
                </span>
              </li>
            </ul>
            <Link
              href="/appointments"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary/90"
            >
              <CalendarClock className="h-4 w-4" aria-hidden />
              Termine verwalten
            </Link>
          </div>

          <div className="rounded-3xl border border-muted bg-card/90 p-5 shadow-sm shadow-black/5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Exporte & Dokumente
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Exportieren Sie die vollständige Reparatur-Historie als PDF oder CSV.
            </p>
            <Link
              href="/repairs"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-muted bg-muted/60 px-4 py-2 text-sm font-semibold text-foreground transition hover:text-primary"
            >
              <FileDown className="h-4 w-4" aria-hidden />
              Reparatur-Historie PDF erzeugen
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-muted bg-card/90 shadow-sm shadow-black/5">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-muted px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Letzte Reparaturen
            </h2>
            <p className="text-sm text-muted-foreground">
              Jede Reparatur ist mit Kilometerstand und Dokumenten verknüpft.
            </p>
          </div>
          <Link
            href="/repairs"
            className="inline-flex items-center gap-2 rounded-full border border-muted px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground transition hover:text-primary"
          >
            Alle Reparaturen
          </Link>
        </header>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-muted/80 text-left">
            <thead className="text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th scope="col" className="px-5 py-3 font-semibold">
                  Vorgang
                </th>
                <th scope="col" className="px-5 py-3 font-semibold">
                  Fahrzeug
                </th>
                <th scope="col" className="px-5 py-3 font-semibold">
                  Datum
                </th>
                <th scope="col" className="px-5 py-3 font-semibold">
                  Kilometer
                </th>
                <th scope="col" className="px-5 py-3 font-semibold">
                  Kosten
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-muted/80 text-sm text-muted-foreground">
              {repairHistory.map((repair) => (
                <tr key={repair.id} className="transition hover:bg-muted/40">
                  <td className="px-5 py-4 text-foreground">{repair.title}</td>
                  <td className="px-5 py-4">{repair.vehicle}</td>
                  <td className="px-5 py-4">
                    {new Date(repair.date).toLocaleDateString(locale)}
                  </td>
                  <td className="px-5 py-4">{repair.mileage}</td>
                  <td className="px-5 py-4 text-foreground">{repair.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function StatusPill({ tone, children }: { tone: AmpelTone; children: React.ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${toneStyles[tone]}`}
    >
      <span className="h-2 w-2 rounded-full bg-current" aria-hidden="true" />
      {children}
    </span>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-muted px-3 py-1 text-xs font-medium text-muted-foreground">
      <strong className="font-semibold text-foreground">{label}</strong>
      {value}
    </span>
  );
}

