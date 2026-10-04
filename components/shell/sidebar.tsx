"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/icons";
import { Avatar } from "@/components/ui/avatar";
import { ProgressBar } from "@/components/ui/progress-bar";
import { cn } from "@/lib/cn";
import { profile } from "@/lib/profile";
import { usePlan } from "./plan-context";

type NavItem = { label: string; icon: IconName; href: string; /** Extra paths that also highlight this item. */ alsoActiveOn?: string[] };

// The IB area is the broker's existing product; its pages are outside this demo.
const ibArea: NavItem[] = [
  { label: "Earnings & reports", icon: "chart", href: "#" },
  { label: "Referral links", icon: "link", href: "#" },
  { label: "Your network", icon: "users", href: "#" },
  { label: "Contact broker", icon: "message", href: "#" },
];

const academy: NavItem[] = [
  { label: "Dashboard", icon: "grid", href: "/dashboard", alsoActiveOn: ["/onboarding"] },
  { label: "Strategy", icon: "compass", href: "/strategy" },
  { label: "Courses", icon: "book", href: "/courses" },
];

function NavGroup({ title, items, pathname }: { title: string; items: NavItem[]; pathname: string }) {
  return (
    <div>
      <h2 className="mb-0.5 text-xs font-semibold tracking-[0.08em] text-muted">{title}</h2>
      <ul className="space-y-0.5">
        {items.map((item) => {
          const active =
            item.href !== "#" &&
            [item.href, ...(item.alsoActiveOn ?? [])].some((p) => pathname === p || pathname.startsWith(p + "/"));
          return (
            <li key={item.label}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-[9px] text-sm transition",
                  active
                    ? "bg-brand-green-tint font-semibold text-brand-green-strong"
                    : "font-medium text-ink hover:bg-canvas",
                )}
              >
                <Icon name={item.icon} size={18} className={active ? "text-brand-green-strong" : "text-muted"} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const { done, total } = usePlan();

  return (
    <aside className="sticky top-[60px] flex h-[calc(100vh-60px)] w-[240px] shrink-0 flex-col justify-between border-r border-line bg-surface px-4 py-5">
      <nav aria-label="Main" className="space-y-6">
        <NavGroup title="IB AREA" items={ibArea} pathname={pathname} />
        <NavGroup title="ACADEMY" items={academy} pathname={pathname} />
      </nav>

      <div className="space-y-2.5 rounded-xl bg-canvas p-3.5">
        <div className="flex items-center gap-2.5">
          <Avatar initials={profile.initials} size={36} tone="navy" />
          <div className="leading-tight">
            <div className="text-sm font-semibold">{profile.name}</div>
            <div className="text-xs text-muted">
              {profile.tier} · {profile.country}
            </div>
          </div>
        </div>
        <Link href="/strategy" className="block space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-muted">This week’s plan</span>
            <span className="font-semibold text-brand-green-strong">
              {done} of {total} done
            </span>
          </div>
          <ProgressBar value={done / total} label="This week’s plan progress" className="bg-line" />
        </Link>
      </div>
    </aside>
  );
}
