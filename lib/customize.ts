/** Data for Screen 03 (Customize dashboard). Telegram copy is from Figma; other channels use placeholder text. */
import type { BrandName } from "@/components/brand-logos";

export type Metric = { name: string; description: string; shown: boolean };

export type ChannelGroup = "connected" | "not-connected" | "always-on";

export type CustomizeChannel = {
  id: string;
  brand: BrandName;
  name: string;
  group: ChannelGroup;
  /** Second line in the channel list. */
  status: string;
  /** Small action pill shown instead of the chevron (not-connected channels). */
  action?: string;
  /** Second line in the metrics panel header. */
  panelSubtitle: string;
  metrics: Metric[];
};

const lorem = [
  ["Lorem ipsum dolor", "Sit amet, consectetur adipiscing elit"],
  ["Sed do eiusmod", "Tempor incididunt ut labore et dolore magna aliqua"],
  ["Ut enim ad minim", "Veniam, quis nostrud exercitation ullamco"],
  ["Duis aute irure", "Dolor in reprehenderit in voluptate velit esse"],
  ["Excepteur sint", "Occaecat cupidatat non proident, sunt in culpa"],
  ["Nemo enim ipsam", "Voluptatem quia voluptas sit aspernatur aut odit"],
  ["Neque porro quisquam", "Est, qui dolorem ipsum quia dolor sit amet"],
  ["Quis autem vel", "Eum iure reprehenderit qui in ea voluptate"],
  ["At vero eos", "Et accusamus et iusto odio dignissimos ducimus"],
  ["Nam libero tempore", "Cum soluta nobis est eligendi optio cumque"],
  ["Temporibus autem", "Quibusdam et aut officiis debitis aut rerum"],
  ["Itaque earum rerum", "Hic tenetur a sapiente delectus, ut aut reiciendis"],
] as const;

/** `total` placeholder metrics, the first `shown` of them selected. */
function placeholderMetrics(total: number, shown: number): Metric[] {
  return lorem.slice(0, total).map(([name, description], i) => ({ name, description, shown: i < shown }));
}

const telegramMetrics: Metric[] = [
  { name: "Channel member growth", description: "Joins minus leaves, per day or week", shown: true },
  { name: "View-to-member ratio", description: "Average views per post divided by members", shown: true },
  { name: "Notifications enabled", description: "Members who get an alert when you post", shown: true },
  { name: "Link clicks from your posts", description: "Clicks on your tracked referral links in the channel", shown: true },
  { name: "Views per post", description: "Whether posts reach more or fewer members over time", shown: false },
  { name: "Members who left", description: "Daily or weekly, to spot posts that drive people away", shown: false },
  { name: "Shares per post", description: "How often members forward your posts", shown: false },
  { name: "Reactions per post", description: "Emoji reactions, a quick read on which posts land", shown: false },
  { name: "Member languages", description: "Share of members by app language", shown: false },
  { name: "Best posting hour", description: "Hours when your posts get the most views", shown: false },
];

const shownOf = (m: Metric[]) => `${m.filter((x) => x.shown).length} of ${m.length} metrics shown`;

function connected(id: string, brand: BrandName, name: string, total: number, shown: number): CustomizeChannel {
  const metrics = placeholderMetrics(total, shown);
  return { id, brand, name, group: "connected", status: shownOf(metrics), panelSubtitle: shownOf(metrics), metrics };
}

