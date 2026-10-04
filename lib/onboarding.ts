/** Answer options for the onboarding profile form (Screen 01). */

export const ibTypes = [
  "Educator or coach",
  "Signal provider",
  "Social trader",
  "Money manager (PAMM/MAM)",
  "Affiliate or review website owner",
] as const;

export const countries = ["Indonesia", "Malaysia", "Thailand", "Vietnam", "Nigeria", "Brazil"] as const;
export type Country = (typeof countries)[number];

/** Channels popular in Indonesia and Malaysia, in the order shown in Figma. */
export const baseChannels = [
  "WhatsApp",
  "Telegram",
  "Instagram",
  "TikTok",
  "YouTube",
  "Facebook",
  "Webinars",
  "Offline seminars",
  "X",
  "Discord",
] as const;

/** Extra channels that only appear (first in the list) when their country is picked. */
export const countryChannels: Partial<Record<Country, string[]>> = {
  Thailand: ["LINE"],
  Vietnam: ["Zalo"],
};

export const audienceSizes = [
  { value: "under-1k", label: "Under 1k" },
  { value: "1k-9.9k", label: "1k–9.9k" },
  { value: "10k-49k", label: "10k–49k" },
  { value: "50k-plus", label: "50k+" },
] as const;

export const goals = [
  { value: "fund-registrations", label: "Get more registrations funded" },
  { value: "more-registrations", label: "Get more people to register" },
  { value: "retention", label: "Keep clients trading for longer" },
  { value: "volume", label: "Increase my clients’ trading volume" },
  { value: "network", label: "Grow my sub-IB network" },
  { value: "tier", label: "Reach the next partner tier" },
] as const;

export const defaultAnswers = {
  ibTypes: ["Educator or coach", "Signal provider"],
  countries: ["Indonesia", "Malaysia"] as Country[],
  channels: ["Telegram", "Instagram", "TikTok", "YouTube", "Webinars"],
  audience: "1k-9.9k",
  goal: "fund-registrations",
  description:
    "I run an Indonesian-language Telegram channel with daily gold signals and post a weekly market review on YouTube. Most of my leads register but drop out at KYC.",
};
