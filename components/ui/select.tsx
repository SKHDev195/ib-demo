"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/cn";

type Option<T extends string> = { value: T; label: string };

type SelectProps<T extends string> = {
  options: ReadonlyArray<Option<T>>;
  /** Controlled value. Leave undefined to let the select manage its own state. */
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
  /** id of the visible label element, for screen readers. */
  labelledBy?: string;
  className?: string;
};

/**
 * Dropdown with a custom menu (WAI-ARIA "select-only combobox" pattern).
 * Mouse: click to open, click an option. Keyboard: Enter/Space/Arrow keys to
 * open, arrows/Home/End to move, Enter to pick, Escape or Tab to close.
 */
export function Select<T extends string>({
  options,
  value,
  defaultValue,
  onChange,
  labelledBy,
  className,
}: SelectProps<T>) {
  const [internal, setInternal] = useState<T>(defaultValue ?? options[0].value);
  const current = value ?? internal;
  const currentIndex = Math.max(0, options.findIndex((o) => o.value === current));

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(currentIndex);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const optionId = (i: number) => `${listId}-opt-${i}`;

  // Close when clicking anywhere outside the control.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Keep the highlighted option in view while navigating with the keyboard.
  useEffect(() => {
    if (open) document.getElementById(optionId(active))?.scrollIntoView({ block: "nearest" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, active]);

  const openMenu = (index = currentIndex) => {
    setActive(index);
    setOpen(true);
  };

  const choose = (index: number) => {
    const next = options[index].value;
    setInternal(next);
    onChange?.(next);
    setOpen(false);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = options.length - 1;
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openMenu(e.key === "ArrowUp" ? Math.max(0, currentIndex - 1) : currentIndex);
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((i) => Math.min(last, i + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((i) => Math.max(0, i - 1));
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(last);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        choose(active);
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={labelledBy}
        aria-activedescendant={open ? optionId(active) : undefined}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onKeyDown}
        className={cn(
          "flex w-full items-center justify-between gap-3 rounded-[10px] border bg-surface px-3.5 py-2.5 text-left text-sm font-medium transition",
          open ? "border-brand-green" : "border-line hover:border-brand-green/60",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green-deep",
        )}
      >
        <span className="truncate">{options[currentIndex].label}</span>
        <Icon name="chevronDown" size={16} className={cn("shrink-0 text-muted transition", open && "rotate-180")} />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={labelledBy}
          className="absolute left-0 right-0 z-20 mt-1.5 max-h-72 overflow-auto rounded-[10px] border border-line bg-surface p-1 shadow-[0_12px_32px_rgba(19,25,39,0.12)]"
        >
          {options.map((opt, i) => {
            const selected = i === currentIndex;
            return (
              <li
                key={opt.value}
                id={optionId(i)}
                role="option"
                aria-selected={selected}
                onPointerEnter={() => setActive(i)}
                onClick={() => choose(i)}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm",
                  i === active && "bg-canvas",
                  selected ? "font-semibold text-brand-green-strong" : "text-ink",
                )}
              >
                {opt.label}
                {selected && <Icon name="check" size={14} className="shrink-0" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
