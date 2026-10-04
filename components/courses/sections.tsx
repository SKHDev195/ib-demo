import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";
import { ProgressBar } from "@/components/ui/progress-bar";
import { cn } from "@/lib/cn";
import {
  continueLearning,
  coreCourses,
  coreSummary,
  countryGuides,
  recommended,
  type Course,
  type CountryGuide,
} from "@/lib/courses";

/**
 * Hover look shared by every course card: a small lift, a soft shadow and a
 * green border. Only the card that opens a lesson is a link; on the others the
 * hover is visual only.
 */
const cardHover = cn(
  "transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(19,25,39,0.08)]",
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
);

/** `#rrggbb` plus an alpha channel. */
const withAlpha = (hex: string, alpha: number) =>
  hex +
  Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0");

/* ---------- Continue learning ---------- */

export function ContinueLearning() {
  const c = continueLearning;
  return (
    <section aria-label="Continue learning" className="flex items-center gap-5 rounded-xl bg-brand-navy p-5 text-white">
      <span
        aria-hidden="true"
        className="bg-brand-gradient flex size-[88px] shrink-0 items-center justify-center rounded-xl"
      >
        <Icon name="users" size={36} />
      </span>
      <div className="min-w-0 flex-1 space-y-1.5">
        <h2 className="text-xl font-semibold">{c.title}</h2>
        <p className="text-xs">{c.lesson}</p>
        <div className="flex items-center gap-2.5">
          <div className="w-[280px]">
            <ProgressBar value={c.progress} track="light" label="Course progress" />
          </div>
          <span className="text-xs font-semibold text-brand-green">{Math.round(c.progress * 100)}%</span>
        </div>
      </div>
      <Button variant="primary" iconLeft="play" href={c.href}>
        Resume
      </Button>
    </section>
  );
}

/* ---------- Section headings ---------- */

export function CoursesSection({
  title,
  description,
  aside,
  children,
}: {
  title: string;
  description?: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-0.5">
          <h2 className="text-xl font-semibold">{title}</h2>
          {description && <p className="text-xs text-muted">{description}</p>}
        </div>
        {aside}
      </div>
      {children}
    </section>
  );
}

export function CoreSummary() {
  return (
    <div className="flex items-center gap-3 text-xs">
      <span className="text-muted">{coreSummary}</span>
      {/* Display-only in the demo. */}
      <span className="font-medium text-brand-green-strong">View certificate</span>
    </div>
  );
}

/* ---------- Course cards ---------- */

function CourseStatusRow({ course }: { course: Course }) {
  const { status } = course;
  if (status.kind === "completed") {
    return (
      <div className="flex items-center gap-2.5 pt-1.5 text-xs font-semibold text-brand-green-strong">
        <Icon name="check" size={14} />
        Completed
      </div>
    );
  }
  if (status.kind === "progress") {
    return (
      <div className="flex items-center gap-2.5 pt-1.5">
        <ProgressBar value={status.value} label={`${course.title} progress`} className="flex-1" />
        <span className="text-xs font-semibold">{Math.round(status.value * 100)}%</span>
      </div>
    );
  }
  return <div className="pt-1.5 text-xs font-medium text-muted">Not started</div>;
}

function CourseCard({ course }: { course: Course }) {
  const linked = Boolean(course.href);
  return (
    <li
      className={cn(
        "relative flex flex-col overflow-hidden rounded-xl border border-line bg-surface pb-[18px]",
        cardHover,
        "hover:border-brand-green",
        linked &&
          "has-[a:focus-visible]:border-brand-green has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-brand-green-deep",
      )}
    >
      <div
        className="flex h-24 items-start justify-between px-[18px] py-4"
        style={{ background: withAlpha(course.color, course.tint ?? 0.12) }}
      >
        <span
          aria-hidden="true"
          className="flex size-12 shrink-0 items-center justify-center rounded-xl text-white"
          style={{ background: course.color }}
        >
          {course.code ? (
            <span className="text-base font-semibold text-ink">{course.code}</span>
          ) : (
            course.icon && <Icon name={course.icon} size={24} />
          )}
        </span>
        {course.reason && (
          <span className="flex items-center gap-1.5">
            <Pill tone="onCover">{course.reason}</Pill>
            {/* Display-only dismiss control. */}
            <span aria-hidden="true" className="flex size-[22px] items-center justify-center rounded-full bg-surface text-muted">
              <Icon name="x" size={12} />
            </span>
          </span>
        )}
        {course.badge && <Pill tone="solid">{course.badge}</Pill>}
      </div>

      <div className="flex flex-1 flex-col gap-2 px-[18px] pt-4">
        <h3 className="text-base font-semibold">
          {course.href ? (
            // The link covers the whole card, so any click on it opens the lesson.
            <Link href={course.href} className="outline-none after:absolute after:inset-0 after:content-['']">
              {course.title}
            </Link>
          ) : (
            course.title
          )}
        </h3>
        <p className="text-xs leading-[18px] text-muted">{course.description}</p>
        <p className="flex items-center gap-1.5 text-xs font-medium text-muted">
          <Icon name="clock" size={13} />
          {course.meta}
        </p>
        <div className="mt-auto">
          <CourseStatusRow course={course} />
        </div>
      </div>
    </li>
  );
}

export function CourseGrid({ courses, label }: { courses: Course[]; label: string }) {
  return (
    <ul className="grid grid-cols-3 gap-4" aria-label={label}>
      {courses.map((c) => (
        <CourseCard key={c.id} course={c} />
      ))}
    </ul>
  );
}

export const RecommendedGrid = () => <CourseGrid courses={recommended} label="Recommended courses" />;
export const CoreGrid = () => <CourseGrid courses={coreCourses} label="Core courses" />;

/* ---------- Country guides ---------- */

function CountryCard({ guide }: { guide: CountryGuide }) {
  return (
    <li
      className={cn(
        "flex items-center gap-3 rounded-xl border bg-surface p-3.5",
        cardHover,
        guide.yours ? "border-brand-green hover:border-brand-green-deep" : "border-line hover:border-brand-green",
      )}
    >
      <span
        aria-hidden="true"
        className="flex size-10 shrink-0 items-center justify-center rounded-[10px] border border-line bg-canvas text-sm font-semibold"
      >
        {guide.code}
      </span>
      <div className="min-w-0 space-y-0.5">
        <div className="flex items-center gap-1.5">
          <h3 className="text-sm font-semibold">{guide.name}</h3>
          {guide.yours && <Pill>Your clients</Pill>}
        </div>
        <p className="text-xs text-muted">{guide.meta}</p>
      </div>
    </li>
  );
}

export function CountryGrid() {
  return (
    <ul className="grid grid-cols-4 gap-4" aria-label="Country guides">
      {countryGuides.map((g) => (
        <CountryCard key={g.code} guide={g} />
      ))}
    </ul>
  );
}