export const channels: CustomizeChannel[] = [
  {
    id: "telegram",
    brand: "telegram",
    name: "Telegram",
    group: "connected",
    status: shownOf(telegramMetrics),
    panelSubtitle: `@amir_fx_signals · ${shownOf(telegramMetrics)}`,
    metrics: telegramMetrics,
  },
  connected("youtube", "youtube", "YouTube", 8, 2),
  connected("instagram", "instagram", "Instagram", 9, 2),
  connected("tiktok", "tiktok", "TikTok", 7, 2),
  connected("zoom", "zoom", "Webinars (Zoom)", 5, 2),
  {
    id: "whatsapp",
    brand: "whatsapp",
    name: "WhatsApp",
    group: "not-connected",
    status: "Link tracking only",
    action: "Set up link",
    panelSubtitle: "Link tracking only · lorem ipsum dolor sit amet",
    metrics: placeholderMetrics(3, 0),
  },
  {
    id: "facebook",
    brand: "facebook",
    name: "Facebook",
    group: "not-connected",
    status: "Link tracking only",
    action: "Set up link",
    panelSubtitle: "Link tracking only · lorem ipsum dolor sit amet",
    metrics: placeholderMetrics(3, 0),
  },
  {
    id: "discord",
    brand: "discord",
    name: "Discord",
    group: "not-connected",
    status: "Not connected",
    action: "Connect",
    panelSubtitle: "Not connected · lorem ipsum dolor sit amet",
    metrics: placeholderMetrics(4, 0),
  },
  { ...connected("cxm", "cxm", "CXM broker data", 12, 5), group: "always-on" },
];

export const channelGroups: Array<{ id: ChannelGroup; label: string }> = [
  { id: "connected", label: "CONNECTED" },
  { id: "not-connected", label: "NOT CONNECTED" },
  { id: "always-on", label: "ALWAYS ON" },
];

export type Widget = { id: string; name: string; source: string };

/** The first 10 of the 15 dashboard metrics, in their current order. */
export const layoutWidgets: Widget[] = [
  { id: "funded", name: "New funded accounts", source: "Broker" },
  { id: "reg-funded", name: "Registrations funded", source: "Broker" },
  { id: "funnel", name: "Onboarding funnel", source: "Broker" },
  { id: "followers", name: "Follower growth by channel", source: "All channels" },
  { id: "engagement", name: "Engagement rate by channel", source: "All channels" },
  { id: "tg-growth", name: "Channel member growth", source: "Telegram" },
  { id: "tg-ratio", name: "View-to-member ratio", source: "Telegram" },
  { id: "tg-notifications", name: "Notifications enabled", source: "Telegram" },
  { id: "tg-clicks", name: "Link clicks from your posts", source: "Telegram" },
  { id: "yt-watch", name: "Video watch time", source: "YouTube" },
];

/* ---------- "Add a channel" catalog (Screen 03b) ---------- */

export type CatalogChannel = {
  name: string;
  /** Brand logo, or a generic icon for non-brand channels. */
  brand?: BrandName;
  icon?: "users";
  color?: string;
  regions: string;
  /** "api" = metrics come in automatically; "link" = tracked links only. */
  kind: "api" | "link";
  availability: string;
  metrics: string[];
};

export const catalogRegions = ["All regions", "Southeast Asia", "MENA", "LATAM", "Africa", "Europe"] as const;

export const catalog: CatalogChannel[] = [
  {
    name: "LINE",
    brand: "line",
    regions: "Thailand · Japan · Taiwan",
    kind: "api",
    availability: "5 automatic metrics",
    metrics: ["Friend growth", "Message impressions", "Link clicks", "Block rate", "Audience demographics"],
  },
  {
    name: "Zalo",
    brand: "zalo",
    regions: "Vietnam",
    kind: "api",
    availability: "1 automatic metric + link tracking",
    metrics: ["Follower growth", "Registrations", "Link clicks"],
  },
  {
    name: "Viber",
    brand: "viber",
    regions: "Philippines · Myanmar",
    kind: "api",
    availability: "1 automatic metric + link tracking",
    metrics: ["Bot subscribers", "Registrations", "Link clicks"],
  },
  {
    name: "Lemon8",
    brand: "lemon8",
    regions: "Thailand · Indonesia",
    kind: "link",
    availability: "Link tracking only",
    metrics: ["Link clicks", "Registrations", "Funded accounts"],
  },
  {
    name: "Offline seminars",
    icon: "users",
    color: "#6D717F",
    regions: "Any country",
    kind: "link",
    availability: "QR or link tracking + manual entry",
    metrics: ["Attendees", "QR scans", "Registrations", "Funded accounts"],
  },
];
