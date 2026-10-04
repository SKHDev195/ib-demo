/** Small date helpers for whole calendar days (local time, no time-of-day). */

export type DateRange = { start: Date; end: Date };

/** The demo is pinned to this day so figures and the default period stay consistent. */
export const DEMO_TODAY = new Date(2026, 9, 5); // Oct 5, 2026

export const day = (y: number, m: number, d: number) => new Date(y, m, d);

export const addDays = (date: Date, n: number) => day(date.getFullYear(), date.getMonth(), date.getDate() + n);

export const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export const compareDays = (a: Date, b: Date) => (sameDay(a, b) ? 0 : a < b ? -1 : 1);

/** Inclusive number of days in a range. */
export const rangeLength = ({ start, end }: DateRange) => Math.round((end.getTime() - start.getTime()) / 86_400_000) + 1;

/** The period of equal length immediately before `range`. */
export function previousPeriod(range: DateRange): DateRange {
  const end = addDays(range.start, -1);
  return { start: addDays(end, -(rangeLength(range) - 1)), end };
}

const md = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });
const mdy = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });

/** "Sep 6 – Oct 5, 2026"; years shown on both sides only if they differ. */
export function formatRange({ start, end }: DateRange, withYear = true) {
  if (!withYear) return `${md.format(start)} – ${md.format(end)}`;
  if (start.getFullYear() !== end.getFullYear()) return `${mdy.format(start)} – ${mdy.format(end)}`;
  return `${md.format(start)} – ${mdy.format(end)}`;
}

export const formatLong = (date: Date) =>
  new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }).format(date);

export const monthTitle = (year: number, month: number) =>
  new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(day(year, month, 1));
