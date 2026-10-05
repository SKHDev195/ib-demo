"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";
import { classesFor } from "@/components/ui/button";
import { markDashboardConfigured } from "@/lib/dashboard-setup";

/**
 * Primary button that marks the dashboard as configured, then opens it.
 * Used for "Open dashboard" (Screen 01b, how="preset") and "Save dashboard"
 * (Screen 03, how="custom").
 */
export function ConfigureDashboardLink({
  how,
  children,
  iconRight,
  fullWidth,
}: {
  how: "preset" | "custom";
  children: ReactNode;
  iconRight?: IconName;
  fullWidth?: boolean;
}) {
  return (
    <Link
      href="/dashboard"
      onClick={() => markDashboardConfigured(how)}
      className={classesFor({ variant: "primary", fullWidth, children })}
    >
      {children}
      {iconRight && <Icon name={iconRight} size={16} />}
    </Link>
  );
}
