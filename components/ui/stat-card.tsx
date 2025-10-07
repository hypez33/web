import { clsx } from "clsx";
import type { ReactNode } from "react";

type Trend = {
  value: number;
  label: string;
  direction?: "up" | "down";
};

type Props = {
  icon?: ReactNode;
  title: string;
  value: string;
  tone?: "default" | "success" | "warning" | "danger";
  description?: string;
  trend?: Trend;
};

const toneStyles: Record<
  NonNullable<Props["tone"]>,
  { badge: string; icon: string }
> = {
  default: {
    badge: "bg-muted/60",
    icon: "text-primary"
  },
  success: {
    badge: "bg-emerald-500/15 text-emerald-400",
    icon: "text-emerald-400"
  },
  warning: {
    badge: "bg-amber-400/15 text-amber-400",
    icon: "text-amber-400"
  },
  danger: {
    badge: "bg-rose-500/15 text-rose-400",
    icon: "text-rose-400"
  }
};

export function StatCard({
  icon,
  title,
  value,
  tone = "default",
  description,
  trend
}: Props) {
  const toneStyle = toneStyles[tone];

  return (
    <section className="flex flex-col justify-between rounded-2xl border border-muted bg-card/90 p-5 shadow-sm shadow-black/5 backdrop-blur">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {icon ? (
          <span className={clsx("rounded-full bg-muted/40 p-2", toneStyle.icon)}>
            {icon}
          </span>
        ) : null}
      </div>
      <div className="mt-4">
        <p className="text-3xl font-semibold tracking-tight text-foreground">
          {value}
        </p>
        {description ? (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {trend ? (
        <div className="mt-4 flex items-center gap-2">
          <span
            className={clsx(
              "inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold",
              toneStyle.badge
            )}
          >
            {trend.direction === "down" ? "↓" : "↑"} {trend.value}%
          </span>
          <span className="text-xs text-muted-foreground">{trend.label}</span>
        </div>
      ) : null}
    </section>
  );
}
