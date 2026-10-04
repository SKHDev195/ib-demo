import { ActionPlan } from "@/components/strategy/action-plan";
import {
  FocusAreas,
  FocusSummary,
  FunnelVsAverage,
  LearnThisWeek,
  SourcesLine,
  TierProgress,
  TimeframeTabs,
} from "@/components/strategy/sections";
import { classesFor } from "@/components/ui/button";
import { Icon } from "@/components/icons";
import { PageHeader } from "@/components/ui/page-header";

export const metadata = { title: "Strategy" };

/** Screen 04 — the AI-generated weekly plan. Only the action checkboxes are interactive. */
export default function StrategyPage() {
  return (
    <>
      <PageHeader
        title="Strategy"
        description={<SourcesLine />}
        actions={
          // Display-only in the demo.
          <div aria-hidden="true" className="flex gap-2.5">
            <span className={classesFor({ children: null })}>
              <Icon name="download" size={16} />
              Export PDF
            </span>
            <span className={classesFor({ variant: "primary", children: null })}>
              <Icon name="reset" size={16} />
              Update plan
            </span>
          </div>
        }
      />
      <TimeframeTabs />
      <div className="flex items-start gap-5">
        <div className="min-w-0 flex-1 space-y-5">
          <FocusSummary />
          <FunnelVsAverage />
          <ActionPlan />
        </div>
        <div className="w-[340px] shrink-0 space-y-5">
          <FocusAreas />
          <TierProgress />
          <LearnThisWeek />
        </div>
      </div>
    </>
  );
}
