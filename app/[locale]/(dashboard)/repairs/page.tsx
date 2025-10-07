import { getTranslations } from "next-intl/server";
import { FileText, Wrench } from "lucide-react";

import { Link } from "@/i18n/navigation";
import {
  resolveLocaleParam,
  type LocaleParams
} from "@/i18n/params";

type Props = {
  params: LocaleParams;
};

export default async function RepairsPage({ params }: Props) {
  const locale = await resolveLocaleParam(params);
  const tNav = await getTranslations({ locale, namespace: "navigation" });

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            {tNav("repairs")}
          </h1>
          <p className="text-sm text-muted-foreground">
            Dokumentieren Sie Reparaturen mit Kosten, Dokumenten-Uploads und Kilometerstand.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/repairs/new"
            className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            <Wrench className="h-4 w-4" aria-hidden />
            Reparatur erfassen
          </Link>
          <Link
            href="/repairs/export/pdf"
            className="inline-flex items-center gap-2 rounded-full border border-muted bg-card px-4 py-2 text-sm font-semibold text-foreground transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            <FileText className="h-4 w-4" aria-hidden />
            PDF Export
          </Link>
        </div>
      </header>

      <section className="rounded-3xl border border-muted bg-card/90 p-6 text-center shadow-sm shadow-black/5">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-muted text-muted-foreground">
          <FileText className="h-6 w-6" aria-hidden />
        </div>
        <h2 className="mt-4 text-lg font-semibold text-foreground">
          Reparaturübersicht folgt
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Die Tabelle mit Uploads, Kosten und Kilometerprüfung wird nach der API-Anbindung verfügbar.
        </p>
      </section>
    </div>
  );
}

