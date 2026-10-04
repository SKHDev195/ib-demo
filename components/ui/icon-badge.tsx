import { Icon, type IconName } from "@/components/icons";
import { cn } from "@/lib/cn";

type IconBadgeProps = {
  /** Background colour (CSS colour or token var, e.g. "var(--color-chart-2)"). */
  color: string;
  /** Show an icon… */
  icon?: IconName;
  /** …or a short text code such as "T" or "ID". */
  text?: string;
  size?: number;
  /** Tinted variant: light background with coloured icon. */
  tinted?: boolean;
  className?: string;
};

/** Square coloured tile used for tools, courses and countries. */
export function IconBadge({ color, icon, text, size = 28, tinted, className }: IconBadgeProps) {
  const radius = size >= 44 ? 12 : size >= 34 ? 10 : 8;
  return (
    <span
      aria-hidden="true"
      className={cn("inline-flex shrink-0 items-center justify-center font-semibold", className)}
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: tinted ? `color-mix(in srgb, ${color} 12%, white)` : color,
        color: tinted ? color : "#fff",
        fontSize: Math.round(size * 0.4),
      }}
    >
      {icon ? <Icon name={icon} size={Math.round(size * 0.5)} /> : text}
    </span>
  );
}
