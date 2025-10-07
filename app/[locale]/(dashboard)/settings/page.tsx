import { getTranslations } from "next-intl/server";
import { Cog, Paintbrush } from "lucide-react";

import { Link } from "@/i18n/navigation";
import {
  resolveLocaleParam,
  type LocaleParams
} from "@/i18n/params";

type Props = {
  params: LocaleParams;
};

export default async function SettingsPage({ params }: Props) {
  const locale = await resolveLocaleParam(params);
  const tNav = await getTranslations({ locale, namespace: "navigation" });

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            {tNav("settings")}
          </h1>
          <p className="text-sm text-muted-foreground">
            Branding, Lead-Days, Mail-Absender und Integrationen werden hier konfiguriert.
          </p>
        </div>
        <Link
          href="/settings/theme"
          className="inline-flex items-center gap-2 rounded-full border border-muted bg-card px-4 py-2 text-sm font-semibold text-foreground transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          <Paintbrush className="h-4 w-4" aria-hidden />
          Theme anpassen
        </Link>
      </header>

      <section className="rounded-3xl border border-muted bg-card/90 p-6 text-center shadow-sm shadow-black/5">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-muted text-muted-foreground">
          <Cog className="h-6 w-6" aria-hidden />
        </div>
        <h2 className="mt-4 text-lg font-semibold text-foreground">
          Einstellungen folgen
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Multi-Tenant Settings mit Logo-Uploads, Mail-Templates und Webhooks werden
          in einer kommenden Iteration umgesetzt.
        </p>
      </section>
    </div>
  );
}

