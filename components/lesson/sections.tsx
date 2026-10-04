import { Icon } from "@/components/icons";
import { classesFor } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { ProgressBar } from "@/components/ui/progress-bar";
import { cn } from "@/lib/cn";
import {
  courseLessons,
  lessonCallouts,
  lessonMeta,
  nextLesson,
  possibleActivities,
  quickCheck,
  rateRules,
  subIbs,
  yourNumbers,
  type LessonState,
} from "@/lib/lesson";

/* Screen 06 is display-only: nothing on it responds to clicks. */

/* ---------- Header ---------- */

export function LessonHeader() {
  const m = lessonMeta;
  const pct = Math.round(m.courseProgress * 100);
  return (
    <header className="flex items-end justify-between gap-6">
      <div className="min-w-0 space-y-1.5">
        <p className="text-xs text-muted">Courses&nbsp;&nbsp;/&nbsp;&nbsp;{m.course}</p>
        <h1 className="text-2xl font-semibold">{m.title}</h1>
        <div className="flex items-center gap-3">
          <Pill tone="surface">{m.position}</Pill>
          <span className="flex items-center gap-1.5 text-xs font-medium text-muted">
            <Icon name="clock" size={14} />
            {m.readTime}
          </span>
        </div>
      </div>
      <div className="flex w-[220px] shrink-0 flex-col items-end gap-1.5">
        <span className="text-xs font-medium text-muted">Course progress: {pct}%</span>
        <ProgressBar value={m.courseProgress} label="Course progress" className="bg-line" />
      </div>
    </header>
  );
}

/* ---------- Left: lesson list ---------- */

function LessonMarker({ state, n }: { state: LessonState; n: number }) {
  if (state === "done") {
    return (
      <span className="flex size-[22px] shrink-0 items-center justify-center rounded-full bg-brand-green-deep text-white">
        <Icon name="check" size={12} strokeWidth={2.5} />
      </span>
    );
  }
  return (
    <span
      className={cn(
        "flex size-[22px] shrink-0 items-center justify-center rounded-full text-xs",
        state === "current"
          ? "border-2 border-brand-green-deep bg-surface font-semibold text-brand-green-strong"
          : "bg-canvas font-medium text-muted",
      )}
    >
      {n}
    </span>
  );
}

export function LessonList() {
  return (
    <Card as="nav" padding="none" aria-label="Lessons in this course" className="w-[236px] shrink-0 space-y-1 px-3 py-5">
      <h2 className="text-sm font-semibold">In this course</h2>
      <ol className="space-y-1">
        {courseLessons.map((l, i) => (
          <li
            key={l.title}
            aria-current={l.state === "current" ? "step" : undefined}
            className={cn("flex items-start gap-2.5 rounded-lg p-2.5", l.state === "current" && "bg-brand-green-tint")}
          >
            <LessonMarker state={l.state} n={i + 1} />
            <div className="min-w-0 space-y-px">
              <div
                className={cn(
                  "text-sm",
                  l.state === "done" && "font-medium text-muted",
                  l.state === "current" && "font-semibold text-brand-green-strong",
                  l.state === "todo" && "font-medium",
                )}
              >
                {l.title}
                {l.state === "done" && <span className="sr-only"> (completed)</span>}
              </div>
              <div className="text-xs text-muted">{l.duration}</div>
            </div>
          </li>
        ))}
      </ol>
    </Card>
  );
}

/* ---------- Middle: article ---------- */

function TierBox({ title, subtitle, pill, wide }: { title: string; subtitle: string; pill: string; wide?: boolean }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-0.5 rounded-[10px] border border-line bg-surface py-3 text-center",
        wide ? "px-5" : "px-3.5",
      )}
    >
      <span className="text-sm font-semibold">{title}</span>
      <span className="text-xs text-muted">{subtitle}</span>
      <Pill>{pill}</Pill>
    </div>
  );
}

const DownArrow = () => <Icon name="arrowDown" size={18} className="text-brand-green" />;

function TierDiagram() {
  return (
    <figure className="flex flex-col items-center gap-2.5 rounded-xl bg-canvas px-3 py-6">
      <div className="flex flex-col items-center gap-0.5 rounded-[10px] bg-brand-navy px-5 py-3 text-center">
        <span className="text-sm font-semibold text-white">CXM</span>
        <span className="text-xs text-brand-green">Pays $10 per lot</span>
      </div>
      <DownArrow />
      <TierBox title="You (master IB)" subtitle="Keeps the override" pill="Keeps $2–4" wide />
      <ul className="flex gap-3.5">
        {subIbs.map((s) => (
          <li key={s.role} className="flex flex-col items-center gap-2.5">
            <DownArrow />
            <TierBox title="Tier 1 sub-IB" subtitle={s.role} pill={s.gets} />
          </li>
        ))}
      </ul>
      <figcaption className="text-xs text-muted">
        Each sub-IB can recruit Tier 2 sub-IBs and share their rate the same way.
      </figcaption>
    </figure>
  );
}

const AiLabel = () => <span className="ml-auto text-xs font-medium text-muted">AI-generated</span>;

