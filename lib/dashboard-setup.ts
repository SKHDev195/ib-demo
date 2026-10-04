"use client";

import { useSyncExternalStore } from "react";

/**
 * Whether the IB has configured their dashboard: by taking the suggested preset
 * ("Open dashboard" on Screen 01b) or by saving a custom one ("Save dashboard"
 * on Screen 03). Until then, /dashboard shows Screen 01 (preset selection).
 *
 * Stored in localStorage, so it survives reloads and new browser sessions.
 * Clear the site's data (or use a private window) to start the demo over.
 */
const STORAGE_KEY = "academy-demo:dashboard-configured";
const CHANGE_EVENT = "academy-demo:dashboard-configured-change";

function read() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    // Storage can be blocked (private modes, strict settings): treat as not configured.
    return false;
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
export function useDashboardConfigured(): boolean | null {
  return useSyncExternalStore(subscribe, read, () => null);
}

export function markDashboardConfigured() {
  try {
    window.localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Ignore: the demo still works for this page view.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}
