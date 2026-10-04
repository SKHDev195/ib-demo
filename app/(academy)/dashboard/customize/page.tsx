import { ChannelPicker } from "@/components/customize/channel-picker";
import { LayoutList } from "@/components/customize/layout-list";
import { ModeSwitch } from "@/components/customize/mode-switch";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { ConfigureDashboardLink } from "@/components/dashboard/configure-link";

export const metadata = { title: "Customize your dashboard" };

/** Screen 03 — pick channels and metrics manually. */
export default function CustomizeDashboardPage() {
  return (
    <>
      <PageHeader
        breadcrumb="Dashboard  /  Customize"
        title="Customize your dashboard"
        description="Choose the channels you use and the metrics you want to see. You can switch back to the suggested preset at any time."
        actions={
          // Cancel returns to /dashboard: preset selection if nothing has been saved
          // yet, otherwise the dashboard. Save configures the dashboard and opens it.
          <div className="flex gap-2.5">
            <Button href="/dashboard">Cancel</Button>
            <ConfigureDashboardLink>Save dashboard</ConfigureDashboardLink>
          </div>
        }
      />
      <ModeSwitch current="/dashboard/customize" />
      <div className="flex gap-4">
        <ChannelPicker />
        <LayoutList />
      </div>
    </>
  );
}
