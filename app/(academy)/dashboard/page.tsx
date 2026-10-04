import { ConfiguredDashboard } from "@/components/dashboard/configured-dashboard";
import { DashboardGate } from "@/components/dashboard/dashboard-gate";
import { SetupScreen } from "@/components/onboarding/setup-screen";

export const metadata = { title: "Dashboard" };

/**
 * The dashboard address. Before the dashboard has been configured it shows
 * preset selection (Screen 01); afterwards, the dashboard itself (Screen 02).
 */
export default function DashboardPage() {
  return <DashboardGate setup={<SetupScreen />} dashboard={<ConfiguredDashboard />} />;
}
