import { Icon } from "@/components/icons";
import { Card } from "@/components/ui/card";

const groups = [
  {
    name: "CXM broker funnel",
    count: 5,
    detail: "Funded accounts, registrations funded, KYC completion, 90-day retention, churn by channel",
  },
  { name: "Telegram", count: 4, detail: "Member growth, view-to-member ratio, notifications enabled, link clicks" },
  { name: "YouTube", count: 2, detail: "Watch time and average view duration for videos, Shorts and live streams" },
  { name: "Social reach", count: 2, detail: "Follower growth and engagement rate, all channels" },
  { name: "Webinars", count: 2, detail: "Show-up rate, deposits by attendees" },
];

const courses = ["Getting clients through KYC", "Ways to win and keep clients", "Working with clients in Indonesia"];

/** Dark side panel on Screen 01 showing the dashboard preset the AI suggests. */
export function PresetPreview() {
  return (
    <Card tone="dark" as="aside" padding="lg" className="flex w-[380px] shrink-0 flex-col gap-4">
      <h2 className="text-xl font-semibold leading-snug">Suggested preset: Telegram &amp; YouTube educator</h2>
      <p className="text-sm leading-relaxed text-white/[0.68]">
        Tracks your Telegram and YouTube audience and where sign-ups stall before the first deposit.
      </p>

      <ul className="space-y-2">
        {groups.map((g) => (
          <li key={g.name} className="space-y-1 rounded-[10px] bg-white/[0.06] px-3.5 py-2.5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold">{g.name}</span>
              <span className="text-xs font-medium text-brand-green">{g.count} metrics</span>
            </div>
            <p className="text-xs leading-relaxed text-white/[0.68]">{g.detail}</p>
          </li>
        ))}
      </ul>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Courses picked for you</h3>
        <ul className="space-y-2">
          {courses.map((c) => (
            <li key={c} className="flex items-center gap-2 text-xs">
              <Icon name="book" size={14} className="text-brand-green" />
              {c}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto space-y-2">
        <div className="flex items-center gap-2 text-xs font-medium text-brand-green">
          <Icon name="spark" size={18} />
          Suggested by AI from your answers
        </div>
        <p className="text-xs leading-relaxed text-white/[0.68]">
          The preset updates as you change your answers. You can change any metric later in Customize.
        </p>
      </div>
    </Card>
  );
}
