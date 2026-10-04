import { BrandTile, type BrandName } from "@/components/brand-logos";
import { classesFor } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";

type Channel = {
  brand: BrandName;
  name: string;
  status: "connected" | "not-connected" | "automatic";
  account?: string;
  adds: string;
};

const channels: Channel[] = [
  {
    brand: "telegram",
    name: "Telegram",
    status: "connected",
    account: "@amir_fx_signals · 8,420 members",
    adds: "Adds member growth, view-to-member ratio, notifications enabled and link clicks",
  },
  {
    brand: "youtube",
    name: "YouTube",
    status: "not-connected",
    account: "Connects through your Google account",
    adds: "Adds watch time and average view duration for videos, Shorts and live streams",
  },
  {
    brand: "instagram",
    name: "Instagram",
    status: "connected",
    account: "@amir.trades · 3,810 followers",
    adds: "Adds follower growth and engagement rate",
  },
  {
    brand: "tiktok",
    name: "TikTok",
    status: "connected",
    account: "@amirfx · 3,920 followers",
    adds: "Adds follower growth and engagement rate",
  },
  {
    brand: "zoom",
    name: "Webinars (Zoom)",
    status: "connected",
    account: "Amir Kusuma’s account · 14 webinars found",
    adds: "Adds show-up rate. Deposits by attendees come from CXM data.",
  },
  {
    brand: "cxm",
    name: "CXM broker data",
    status: "automatic",
    adds: "Registrations, KYC, deposits and trading activity from your referral links",
  },
];

const statusPill = {
  connected: <Pill>Connected</Pill>,
  "not-connected": <Pill tone="neutral">Not connected</Pill>,
  automatic: <Pill>Connected automatically</Pill>,
};

/**
 * Screen 01b channel list. In the demo the Connect / Disconnect controls are
 * display-only, so they are rendered as plain text rather than buttons.
 */
export function ChannelList() {
  return (
    <Card padding="none" className="py-2">
      <ul className="divide-y divide-line">
        {channels.map((ch) => (
          <li key={ch.name} className="flex items-center gap-3.5 px-5 py-4">
            <BrandTile name={ch.brand} />
            <div className="min-w-0 flex-1 space-y-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold">{ch.name}</span>
                {statusPill[ch.status]}
              </div>
              {ch.account && (
                <p className={ch.status === "connected" ? "text-xs font-medium" : "text-xs font-medium text-muted"}>
                  {ch.account}
                </p>
              )}
              <p className="text-xs text-muted">{ch.adds}</p>
            </div>
            {ch.status === "connected" && <span className="text-xs font-medium text-muted">Disconnect</span>}
            {ch.status === "not-connected" && (
              <span className={classesFor({ variant: "primary", children: null, className: "pointer-events-none" })}>
                Connect
              </span>
            )}
          </li>
        ))}
      </ul>
    </Card>
  );
}