/** Personalized, AI-generated callout ("Tip for you", "Watch out") in the same box style as "Info". */
function Callout({
  tone,
  icon,
  title,
  text,
  basis,
}: {
  tone: "tip" | "warning";
  icon: "bulb" | "alert";
  title: string;
  text: string;
  basis: string;
}) {
  const tip = tone === "tip";
  return (
    <aside
      aria-label={title}
      className={cn(
        "space-y-2 rounded-xl border px-5 py-[18px]",
        tip ? "border-brand-green bg-brand-green-tint" : "border-chart-3 bg-[#fef6e7]",
      )}
    >
      <div className={cn("flex items-center gap-2", tip ? "text-brand-green-strong" : "text-[#92400e]")}>
        <Icon name={icon} size={16} />
        <h3 className="text-sm font-semibold">{title}</h3>
        <AiLabel />
      </div>
      <p className="text-sm leading-6">{text}</p>
      <p className="text-xs text-muted">{basis}</p>
    </aside>
  );
}

function InfoBlock() {
  return (
    <section className="space-y-3 rounded-xl border border-brand-green bg-brand-green-tint px-5 py-[18px]">
      <div className="flex items-center gap-2">
        <Icon name="info" size={16} />
        <h3 className="text-sm font-semibold">Info</h3>
        <AiLabel />
      </div>
      <dl className="grid grid-cols-3 gap-3">
        {yourNumbers.stats.map((s) => (
          <div key={s.label} className="flex flex-col-reverse">
            <dt className="text-xs text-muted">{s.label}</dt>
            <dd className="text-xl font-semibold">{s.value}</dd>
          </div>
        ))}
      </dl>
      <p className="text-sm leading-6">{yourNumbers.note}</p>
    </section>
  );
}

function QuickCheck() {
  return (
    <section className="space-y-2.5" aria-label="Quick check">
      <Pill tone="neutral">Quick check</Pill>
      <h3 className="text-sm font-semibold">{quickCheck.question}</h3>
      <ul className="space-y-2.5">
        {quickCheck.options.map((o) => (
          <li
            key={o.label}
            className={cn(
              "flex items-center gap-2.5 rounded-lg border px-3.5 py-2.5 text-sm",
              o.selected ? "border-brand-green bg-brand-green-tint font-semibold text-brand-green-strong" : "border-line bg-surface",
            )}
          >
            {o.selected ? (
              <span className="flex size-[18px] shrink-0 items-center justify-center rounded-full bg-brand-green-deep text-white">
                <Icon name="check" size={11} strokeWidth={2.5} />
              </span>
            ) : (
              <span className="size-[18px] shrink-0 rounded-full border-[1.5px] border-line bg-surface" />
            )}
            {o.label}
            {o.selected && <span className="sr-only"> (your answer)</span>}
          </li>
        ))}
      </ul>
      <p className="text-xs font-medium text-brand-green-strong">{quickCheck.feedback}</p>
    </section>
  );
}

export function LessonArticle() {
  return (
    <Card as="article" padding="none" className="min-w-0 flex-1 space-y-4 p-8">
      <p className="text-base leading-[26px]">
        In a multi-level network, the broker pays one rebate per lot and that rebate is shared between you and the
        sub-IBs you recruited. How you split it decides whether sub-IBs stay motivated, and how much you keep.
      </p>

      <h2 className="text-xl font-semibold">The basic split</h2>
      <p className="text-sm leading-6">
        Say the broker pays $10 for every standard lot your network trades. You (the master IB) agree on a rate with
        each sub-IB and keep the difference. That difference is your override.
      </p>
      <TierDiagram />
      <Callout tone="tip" icon="bulb" title="Tip for you" {...lessonCallouts.tip} />

      <h2 className="text-xl font-semibold">Three rules for setting rates</h2>
      <ol className="space-y-4">
        {rateRules.map((r, i) => (
          <li key={i} className="flex gap-3">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-green-tint text-xs font-semibold text-brand-green-strong">
              {i + 1}
            </span>
            <p className="text-sm leading-6">{r}</p>
          </li>
        ))}
      </ol>

      <Callout tone="warning" icon="alert" title="Watch out" {...lessonCallouts.watchOut} />
      <InfoBlock />
      <QuickCheck />

      {/* Display-only lesson navigation. */}
      <div aria-hidden="true" className="flex items-center justify-between pt-2">
        <span className={classesFor({ children: null })}>
          <Icon name="arrowLeft" size={16} />
          Previous lesson
        </span>
        <span className={classesFor({ variant: "primary", children: null })}>
          Next: {nextLesson}
          <Icon name="arrowRight" size={16} />
        </span>
      </div>
    </Card>
  );
}

/* ---------- Right: apply it ---------- */

export function PossibleActivities() {
  return (
    <Card as="aside" padding="none" aria-label="Possible activities" className="w-[272px] shrink-0 space-y-3.5 p-5">
      <h2 className="text-sm font-semibold">Possible activities</h2>
      <ul className="space-y-3.5">
        {possibleActivities.map((text) => (
          <li key={text} className="flex items-start gap-2.5 text-sm">
            <span aria-hidden="true" className="mt-[7px] size-1.5 shrink-0 rounded-full bg-brand-green" />
            {text}
          </li>
        ))}
      </ul>
    </Card>
  );
}
