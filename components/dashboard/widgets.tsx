import { Card, CardHeader } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { cn } from "@/lib/cn";
import {
  churn,
  engagement,
  followerGrowth,
  funnel,
  growthAxis,
  kpis,
  telegram,
  video,
  type Kpi,
} from "@/lib/dashboard";

/* ---------- KPI row ---------- */

function KpiCard({ kpi }: { kpi: Kpi }) {
  return (
    <Card padding="none" className="space-y-2.5 p-4">
      <div className="text-xs font-medium text-muted">{kpi.label}</div>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-semibold">{kpi.value}</span>
        <Pill tone={kpi.up ? "green" : "negative"}>{kpi.delta}</Pill>
      </div>
      <div className="text-xs text-muted">Previous period: {kpi.previous}</div>
    </Card>
  );
}

export function KpiRow() {
  return (
    <section aria-label="Key figures" className="grid grid-cols-5 gap-4">
      {kpis.map((k) => (
        <KpiCard key={k.label} kpi={k} />
      ))}
    </section>
  );
}

/* ---------- Onboarding funnel ---------- */

export function FunnelCard() {
  return (
    <Card as="section" className="space-y-3.5">
      <CardHeader
        title="Onboarding funnel"
        subtitle="From first click on your links to an active trader. Broker data, matched to your referral links. The last step counts clients who first deposited 90 days earlier. Red marks a step below your 3-month average."
      />
      <ol className="grid grid-cols-5 gap-3">
        {funnel.map((step) => (
          <li key={step.label} className="space-y-2">
            <div className="flex min-h-[30px] items-center justify-between gap-2">
              <span className="text-xl font-semibold">{step.value}</span>
              {step.rateLabel && <Pill tone="neutral">{step.rateLabel}</Pill>}
            </div>
            <div className="h-2 overflow-hidden rounded bg-line">
              <div
                className={cn("h-full rounded", step.belowAverage ? "bg-negative" : "bg-brand-green")}
                style={{ width: `${(step.rate ?? 1) * 100}%` }}
              />
            </div>
            <div className="text-xs text-muted">{step.label}</div>
          </li>
        ))}
      </ol>
    </Card>
  );
}

/* ---------- Follower growth (line chart) ---------- */

const W = 660;
const H = 200;

