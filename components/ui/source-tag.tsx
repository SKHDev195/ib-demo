import { Icon, type IconName } from "@/components/icons";
import { cn } from "@/lib/cn";

export type DataSource = "broker" | "dashboard" | "web";

const sources: Record<DataSource, { icon: IconName; label: string }> = {
  broker: { icon: "database", label: "Broker" },
  dashboard: { icon: "grid", label: "Dashboard" },
  web: { icon: "globe", label: "Web" },
};

/** Small outlined tag naming where a figure or insight comes from. */
export function SourceTag({ source, label, className }: { source: DataSource; label?: string; className?: string }) {
  const s = sources[source];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-line py-0.5 pl-1.5 pr-2 text-xs font-medium text-muted",
        className,
      )}
    >
      <Icon name={s.icon} size={11} />
      {label ?? s.label}
    </span>
  );
}
