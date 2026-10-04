import type { InputHTMLAttributes, ReactNode } from "react";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/cn";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className"> & {
  /** Visible label. Omit for a bare box (then pass aria-label). */
  label?: ReactNode;
  description?: ReactNode;
  className?: string;
};

/**
 * Native checkbox with the CXM square style. Works uncontrolled
 * (`defaultChecked`) without client JS, or controlled (`checked` + `onChange`).
 */
export function Checkbox({ label, description, className, ...input }: CheckboxProps) {
  return (
    <label className={cn("group inline-flex cursor-pointer items-start gap-3", input.disabled && "cursor-not-allowed opacity-60", className)}>
      <span className="relative mt-px inline-flex size-[18px] shrink-0">
        <input type="checkbox" className="peer sr-only" {...input} />
        <span
          aria-hidden="true"
          className={cn(
            "flex size-full items-center justify-center rounded-[5px] border-[1.5px] border-line bg-surface text-transparent transition",
            "peer-checked:border-brand-green-deep peer-checked:bg-brand-green-deep peer-checked:text-white",
            "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-green-deep",
          )}
        >
          <Icon name="check" size={12} strokeWidth={2.5} />
        </span>
      </span>
      {(label || description) && (
        <span className="min-w-0">
          {label && <span className="block text-sm font-medium">{label}</span>}
          {description && <span className="block text-xs text-muted">{description}</span>}
        </span>
      )}
    </label>
  );
}