function LineChart() {
  const x = (i: number, n: number) => 4 + (i / (n - 1)) * (W - 8);
  const y = (v: number) => H - 1 - (v / growthAxis.max) * (H - 2);
  return (
    <div className="flex gap-2">
      <div className="flex h-[200px] w-[30px] shrink-0 flex-col justify-between text-right text-[11px] leading-none text-muted">
        {growthAxis.ticks.map((t) => (
          <span key={t}>{t}%</span>
        ))}
      </div>
      <div className="min-w-0 flex-1 space-y-1.5">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="h-[200px] w-full overflow-visible"
          role="img"
          aria-label={`Follower growth per channel, ${growthAxis.dates[0]} to ${growthAxis.dates.at(-1)}: ${followerGrowth
            .map((s) => `${s.channel} +${s.points.at(-1)}%`)
            .join(", ")}`}
        >
          {growthAxis.ticks.map((t, i) => (
            <line
              key={t}
              x1={0}
              x2={W}
              y1={y(t)}
              y2={y(t)}
              stroke="var(--color-line)"
              strokeDasharray={i < growthAxis.ticks.length - 1 ? "4 4" : undefined}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {followerGrowth.map((s) => (
            <polyline
              key={s.channel}
              points={s.points.map((v, i) => `${x(i, s.points.length)},${y(v)}`).join(" ")}
              fill="none"
              stroke={s.color}
              strokeWidth={2.5}
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
        <div className="flex justify-between text-[11px] text-muted">
          {growthAxis.dates.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Followers / Growth % switch — display-only in the demo (Growth % is shown). */
function ViewToggle() {
  return (
    <div className="flex gap-1 rounded-full bg-canvas p-1 text-xs font-medium" aria-hidden="true">
      <span className="rounded-full px-3 py-1 text-muted">Followers</span>
      <span className="rounded-full bg-surface px-3 py-1">Growth %</span>
    </div>
  );
}

export function FollowerGrowthCard() {
  return (
    <Card as="section" className="flex min-w-0 flex-1 flex-col gap-4">
      <CardHeader
        title="Follower growth by channel"
        subtitle="Growth since the start of the period, per channel. Source: your connected channels."
        action={<ViewToggle />}
      />
      <LineChart />
      <ul className="flex flex-wrap gap-x-[18px] gap-y-2 text-xs">
        {followerGrowth.map((s) => (
          <li key={s.channel} className="flex items-center gap-1.5">
            <span className="size-2 rounded-full" style={{ background: s.color }} aria-hidden="true" />
            <span className="text-muted">{s.channel}</span>
            <span className="font-semibold">+{s.points.at(-1)?.toFixed(1)}%</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* ---------- Horizontal bar rows (engagement, video formats) ---------- */

function BarRow({
  label,
  value,
  share,
  color,
  labelWidth,
  labelWeight = "font-medium",
}: {
  label: string;
  value: string;
  share: number;
  color: string;
  labelWidth: number;
  labelWeight?: string;
}) {
  return (
    <li className="flex items-center gap-2.5 text-xs">
      <span className={cn("shrink-0", labelWeight)} style={{ width: labelWidth }}>
        {label}
      </span>
      <span className="h-2.5 flex-1 overflow-hidden rounded-[5px] bg-canvas">
        <span className="block h-full rounded-[5px]" style={{ width: `${share * 100}%`, background: color }} />
      </span>
      <span className="w-10 shrink-0 text-right font-semibold">{value}</span>
    </li>
  );
}

export function EngagementCard() {
  const max = 8; // axis maximum, as in Figma
  return (
    <Card as="section" className="flex w-[372px] shrink-0 flex-col gap-4">
      <CardHeader
        title="Engagement rate by channel"
        subtitle="Interactions divided by views. Each channel counts interactions differently, so compare trends, not channels."
      />
      <ul className="flex flex-1 flex-col justify-around">
        {engagement.map((e) => (
          <BarRow
            key={e.channel}
            label={e.channel}
            value={`${e.rate}%`}
            share={e.rate / max}
            color={e.color}
            labelWidth={68}
          />
        ))}
      </ul>
    </Card>
  );
}

/* ---------- Client churn (vertical bars) ---------- */

const churnColor = (rate: number) =>
  rate >= 50 ? "var(--color-negative)" : rate >= 35 ? "var(--color-chart-3)" : "var(--color-brand-green)";

export function ChurnCard() {
  const pxPerPoint = 117 / 63; // tallest bar (63%) is 117px in Figma
  return (
    <Card as="section" className="flex flex-1 flex-col gap-4">
      <CardHeader
        title="Client churn by channel"
        subtitle="Share of funded clients who stopped trading within 90 days, by the channel they came from. Source: broker."
      />
      <ul className="flex flex-1 items-end gap-2.5" aria-label="Churn rate by channel">
        {churn.map((c) => (
          <li key={c.channel} className="flex flex-1 flex-col items-center gap-1.5">
            <span className="text-xs font-semibold">{c.rate}%</span>
            <span
              className="w-full rounded-t-md"
              style={{ height: c.rate * pxPerPoint, background: churnColor(c.rate) }}
            />
            <span className="text-[11px] text-muted">{c.channel}</span>
          </li>
        ))}
      </ul>
      <ul className="flex gap-3 text-xs text-muted">
        {[
          ["Under 35%", "var(--color-brand-green)"],
          ["35–49%", "var(--color-chart-3)"],
          ["50% or more", "var(--color-negative)"],
        ].map(([label, color]) => (
          <li key={label} className="flex items-center gap-1.5">
            <span className="size-2 rounded-full" style={{ background: color }} aria-hidden="true" />
            {label}
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* ---------- Video watch time ---------- */

function Stat({ label, value, pill, tone = "green", size = "lg" }: {
  label: string;
  value: string;
  pill: string;
  tone?: "green" | "negative" | "neutral";
  size?: "lg" | "md";
}) {
  return (
    <div className="space-y-0.5">
      <div className="text-xs text-muted">{label}</div>
      <div className="flex items-center gap-1.5">
        <span className={cn("font-semibold", size === "lg" ? "text-xl" : "text-base")}>{value}</span>
        <Pill tone={tone}>{pill}</Pill>
      </div>
    </div>
  );
}

export function VideoCard() {
  const longest = Math.max(...video.formats.map((f) => f.seconds));
  return (
    <Card as="section" className="flex flex-1 flex-col gap-4">
      <CardHeader title="Video watch time" subtitle="YouTube" />
      <div className="flex gap-6">
        <Stat label="Watch time" value={video.watchTime.value} pill={video.watchTime.delta} />
        <Stat label="Average view duration" value={video.avgDuration.value} pill={video.avgDuration.delta} />
      </div>
      <div className="space-y-2.5">
        <h4 className="text-xs font-medium">Average view duration by format</h4>
        <ul className="space-y-2.5">
          {video.formats.map((f) => (
            <BarRow
              key={f.label}
              label={f.label}
              value={f.value}
              share={f.seconds / longest}
              color="var(--color-chart-2)"
              labelWidth={84}
              labelWeight="font-normal"
            />
          ))}
        </ul>
      </div>
    </Card>
  );
}

/* ---------- Telegram channel health ---------- */

function Donut({ share }: { share: number }) {
  // Ring thickness is 28% of the radius, as in Figma (inner radius 0.72).
  const r = 65 - 65 * 0.14;
  const stroke = 65 * 0.28;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative size-[130px] shrink-0">
      <svg viewBox="0 0 130 130" className="size-full -rotate-90" aria-hidden="true">
        <circle cx="65" cy="65" r={r} fill="none" stroke="var(--color-canvas)" strokeWidth={stroke} />
        <circle
          cx="65"
          cy="65"
          r={r}
          fill="none"
          stroke="var(--color-chart-2)"
          strokeWidth={stroke}
          strokeDasharray={`${c * share} ${c}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-xl font-semibold">{Math.round(share * 100)}%</span>
        <span className="text-[11px] leading-tight text-muted">
          notifications
          <br />
          on
        </span>
      </div>
    </div>
  );
}

export function TelegramHealthCard() {
  return (
    <Card as="section" className="flex flex-1 flex-col gap-4">
      <CardHeader
        title="Telegram channel health"
        subtitle={`${telegram.handle} · ${telegram.members} members`}
      />
      <div className="flex items-center gap-5">
        <Donut share={telegram.notificationsOn} />
        <div className="space-y-3">
          {telegram.stats.map((s) => (
            <Stat key={s.label} label={s.label} value={s.value} pill={s.pill} tone={s.tone} size="md" />
          ))}
        </div>
      </div>
    </Card>
  );
}
