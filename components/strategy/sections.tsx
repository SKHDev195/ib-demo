import { Icon, type IconName } from "@/components/icons";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { ProgressBar } from "@/components/ui/progress-bar";
import { SourceTag } from "@/components/ui/source-tag";
import { cn } from "@/lib/cn";
import { focusAreas, funnelVsAverage, tier, weekCourses } from "@/lib/strategy";

/* ---------- Header pieces ---------- */

const headerSources: Array<{ icon: IconName; label: string }> = [
  { icon: "database", label: "CXM broker data (12 metrics)" },
  { icon: "grid", label: "Your dashboard (15 metrics)" },
  { icon: "globe", label: "Web research (9 sources)" },
];

export function SourcesLine() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-muted">Updated Oct 6, 09:12, from</span>
      {headerSources.map((s) => (
        <span
          key={s.label}
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface py-1 pl-2.5 pr-3 text-xs font-medium text-ink"
        >
          <Icon name={s.icon} size={14} className="text-brand-green-deep" />
          {s.label}
        </span>
      ))}
    </div>
  );
}

/** Today / This week / This month / Next 6 months — display-only, "This week" selected. */
export function TimeframeTabs() {
  return (
    <div className="inline-flex gap-1 rounded-full border border-line bg-surface p-1" aria-label="Timeframe: This week">
      {["Today", "This week", "This month", "Next 6 months"].map((t) => (
        <span
          key={t}
          className={cn(
            "rounded-full px-[18px] py-[7px] text-sm font-medium",
            t === "This week" ? "bg-brand-navy text-white" : "text-muted",
          )}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

/* ---------- Left column ---------- */

export function FocusSummary() {
  return (
    <Card tone="tint" padding="lg" as="section" className="space-y-3">
      <h2 className="text-xl font-semibold">Get more sign-ups through KYC before growing your audience</h2>
      <p className="text-sm leading-relaxed">
        Almost half of your registrations never finish KYC: 52.9% complete it, down from 61% over the previous 3
        months. Your traffic is healthy: Telegram members grew 6.9% and TikTok engagement is the highest of your
        channels. Getting KYC completion back to 60% would add about 6 funded accounts a month without any extra
        reach.
      </p>
    </Card>
  );
}

export function FunnelVsAverage() {
  const { nodes, edges } = funnelVsAverage;
  return (
    <Card as="section" className="space-y-4">
      <div>
        <h2 className="text-base font-semibold">Your funnel vs your 3-month average</h2>
        <p className="mt-0.5 text-xs text-muted">
          Conversion between steps over the last 30 days, compared with your own average for the previous 3 months.
          Steps below your average are marked red.
        </p>
      </div>

      <ol className="flex items-center" aria-label="Funnel steps with conversion compared with your 3-month average">
        {nodes.map((n, i) => (
          <li key={n.label} className="contents">
            <div
              className={cn(
                "flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-[10px] border px-1 py-3 text-center",
                n.below ? "border-negative bg-negative/[0.08]" : "border-line bg-canvas",
              )}
            >
              <span className={cn("text-xl font-semibold", n.below && "text-negative-strong")}>{n.value}</span>
              <span className="text-xs text-muted">{n.label}</span>
            </div>
            {edges[i] && (
              <div className="flex shrink-0 flex-col items-center gap-0.5 px-1.5">
                <span
                  className={cn(
                    "text-xs font-semibold",
                    edges[i].below ? "text-negative-strong" : "text-brand-green-strong",
                  )}
                >
                  {edges[i].rate}
                </span>
                <Icon
                  name="arrowRight"
                  size={18}
                  className={edges[i].below ? "text-negative" : "text-brand-green"}
                />
                <span className="text-[11px] text-muted">vs {edges[i].average}</span>
              </div>
            )}
          </li>
        ))}
      </ol>

      <div className="flex items-start gap-2.5 rounded-[10px] bg-negative/[0.07] px-3.5 py-3 text-sm leading-relaxed">
        <Icon name="alert" size={16} className="mt-0.5 shrink-0 text-negative" />
        <p>
          <strong className="font-semibold">Likely causes:</strong> ID requirements that are unclear in Indonesian,
          users switching from mobile to desktop mid-flow, and no follow-up in the first 24 hours after sign-up. Based
          on web research and CXM support data. <span className="underline">See the 9 sources</span>
        </p>
      </div>
    </Card>
  );
}

/* ---------- Right column ---------- */

export function FocusAreas() {
  return (
    <Card as="section" className="space-y-3.5">
      <h2 className="text-base font-semibold">Focus areas, ranked</h2>
      <ol className="space-y-3.5">
        {focusAreas.map((f, i) => (
          <li key={f.title} className="flex items-start gap-3">
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                i === 0 ? "bg-brand-green-strong text-white" : "bg-canvas",
              )}
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <div className="min-w-0 space-y-[3px]">
              <h3 className="text-sm font-semibold">{f.title}</h3>
              <p className="text-xs text-muted">{f.detail}</p>
              <Pill>{f.estimate}</Pill>
              <div className="flex flex-wrap gap-1.5 pt-[3px]">
                {f.sources.map((s) => (
                  <SourceTag key={s} source={s} />
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Card>
  );
}

export function TierProgress() {
  return (
    <Card as="section" className="space-y-3.5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="whitespace-nowrap text-base font-semibold">Progress to {tier.next}</h2>
        <Pill tone="neutral">{tier.review}</Pill>
      </div>

      <div className="flex items-center gap-2" aria-label={`Current tier ${tier.current}, next tier ${tier.next}`}>
        <span
          className="rounded-full px-3 py-[5px] text-xs font-semibold"
          style={{ background: "linear-gradient(90deg, #D4A12E 0%, #F5CC5C 100%)" }}
        >
          {tier.current}
        </span>
        <Icon name="arrowRight" size={16} className="text-subtle" />
        <span className="rounded-full border border-line bg-canvas px-3 py-[5px] text-xs font-semibold">{tier.next}</span>
      </div>

      {tier.requirements.map((r) => (
        <div key={r.label} className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="font-medium">{r.label}</span>
            <span className="font-semibold">
              {r.value} / {r.target}
            </span>
          </div>
          <ProgressBar value={r.value / r.target} label={r.label} />
        </div>
      ))}

      <div className="space-y-1.5">
        <h3 className="text-xs font-semibold">{tier.next} unlocks</h3>
        <ul className="space-y-1.5">
          {tier.unlocks.map((u) => (
            <li key={u} className="flex items-center gap-1.5 text-xs">
              <Icon name="check" size={13} className="text-brand-green-strong" />
              {u}
            </li>
          ))}
        </ul>
      </div>

      <p className="flex items-start gap-2 text-xs text-muted">
        <Icon name="info" size={14} className="mt-px shrink-0" />
        {tier.consequence}
      </p>
      <p className="text-xs font-medium leading-relaxed">{tier.pace}</p>
      <SourceTag source="broker" />
    </Card>
  );
}

export function LearnThisWeek() {
  return (
    <Card as="section" className="space-y-3.5">
      <h2 className="text-base font-semibold">Learn this week</h2>
      <ul className="space-y-3.5">
        {weekCourses.map((c) => (
          <li key={c.title} className="flex items-center gap-3 rounded-[10px] bg-canvas p-2.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-green-tint text-brand-green-deep">
              <Icon name="book" size={16} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold">{c.title}</span>
              <span className="block text-xs text-muted">{c.meta}</span>
            </span>
            <Icon name="chevronRight" size={14} className="shrink-0 text-muted" />
          </li>
        ))}
      </ul>
    </Card>
  );
}
