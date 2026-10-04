/** Data for Screen 05 (Courses), from Figma. */
import type { IconName } from "@/components/icons";

/** Screen 06 — the lesson view of the course in progress. */
export const lessonViewHref = "/courses/multi-level-ib-networks";

export const continueLearning = {
  title: "Building multi-level IB networks",
  lesson: "Lesson 3 of 6: How sub-IB commission tiers work",
  progress: 0.33,
  href: lessonViewHref,
};

export type CourseStatus = { kind: "not-started" } | { kind: "completed" } | { kind: "progress"; value: number };

export type Course = {
  id: string;
  title: string;
  description: string;
  meta: string;
  /** Cover and icon-tile color. */
  color: string;
  /** Cover tint opacity (the dark "AI tooling" cover is lighter). */
  tint?: number;
  /** Icon in the tile, or a country code instead of an icon. */
  icon?: IconName;
  code?: string;
  status: CourseStatus;
  /** Why it was recommended (Recommended for you only). */
  reason?: string;
  badge?: string;
  href?: string;
};

export const recommended: Course[] = [
  {
    id: "kyc",
    title: "Getting clients through KYC",
    description: "Why registrations stop at KYC and how to get more clients through it.",
    meta: "3 lessons · 18 min",
    color: "#ee443f",
    icon: "shield",
    reason: "From your strategy",
    status: { kind: "not-started" },
  },
  {
    id: "webinars",
    title: "Webinars that lead to first deposits",
    description: "How to structure a webinar so attendees open and fund an account before it ends.",
    meta: "1 lesson · 9 min",
    color: "#ec4899",
    icon: "megaphone",
    reason: "From your strategy",
    status: { kind: "not-started" },
  },
  {
    id: "indonesia",
    title: "Working with clients in Indonesia",
    description: "Local payment methods, rules on promoting trading and what works in Indonesian-language content.",
    meta: "5 lessons · 35 min",
    color: "#14b8a6",
    code: "ID",
    reason: "Matches your clients",
    status: { kind: "not-started" },
  },
];

export const coreCourses: Course[] = [
  {
    id: "fundamentals",
    title: "IB fundamentals",
    description: "How the IB model works, who your clients are and what the broker expects from you.",
    meta: "6 lessons · 45 min",
    color: "#099f49",
    icon: "book",
    status: { kind: "completed" },
  },
  {
    id: "paid",
    title: "How IBs get paid",
    description: "Lot-based rebates, spread share, CPA and hybrid deals, and how to compare them.",
    meta: "5 lessons · 40 min",
    color: "#f59e0b",
    icon: "coins",
    status: { kind: "progress", value: 0.6 },
  },
  {
    id: "networks",
    title: "Building multi-level IB networks",
    description: "Recruit sub-IBs, set their rates and keep your network active and compliant.",
    meta: "6 lessons · 50 min",
    color: "#3b82f6",
    icon: "users",
    status: { kind: "progress", value: 0.33 },
    href: lessonViewHref,
  },
  {
    id: "clients",
    title: "Ways to win and keep clients",
    description: "Webinars, seminars, signals, social content, copy trading and 1:1 follow-up.",
    meta: "8 lessons · 65 min",
    color: "#ec4899",
    icon: "megaphone",
    status: { kind: "not-started" },
  },
  {
    id: "channels",
    title: "What works on each channel",
    description: "What works on Telegram, YouTube, TikTok, Instagram, X and Discord.",
    meta: "7 lessons · 55 min",
    color: "#8b5cf6",
    icon: "phone",
    status: { kind: "progress", value: 0.29 },
  },
  {
    id: "ai",
    title: "AI tooling for IBs",
    description: "Use AI to draft posts, translate content, answer leads and analyze your data.",
    meta: "5 lessons · 35 min",
    color: "#131927",
    tint: 0.08,
    icon: "spark",
    badge: "New",
    status: { kind: "not-started" },
  },
];

export const coreSummary = "1 of 6 completed, 3 in progress";

export type CountryGuide = { code: string; name: string; meta: string; yours?: boolean };

export const countryGuides: CountryGuide[] = [
  { code: "ID", name: "Indonesia", meta: "5 lessons · 35 min", yours: true },
  { code: "MY", name: "Malaysia", meta: "4 lessons · 30 min", yours: true },
  { code: "BR", name: "Brazil", meta: "5 lessons · 40 min" },
  { code: "IN", name: "India", meta: "6 lessons · 45 min" },
  { code: "NG", name: "Nigeria", meta: "4 lessons · 30 min" },
  { code: "TH", name: "Thailand", meta: "4 lessons · 30 min" },
  { code: "VN", name: "Vietnam", meta: "4 lessons · 28 min" },
];
