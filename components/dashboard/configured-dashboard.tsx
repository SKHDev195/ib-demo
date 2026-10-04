import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import {
  ChurnCard,
  EngagementCard,
  FollowerGrowthCard,
  FunnelCard,
  KpiRow,
  TelegramHealthCard,
  VideoCard,
} from "@/components/dashboard/widgets";

/** Screen 02 — the IB's dashboard (AI-chosen "Telegram & YouTube educator" preset). */
export function ConfiguredDashboard() {
  return (
    <>
      <DashboardHeader />
      <KpiRow />
      <FunnelCard />
      <div className="flex items-stretch gap-4">
        <FollowerGrowthCard />
        <EngagementCard />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <ChurnCard />
        <VideoCard />
        <TelegramHealthCard />
      </div>
    </>
  );
}
