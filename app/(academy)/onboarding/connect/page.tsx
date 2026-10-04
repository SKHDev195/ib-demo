import { Icon } from "@/components/icons";
import { ChannelList } from "@/components/onboarding/channel-list";
import { ConfigureDashboardLink } from "@/components/dashboard/configure-link";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { ProgressBar } from "@/components/ui/progress-bar";

export const metadata = { title: "Connect your channels" };

const access = [
  "Read-only statistics: followers, views, reactions, shares",
  "We never post, message or change anything on your behalf",
  "Disconnect any channel at any time in Customize",
];

/** Screen 01b — connect the channels picked in onboarding. */
export default function ConnectChannelsPage() {
  return (
    <>
      <PageHeader
        breadcrumb={
          // Display-only in the demo.
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-green-strong">
            <Icon name="arrowLeft" size={14} />
            Back to your answers
          </span>
        }
        title="Connect your channels"
        description="Step 2 of 2. Connect a channel to see its numbers on your dashboard. You can skip any and connect it later."
      />

      <div className="flex items-start gap-5">
        <div className="min-w-0 flex-1">
          <ChannelList />
        </div>

        <div className="w-[380px] shrink-0 space-y-5">
          <Card tone="dark" className="space-y-3.5">
            <h2 className="text-xl font-semibold">4 of 5 channels connected</h2>
            <ProgressBar value={4 / 5} track="light" label="Channels connected" />
            <p className="text-sm leading-relaxed text-white/[0.72]">
              13 of 15 metrics are ready. The 2 YouTube metrics stay empty until you connect YouTube.
            </p>
            {/* Takes the suggested preset: /dashboard shows Screen 02 from now on. */}
            <ConfigureDashboardLink iconRight="arrowRight" fullWidth>
              Open dashboard
            </ConfigureDashboardLink>
          </Card>

          <Card className="space-y-2.5">
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <Icon name="shield" size={16} className="text-brand-green-strong" />
              What we access
            </h2>
            <ul className="space-y-2.5">
              {access.map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-muted">
                  <Icon name="check" size={14} className="mt-px shrink-0 text-brand-green-strong" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}
