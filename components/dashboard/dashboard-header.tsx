"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { PageHeader } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { defaultPeriod, presetName } from "@/lib/dashboard";
import { formatRange, previousPeriod } from "@/lib/dates";

/**
 * Dashboard title row. The date picker updates the label and the comparison
 * period; the demo figures below stay fixed.
 */
export function DashboardHeader() {
  const [period, setPeriod] = useState(defaultPeriod);
  const previous = previousPeriod(period);
  const sameYear = previous.start.getFullYear() === previous.end.getFullYear();

  return (
    <PageHeader
      title="Dashboard"
      badge={<Pill>Preset: {presetName}</Pill>}
      description={`Compared with ${formatRange(previous, !sameYear)}.`}
      actions={
        <>
          <DateRangePicker value={period} onChange={setPeriod} />
          <Button href="/dashboard/customize" iconLeft="sliders">
            Customize
          </Button>
        </>
      }
    />
  );
}
