"use client";

import type { ReactNode } from "react";
import { useDashboardSetup } from "@/lib/dashboard-setup";

/**
 * /dashboard shows preset selection (Screen 01) until the dashboard has been
 * configured once, and the dashboard (Screen 02) from then on.
 */
export function DashboardGate({ setup, dashboard }: { setup: ReactNode; dashboard: ReactNode }) {
  const setupState = useDashboardSetup();
  // Nothing to show until the browser's storage has been read, to avoid flashing the wrong screen.
  if (setupState === null) return null;
  return setupState === "none" ? setup : dashboard;
}
