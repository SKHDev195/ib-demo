"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";

type Option<T extends string> = { value: T; label: string };

type SegmentedControlProps<T extends string> = {
  options: ReadonlyArray<Option<T>>;
  /** Controlled value. Leave undefined to let the control manage its own state. */
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
  /** "navy" = dark selected pill (filters, timeframes); "surface" = white selected pill on grey track. */
  variant?: "navy" | "surface";
  label: string;
  className?: string;
};

export function SegmentedControl<T extends string>({
  options,
  value,
  defaultValue,
  onChange,
  variant = "navy",
  label,
  className,
}: SegmentedControlProps<T>) {
  const [internal, setInternal] = useState<T>(defaultValue ?? options[0].value);
  const current = value ?? internal;
  const name = useId();

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn(
        "inline-flex items-center gap-1 rounded-full p-1",
        variant === "navy" ? "border border-line bg-surface" : "bg-canvas",
        className,
      )}
    >
      {options.map((opt) => {
        const selected = opt.value === current;
        return (
          <label
            key={opt.value}
            className={cn(
              "cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand-green-deep",
              selected && variant === "navy" && "bg-brand-navy text-white",
              selected && variant === "surface" && "bg-surface font-semibold text-ink shadow-[0_1px_3px_rgba(0,0,0,0.08)]",
              !selected && "text-muted hover:text-ink",
            )}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={selected}
              onChange={() => {
                setInternal(opt.value);
                onChange?.(opt.value);
              }}
              className="sr-only"
            />
            {opt.label}
          </label>
        );
      })}
    </div>
  );
}
