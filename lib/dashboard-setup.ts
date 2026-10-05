"use client";

import { useSyncExternalStore } from "react";

/**
 * How the IB configured their dashboard:
 * - "preset": took the suggested preset ("Open dashboard" on Screen 01b);
 * - "custom": saved their own selection ("Save dashboard" on Screen 03);
 * - "none": not configured yet, so /dashboard shows Screen 01 (preset selection).
 *
 * Stored in localStorage, so it survives reloads and new browser sessions.
 * Clear the site's data (or use a private window) to start the demo over.
 */
export type DashboardSetup = "preset" | "custom" | "none";

const STORAGE_KEY = "academy-demo:dashboard-configured";
const CHANGE_EVENT = "academy-demo:dashboard-configured-change";

function read(): DashboardSetup {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (value === "custom") return "custom";
    // "1" is the value earlier versions of the demo stored for a preset.
    if (value === "preset" || value === "1") return "preset";
    return "none";
  } catch {
    // Storage can be blocked (private modes, strict settings): treat as not configured.
    return "none";
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange); // other tabs
  window.addEventListener(CHANGE_EVENT, onChange); // this tab
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

/** `null` while rendering on the server, before the browser's storage can be read. */
export function useDashboardSetup(): DashboardSetup | null {
  return useSyncExternalStore(subscribe, read, () => null);
}

export function markDashboardConfigured(how: Exclude<DashboardSetup, "none">) {
  try {
    window.localStorage.setItem(STORAGE_KEY, how);
  } catch {
    // Ignore: the demo still works for this page view.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}
