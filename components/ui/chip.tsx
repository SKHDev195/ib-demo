import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";
import { cn } from "@/lib/cn";

type ChipProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className"> & {
  label: ReactNode;
  /** Small secondary text after the label, e.g. "ID · MY". */
  meta?: ReactNode;
  /** Icon shown while unselected (e.g. "plus" for "Add country"). */
  icon?: IconName;
  /** "radio" for single-choice groups (pass the same `name`). */
  kind?: "checkbox" | "radio";
  className?: string;
};

/** Selectable pill used for multi- or single-choice answers. */
export function Chip({ label, meta, icon, kind = "checkbox", className, ...input }: ChipProps) {
  return (
    <label className={cn("relative inline-flex cursor-pointer", className)}>
      <input type={kind} className="peer sr-only" {...input} />
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-2 text-sm font-medium text-ink transition",
          "hover:border-brand-green/60",
          "peer-checked:border-brand-green peer-checked:bg-brand-green-tint peer-checked:font-semibold peer-checked:text-brand-green-strong",
          "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-green-deep",
          "[&_.chip-check]:hidden peer-checked:[&_.chip-check]:block peer-checked:[&_.chip-icon]:hidden",
        )}
      >
        <Icon name="check" size={14} className="chip-check" />
        {icon && <Icon name={icon} size={14} className="chip-icon text-muted" />}
        {label}
        {meta && <span className="text-xs font-medium text-muted">{meta}</span>}
      </span>
    </label>
  );
}

type AddChipProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "children"> & { label: string };

/** "+ Add …" pill that sits at the end of a chip group, styled to match Chip. */
export function AddChip({ label, className, ...button }: AddChipProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-2 text-sm font-medium transition",
        "hover:border-brand-green/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green-deep",
        className,
      )}
      {...button}
    >
      <Icon name="plus" size={14} className="text-muted" />
      {label}
    </button>
  );
}
