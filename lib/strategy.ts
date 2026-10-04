/** Demo content for Screen 04 (Strategy). Figures match the dashboard and the Figma file. */

export type ActionChannel = { label: string; color: string };
export type Impact = "High" | "Medium" | "Low";

export type PlanAction = {
  id: string;
  day: string;
  text: string;
  channel: ActionChannel;
  impact: Impact;
};

const ch = {
  telegram: { label: "Telegram", color: "var(--color-chart-2)" },
  broker: { label: "Broker", color: "var(--color-brand-green-deep)" },
  whatsapp: { label: "WhatsApp", color: "var(--color-chart-6)" },
  youtube: { label: "YouTube", color: "var(--color-negative)" },
  webinar: { label: "Webinar", color: "var(--color-chart-4)" },
  tiktok: { label: "TikTok", color: "var(--color-brand-navy)" },
  dashboard: { label: "Dashboard", color: "var(--color-brand-green-deep)" },
} satisfies Record<string, ActionChannel>;

export const planWeek = "Oct 5 – 11";

export const planActions: PlanAction[] = [
  {
    id: "pin-kyc-guide",
    day: "Mon",
    text: "Pin a step-by-step KYC guide (in Indonesian, with photos of accepted IDs) in your Telegram channel",
    channel: ch.telegram,
    impact: "High",
  },
  {
    id: "ask-unverified-list",
    day: "Mon",
    text: "Ask CXM support for the list of 72 registrations that haven’t completed KYC",
    channel: ch.broker,
    impact: "High",
  },
  {
    id: "message-unverified",
    day: "Tue",
    text: "Message unverified registrations within 24 hours using the KYC reminder template",
    channel: ch.whatsapp,
    impact: "High",
  },
  {
    id: "record-tutorial",
    day: "Wed",
    text: "Record a 4-minute “Open and verify a CXM account on mobile” YouTube tutorial",
    channel: ch.youtube,
    impact: "Medium",
  },
  {
    id: "run-webinar",
    day: "Thu",
    text: "Run the weekly gold-outlook webinar; end with a live account-opening walkthrough",
    channel: ch.webinar,
    impact: "High",
  },
  {
    id: "repost-clip",
    day: "Fri",
    text: "Repost the best webinar clip on TikTok with your referral link in the bio",
    channel: ch.tiktok,
    impact: "Medium",
  },
  {
    id: "review-kyc",
    day: "Sun",
    text: "Review KYC completion on the dashboard and update next week’s plan",
    channel: ch.dashboard,
    impact: "Low",
  },
];

/** Actions already ticked when the demo starts. */
export const initiallyDone = ["pin-kyc-guide", "ask-unverified-list"];

/** Last 30 days against the IB's own average for the previous 3 months. */
export const funnelVsAverage = {
  nodes: [
    { label: "Link clicks", value: "1,577" },
    { label: "Registrations", value: "153" },
    { label: "KYC verified", value: "81", below: true },
    { label: "First deposit", value: "48" },
    { label: "Active 90 days", value: "19" },
  ],
  edges: [
    { rate: "9.7%", average: "9.1%", below: false },
    { rate: "52.9%", average: "61%", below: true },
    { rate: "59.3%", average: "57%", below: false },
    { rate: "39.6%", average: "38%", below: false },
  ],
};

export type FocusArea = {
  title: string;
  detail: string;
  estimate: string;
  sources: Array<"broker" | "dashboard" | "web">;
};

export const focusAreas: FocusArea[] = [
  {
    title: "Raise KYC completion",
    detail: "From 52.9% to 60% of registrations",
    estimate: "About +6 funded accounts a month",
    sources: ["broker", "web"],
  },
  {
    title: "Convert webinar attendees to first deposit",
    detail: "Attendees deposit 2.4× more often than other leads. Add a live account-opening segment.",
    estimate: "About +3 funded accounts a month",
    sources: ["dashboard", "broker"],
  },
  {
    title: "Turn TikTok reach into sign-ups",
    detail: "Your most engaged channel brings only 6% of registrations. Add a link in bio and a pinned comment.",
    estimate: "About +2 funded accounts a month",
    sources: ["dashboard", "broker"],
  },
];

export const tier = {
  current: "Gold",
  next: "Platinum",
  review: "Review on Dec 31",
  requirements: [
    { label: "Lots traded since Jul 1", value: 312, target: 500 },
    { label: "Active traders", value: 86, target: 100 },
  ],
  unlocks: ["+$1.50 rebate per lot", "Daily rebate payouts", "Dedicated account manager"],
  consequence: "If you’re below target on Dec 31, you stay on Gold rates for the next 6 months.",
  pace: "At your current pace (about 23 lots a week) you reach 500 lots in about 8 weeks, before the review. Raising KYC completion could get you there 1–2 weeks sooner.",
};

export const weekCourses = [
  { title: "Getting clients through KYC", meta: "For you · 3 lessons · 18 min" },
  { title: "Webinars that lead to first deposits", meta: "Lesson in Ways to win and keep clients" },
];
