"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/cn";
import {
  DEMO_TODAY,
  addDays,
  compareDays,
  day,
  formatLong,
  formatRange,
  monthTitle,
  rangeLength,
  sameDay,
  type DateRange,
} from "@/lib/dates";
import { Button } from "./button";

type Preset = { label: string; range: () => DateRange };

const today = DEMO_TODAY;
const presets: Preset[] = [
  { label: "Last 7 days", range: () => ({ start: addDays(today, -6), end: today }) },
  { label: "Last 30 days", range: () => ({ start: addDays(today, -29), end: today }) },
  { label: "Last 90 days", range: () => ({ start: addDays(today, -89), end: today }) },
  { label: "This month", range: () => ({ start: day(today.getFullYear(), today.getMonth(), 1), end: today }) },
  {
    label: "Last month",
    range: () => ({
      start: day(today.getFullYear(), today.getMonth() - 1, 1),
      end: day(today.getFullYear(), today.getMonth(), 0),
    }),
  },
];

const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

/** Days to render for a month grid, Monday-first, padded with nulls. */
function monthCells(year: number, month: number): Array<Date | null> {
  const first = day(year, month, 1);
  const lead = (first.getDay() + 6) % 7;
  const count = day(year, month + 1, 0).getDate();
  const cells: Array<Date | null> = Array.from({ length: lead }, () => null);
  for (let d = 1; d <= count; d++) cells.push(day(year, month, d));
  while (cells.length % 7) cells.push(null);
  return cells;
}

type MonthProps = {
  year: number;
  month: number;
  start: Date | null;
  end: Date | null;
  hover: Date | null;
  onPick: (d: Date) => void;
  onHover: (d: Date | null) => void;
};

