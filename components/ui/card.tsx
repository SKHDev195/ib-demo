import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = {
  children: ReactNode;
  className?: string;
  /** "dark" is the navy panel used for AI summaries and highlights. */
  tone?: "default" | "dark" | "tint";
  as?: "div" | "section" | "article" | "aside" | "nav";
  "aria-label"?: string;
  /** Inner padding: md = 20px (default), lg = 24px, none = 0 (for edge-to-edge lists). */
  padding?: "none" | "md" | "lg";
};

export function Card({
  children,
  className,
  tone = "default",
  as: Tag = "div",
  padding = "md",
  "aria-label": ariaLabel,
}: CardProps) {
  return (
    <Tag
      aria-label={ariaLabel}
      className={cn(
        "rounded-xl",
        padding === "md" && "p-5",
        padding === "lg" && "p-6",
        tone === "default" && "border border-line bg-surface",
        tone === "dark" && "bg-brand-navy text-white",
        tone === "tint" && "border border-brand-green/50 bg-brand-green-tint",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

type CardHeaderProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  className?: string;
};

export function CardHeader({ title, subtitle, action, className }: CardHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <div className="min-w-0">
        <h3 className="text-base font-semibold leading-snug">{title}</h3>
        {subtitle && <p className="mt-0.5 text-xs text-muted">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
