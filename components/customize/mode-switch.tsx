import Link from "next/link";
import { cn } from "@/lib/cn";

const modes = [
  { label: "Suggested preset", href: "/onboarding" },
  { label: "Pick channels & metrics", href: "/dashboard/customize" },
] as const;

/** Switch between the AI-suggested preset (Screen 01) and manual picking (Screen 03). */
export function ModeSwitch({ current }: { current: (typeof modes)[number]["href"] }) {
  return (
    <nav aria-label="How to build your dashboard" className="inline-flex gap-1 rounded-full border border-line bg-surface p-1">
      {modes.map((m) => {
        const active = m.href === current;
        return (
          <Link
            key={m.href}
            href={m.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-full px-4 py-[7px] text-sm font-medium transition",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green-strong",
              active ? "bg-brand-navy text-white" : "text-muted hover:bg-canvas hover:text-ink",
            )}
          >
            {m.label}
          </Link>
        );
      })}
    </nav>
  );
}