function Month({ year, month, start, end, hover, onPick, onHover }: MonthProps) {
  // While only the start is picked, preview the range up to the hovered day.
  const previewEnd = start && !end && hover && compareDays(hover, start) >= 0 ? hover : end;

  return (
    <div className="w-[252px]">
      <div className="mb-2 text-center text-sm font-semibold">{monthTitle(year, month)}</div>
      <div className="grid grid-cols-7 text-center text-xs text-muted">
        {weekdays.map((w) => (
          <div key={w} className="py-1">
            {w}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7" onPointerLeave={() => onHover(null)}>
        {monthCells(year, month).map((d, i) => {
          if (!d) return <div key={i} />;
          const disabled = compareDays(d, today) > 0;
          const isStart = !!start && sameDay(d, start);
          const isEnd = !!previewEnd && sameDay(d, previewEnd);
          const inRange =
            !!start && !!previewEnd && compareDays(d, start) >= 0 && compareDays(d, previewEnd) <= 0;
          const edge = isStart || isEnd;
          return (
            <div
              key={i}
              className={cn(
                "py-0.5",
                inRange && !edge && "bg-brand-green-tint",
                inRange && isStart && !isEnd && "rounded-l-full bg-brand-green-tint",
                inRange && isEnd && !isStart && "rounded-r-full bg-brand-green-tint",
              )}
            >
              <button
                type="button"
                disabled={disabled}
                aria-label={formatLong(d)}
                aria-pressed={edge}
                onClick={() => onPick(d)}
                onPointerEnter={() => onHover(d)}
                className={cn(
                  "mx-auto flex size-8 items-center justify-center rounded-full text-sm transition",
                  "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-green-strong",
                  disabled && "cursor-not-allowed text-subtle/60",
                  !disabled && !edge && "hover:bg-canvas",
                  edge && "bg-brand-green-strong font-semibold text-white",
                  !edge && sameDay(d, today) && "font-semibold text-brand-green-strong",
                )}
              >
                {d.getDate()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

type DateRangePickerProps = {
  value: DateRange;
  onChange: (range: DateRange) => void;
  className?: string;
};

/** Pill button that opens a two-month range calendar with quick presets. */
export function DateRangePicker({ value, onChange, className }: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState<Date | null>(value.start);
  const [end, setEnd] = useState<Date | null>(value.end);
  const [hover, setHover] = useState<Date | null>(null);
  // Month shown on the right; the left one is the month before.
  const [view, setView] = useState({ year: value.end.getFullYear(), month: value.end.getMonth() });
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogId = useId();

  const reset = () => {
    setStart(value.start);
    setEnd(value.end);
    setHover(null);
    setView({ year: value.end.getFullYear(), month: value.end.getMonth() });
  };

  const close = (restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pick = (d: Date) => {
    if (!start || end || compareDays(d, start) < 0) {
      setStart(d);
      setEnd(null);
    } else {
      setEnd(d);
    }
  };

  const applyPreset = (p: Preset) => {
    const r = p.range();
    setStart(r.start);
    setEnd(r.end);
    setView({ year: r.end.getFullYear(), month: r.end.getMonth() });
  };

  const shift = (delta: number) =>
    setView(({ year, month }) => {
      const d = day(year, month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });

  const left = day(view.year, view.month - 1, 1);
  const canGoForward = compareDays(day(view.year, view.month + 1, 1), today) <= 0;
  const draft = start && end ? { start, end } : null;
  const activePreset = draft && presets.find((p) => {
    const r = p.range();
    return sameDay(r.start, draft.start) && sameDay(r.end, draft.end);
  });

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? dialogId : undefined}
        aria-label={`Date range: ${formatRange(value)}`}
        onClick={() => {
          if (open) return close(false);
          reset();
          setOpen(true);
        }}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border bg-surface px-3.5 py-[9px] text-sm font-medium transition",
          open ? "border-brand-green" : "border-line hover:border-brand-green/60",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green-strong",
        )}
      >
        <Icon name="calendar" size={16} className="text-muted" />
        {formatRange(value)}
        <Icon name="chevronDown" size={14} className={cn("text-muted transition", open && "rotate-180")} />
      </button>

      {open && (
        <div
          id={dialogId}
          role="dialog"
          aria-label="Choose a date range"
          className="absolute right-0 z-30 mt-2 flex rounded-xl border border-line bg-surface shadow-[0_16px_40px_rgba(19,25,39,0.14)]"
        >
          <ul className="w-40 shrink-0 space-y-0.5 border-r border-line p-2" aria-label="Quick ranges">
            {presets.map((p) => (
              <li key={p.label}>
                <button
                  type="button"
                  onClick={() => applyPreset(p)}
                  className={cn(
                    "w-full rounded-lg px-3 py-2 text-left text-sm transition hover:bg-canvas",
                    "focus-visible:outline-2 focus-visible:outline-brand-green-strong",
                    activePreset === p && "bg-brand-green-tint font-semibold text-brand-green-strong hover:bg-brand-green-tint",
                  )}
                >
                  {p.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="p-4">
            <div className="relative flex gap-6">
              <button
                type="button"
                aria-label="Previous month"
                onClick={() => shift(-1)}
                className="absolute left-0 top-0 rounded-full p-1 text-muted hover:bg-canvas hover:text-ink"
              >
                <Icon name="arrowLeft" size={16} />
              </button>
              <button
                type="button"
                aria-label="Next month"
                disabled={!canGoForward}
                onClick={() => shift(1)}
                className="absolute right-0 top-0 rounded-full p-1 text-muted hover:bg-canvas hover:text-ink disabled:invisible"
              >
                <Icon name="arrowRight" size={16} />
              </button>
              <Month
                year={left.getFullYear()}
                month={left.getMonth()}
                start={start}
                end={end}
                hover={hover}
                onPick={pick}
                onHover={setHover}
              />
              <Month
                year={view.year}
                month={view.month}
                start={start}
                end={end}
                hover={hover}
                onPick={pick}
                onHover={setHover}
              />
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 border-t border-line pt-3">
              <p className="text-xs text-muted" aria-live="polite">
                {draft
                  ? `${formatRange(draft)} · ${rangeLength(draft)} days`
                  : "Pick the last day of the period"}
              </p>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => close()}>
                  Cancel
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  disabled={!draft}
                  onClick={() => {
                    if (draft) onChange(draft);
                    close();
                  }}
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
