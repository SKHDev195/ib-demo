import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";
import { cn } from "@/lib/cn";

type CalloutProps = {
  children: ReactNode;
  /** ai = green tint with sparkle; warning = red tint; info = neutral grey. */
  tone?: "ai" | "warning" | "info";
  icon?: IconName;
  className?: string;
};

const styles = {
  ai: { box: "bg-brand-green-tint text-brand-green-strong font-medium", icon: "spark" as IconName, iconClass: "text-brand-green-strong" },
  warning: { box: "bg-negative/[0.07] text-ink", icon: "alert" as IconName, iconClass: "text-negative" },
  info: { box: "bg-canvas text-muted", icon: "info" as IconName, iconClass: "text-muted" },
};

export function Callout({ children, tone = "ai", icon, className }: CalloutProps) {
  const s = styles[tone];
  return (
    <div className={cn("flex items-start gap-2.5 rounded-[10px] px-3.5 py-3 text-xs leading-relaxed", s.box, className)}>
      <Icon name={icon ?? s.icon} size={15} className={cn("mt-px shrink-0", s.iconClass)} />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
