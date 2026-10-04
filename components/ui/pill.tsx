import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type PillProps = {
  children: ReactNode;
  tone?: "green" | "neutral" | "surface" | "subtle" | "negative" | "navy" | "onCover" | "solid";
  size?: "sm" | "md";
  className?: string;
};

const tones = {
  green: "bg-brand-green-tint text-brand-green-strong",
  neutral: "bg-canvas text-muted",
  surface: "bg-surface text-ink",
  subtle: "bg-surface text-muted",
  negative: "bg-canvas text-negative-strong",
  navy: "bg-brand-navy text-white",
  /** White pill on a tinted card cover. */
  onCover: "bg-surface text-brand-green-strong",
  solid: "bg-brand-green-strong text-white",
} as const;

/** Small rounded label: deltas, statuses, sources, tags. */
export function Pill({ children, tone = "green", size = "md", className }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full font-medium",
        size === "sm" ? "px-1.5 py-px text-[11px]" : "px-2 py-0.5 text-xs",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
