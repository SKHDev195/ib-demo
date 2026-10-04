import { cn } from "@/lib/cn";

type ProgressBarProps = {
  /** 0–1 */
  value: number;
  label?: string;
  tone?: "green" | "negative";
  /** "light" for use on navy panels. */
  track?: "default" | "light";
  className?: string;
};

export function ProgressBar({ value, label, tone = "green", track = "default", className }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      aria-label={label}
      className={cn("h-1.5 w-full overflow-hidden rounded-full", track === "light" ? "bg-white/15" : "bg-canvas", className)}
    >
      <div
        className={cn("h-full rounded-full transition-[width] duration-300", tone === "green" ? "bg-brand-green" : "bg-negative")}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
