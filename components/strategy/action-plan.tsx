"use client";

import { Icon } from "@/components/icons";
import { usePlan } from "@/components/shell/plan-context";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { cn } from "@/lib/cn";
import { planActions, planWeek } from "@/lib/strategy";

/** This week's actions. Ticking an action updates the sidebar's "This week’s plan" bar. */
export function ActionPlan() {
  const { isDone, toggle, done, total } = usePlan();

  return (
    <Card as="section" padding="none" className="px-5 pb-2 pt-5" aria-labelledby="action-plan-title">
      <div className="flex items-start justify-between gap-4 pb-3">
        <div>
          <h2 id="action-plan-title" className="text-base font-semibold">
            Action plan for {planWeek}
          </h2>
          <p className="mt-0.5 text-xs text-muted" aria-live="polite">
            {done} of {total} done. Updating the plan keeps completed actions.
          </p>
        </div>
        {/* Display-only in the demo. */}
        <span className="text-sm font-medium text-brand-green-strong">Add to calendar</span>
      </div>

      <ul>
        {planActions.map((a) => {
          const checked = isDone(a.id);
          return (
            <li key={a.id} className="border-t border-line">
              <label className="group flex cursor-pointer items-center gap-3.5 py-3">
                <input type="checkbox" checked={checked} onChange={() => toggle(a.id)} className="peer sr-only" />
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex size-[18px] shrink-0 items-center justify-center rounded-[5px] transition",
                    "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-green-strong",
                    checked
                      ? "bg-brand-green-deep text-white"
                      : "border-[1.5px] border-line bg-surface group-hover:border-brand-green",
                  )}
                >
                  {checked && <Icon name="check" size={12} strokeWidth={2.5} />}
                </span>
                <span className="w-8 shrink-0 text-xs font-semibold text-muted">{a.day}</span>
                <span className={cn("min-w-0 flex-1 text-sm", checked ? "text-muted line-through" : "text-ink")}>
                  {a.text}
                </span>
                <span className="flex shrink-0 items-center gap-1.5">
                  <span className="inline-flex items-center gap-[5px] rounded-full bg-canvas px-2 py-0.5 text-xs font-medium">
                    <span className="size-1.5 rounded-full" style={{ background: a.channel.color }} aria-hidden="true" />
                    {a.channel.label}
                  </span>
                  <Pill tone={a.impact === "High" ? "green" : "neutral"}>{a.impact} impact</Pill>
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
