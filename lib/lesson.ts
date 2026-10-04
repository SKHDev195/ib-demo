/** Data for Screen 06 (lesson view), from Figma. */

export const lessonMeta = {
  course: "Building multi-level IB networks",
  title: "How sub-IB commission tiers work",
  position: "Lesson 3 of 6",
  readTime: "9 min read",
  courseProgress: 0.33,
};

export type LessonState = "done" | "current" | "todo";

export const courseLessons: Array<{ title: string; duration: string; state: LessonState }> = [
  { title: "Why build a network?", duration: "6 min", state: "done" },
  { title: "Finding the right sub-IBs", duration: "8 min", state: "done" },
  { title: "How sub-IB commission tiers work", duration: "9 min", state: "current" },
  { title: "Onboarding sub-IBs", duration: "7 min", state: "todo" },
  { title: "Keeping a network active", duration: "10 min", state: "todo" },
  { title: "Compliance in multi-level networks", duration: "8 min", state: "todo" },
];

export const subIbs = [
  { role: "Top performer", gets: "Gets $8" },
  { role: "Standard deal", gets: "Gets $6" },
  { role: "Regional agent", gets: "Gets $7" },
];

export const rateRules = [
  "Keep your override between 20% and 40% of the rebate. Lower leaves you no budget for marketing; higher makes sub-IBs look for another master IB.",
  "Pay more to sub-IBs who bring active traders, not just registrations. Tie higher rates to funded accounts and 90-day retention.",
  "Write the split down. Record it in your CXM partner portal so payouts are automatic and disputes are rare.",
];

export const yourNumbers = {
  stats: [
    { value: "4", label: "sub-IBs in your network" },
    { value: "$5.50", label: "average sub-IB rate" },
    { value: "45%", label: "your current override" },
  ],
  note: "Your override is above the 20–40% range, and 2 of your 4 sub-IBs had no new funded accounts in 60 days. Raising their rate to $6.50 for funded clients could re-activate them.",
};

/** AI-generated, personalized callouts inside the lesson. */
export const lessonCallouts = {
  tip: {
    text: "You’re 188 lots away from Platinum, which pays $1.50 more per lot. If you pass $1.40 of that on to your sub-IBs, your override drops to 40%, inside the range this lesson recommends, and you still keep slightly more per lot than today ($4.60 instead of $4.50).",
    basis: "Based on your partner tier progress and sub-IB rates (CXM broker data)",
  },
  watchOut: {
    text: "Rule 2 ties higher rates to funded accounts, but right now only 52.9% of your registrations complete KYC, down from 61%. Before you switch, share your KYC guide with your sub-IBs, or their earnings will drop while KYC is the bottleneck.",
    basis: "Based on your onboarding funnel and this week’s plan in Strategy",
  },
};

export const quickCheck = {
  question: "The broker pays $10 per lot and you pass $7 to a sub-IB. What is your override?",
  options: [
    { label: "$7 per lot (70%)", selected: false },
    { label: "$3 per lot (30%)", selected: true },
    { label: "$10 per lot (100%)", selected: false },
  ],
  feedback: "Correct. You keep the $3 difference on every lot that sub-IB’s clients trade.",
};

export const applyThisWeek = [
  { text: "Review the rate each sub-IB gets", done: true },
  { text: "Move your override into the 20–40% range", done: false },
  { text: "Set a higher rate for funded accounts", done: false },
  { text: "Confirm splits in the CXM partner portal", done: false },
];

export const nextLesson = "Onboarding sub-IBs";
