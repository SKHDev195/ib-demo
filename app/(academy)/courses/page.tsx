import { Icon } from "@/components/icons";
import {
  ContinueLearning,
  CoreGrid,
  CoreSummary,
  CountryGrid,
  CoursesSection,
  RecommendedGrid,
} from "@/components/courses/sections";
import { PageHeader } from "@/components/ui/page-header";

export const metadata = { title: "Courses" };

/**
 * Screen 05 — the course catalog. Course cards have hover states; the Resume
 * button and the "Building multi-level IB networks" card open Screen 06.
 */
export default function CoursesPage() {
  return (
    <>
      <PageHeader
        title="Courses"
        description="Short written courses on running an IB business. Lessons adapt to your channels and countries."
        actions={
          // Display-only in the demo.
          <span
            aria-hidden="true"
            className="flex w-[260px] items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-[9px] text-sm text-muted"
          >
            <Icon name="search" size={15} />
            Search lessons
          </span>
        }
      />
      <ContinueLearning />
      <CoursesSection
        title="Recommended for you"
        description="Picked from your profile and this week’s strategy. Dismiss anything that isn’t relevant."
      >
        <RecommendedGrid />
      </CoursesSection>
      <CoursesSection title="Core courses" aside={<CoreSummary />}>
        <CoreGrid />
      </CoursesSection>
      <CoursesSection
        title="Country guides"
        description="Local rules, payment methods and popular channels. Your countries are shown first."
      >
        <CountryGrid />
      </CoursesSection>
    </>
  );
}
