import { cn } from "@/lib/cn";

type AvatarProps = {
  initials: string;
  size?: number;
  tone?: "green" | "navy";
  className?: string;
};

export function Avatar({ initials, size = 34, tone = "green", className }: AvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full text-xs font-semibold",
        tone === "green" ? "bg-brand-green text-brand-navy" : "bg-brand-navy text-white",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {initials}
    </span>
  );
}
