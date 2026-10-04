"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { initiallyDone, planActions } from "@/lib/strategy";

type PlanState = {
  isDone: (id: string) => boolean;
  toggle: (id: string) => void;
  done: number;
  total: number;
};

const PlanContext = createContext<PlanState | null>(null);

/**
 * This week's action plan, shared by the Strategy screen (where actions are
 * ticked) and the sidebar card (which shows progress). It lives in the app
 * shell, so ticks survive moving between screens; it resets on a full reload.
 */
export function PlanProvider({ children }: { children: ReactNode }) {
  const [doneIds, setDoneIds] = useState<ReadonlySet<string>>(() => new Set(initiallyDone));

  const toggle = useCallback((id: string) => {
    setDoneIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const value = useMemo<PlanState>(
    () => ({
      isDone: (id) => doneIds.has(id),
      toggle,
      done: planActions.filter((a) => doneIds.has(a.id)).length,
      total: planActions.length,
    }),
    [doneIds, toggle],
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside <PlanProvider>");
  return ctx;
}
