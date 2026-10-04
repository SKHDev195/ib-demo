/**
 * Demo figures for Screen 02 (period Sep 6 – Oct 5, 2026). They match the
 * Figma file and the other screens (funnel, Strategy, onboarding counts).
 */
import { day, type DateRange } from "./dates";

export const defaultPeriod: DateRange = { start: day(2026, 8, 6), end: day(2026, 9, 5) };

export const presetName = "Telegram & YouTube educator";

export type Kpi = { label: string; value: string; delta: string; up: boolean; previous: string };

export const kpis: Kpi[] = [
  { label: "New funded accounts", value: "48", delta: "+12%", up: true, previous: "43" },
  { label: "Registrations funded", value: "31.4%", delta: "+2.1 pts", up: true, previous: "29.3%" },
  { label: "Follower growth", value: "+7.2%", delta: "+1.4 pts", up: true, previous: "+5.8%" },
  { label: "Engagement rate", value: "4.9%", delta: "−0.3 pts", up: false, previous: "5.2%" },
  { label: "Webinar show-up rate", value: "42%", delta: "+5 pts", up: true, previous: "37%" },
];

export type FunnelStep = { label: string; value: string; rate?: number; rateLabel?: string; /** Below the IB's own 3-month average. */ belowAverage?: boolean };

export const funnel: FunnelStep[] = [
  { label: "Link clicks", value: "1,577" },
  { label: "Registrations", value: "153", rate: 0.097, rateLabel: "9.7% registered" },
  { label: "KYC verified", value: "81", rate: 0.529, rateLabel: "52.9% verified", belowAverage: true },
  { label: "First deposit", value: "48", rate: 0.593, rateLabel: "59.3% deposited" },
  { label: "Active after 90 days", value: "19", rate: 0.396, rateLabel: "39.6% still active" },
];

export const growthAxis = { max: 12, ticks: [12, 9, 6, 3, 0], dates: ["Sep 6", "Sep 13", "Sep 20", "Sep 27", "Oct 4"] };

/** Cumulative follower growth (%) at each weekly tick. */
export const followerGrowth = [
  { channel: "Telegram", color: "#3B82F6", points: [0, 1.38, 3.24, 5.11, 6.9] },
  { channel: "YouTube", color: "#EE443F", points: [0, 1.74, 3.02, 4.12, 5.8] },
  { channel: "Instagram", color: "#EC4899", points: [0, 0.94, 2.6, 4.16, 5.2] },
  { channel: "TikTok", color: "#131927", points: [0, 1.44, 4.56, 8.4, 12.0] },
];

export const engagement = [
  { channel: "TikTok", color: "#131927", rate: 7.8 },
  { channel: "Instagram", color: "#EC4899", rate: 5.6 },
  { channel: "YouTube", color: "#EE443F", rate: 4.1 },
  { channel: "Telegram", color: "#3B82F6", rate: 3.9 },
];

export const churn = [
  { channel: "Referral", rate: 24 },
  { channel: "Webinar", rate: 29 },
  { channel: "Telegram", rate: 38 },
  { channel: "YouTube", rate: 44 },
  { channel: "Instagram", rate: 57 },
  { channel: "TikTok", rate: 63 },
];

export const video = {
  watchTime: { value: "1,284 h", delta: "+18%" },
  avgDuration: { value: "5:47", delta: "+0:32" },
  formats: [
    { label: "Live streams", seconds: 680, value: "11:20" },
    { label: "Videos", seconds: 402, value: "6:42" },
    { label: "Shorts", seconds: 38, value: "0:38" },
  ],
};

export const telegram = {
  handle: "@amir_fx_signals",
  members: "8,420",
  notificationsOn: 0.64,
  stats: [
    { label: "Net new members", value: "+540", pill: "+6.9%", tone: "green" as const },
    { label: "View-to-member ratio", value: "38%", pill: "−3 pts", tone: "negative" as const },
    { label: "Link clicks from your posts", value: "890", pill: "56% of all link clicks", tone: "neutral" as const },
  ],
};
