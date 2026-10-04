import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { Card, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Chip } from "@/components/ui/chip";
import { IconBadge } from "@/components/ui/icon-badge";
import { PageHeader, SectionHeader } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { ProgressBar } from "@/components/ui/progress-bar";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { SourceTag } from "@/components/ui/source-tag";

export const metadata = { title: "Shared components" };

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[180px_1fr] items-center gap-4 border-t border-line py-4 first:border-t-0 first:pt-0">
      <div className="text-xs font-medium text-muted">{label}</div>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

const swatches = [
  ["brand-green", "#7CBE56"],
  ["brand-green-deep", "#099F49"],
  ["brand-green-tint", "#F4FEF3"],
  ["brand-navy", "#131927"],
  ["canvas", "#F5F7F9"],
  ["line", "#E5E7EA"],
  ["muted", "#6D717F"],
  ["negative", "#EE443F"],
  ["chart-2", "#3B82F6"],
  ["chart-3", "#F59E0B"],
  ["chart-4", "#8B5CF6"],
  ["chart-5", "#EC4899"],
] as const;

export default function UiGalleryPage() {
  return (
    <>
      <PageHeader
        breadcrumb="Developer"
        title="Shared components"
        badge={<Pill>Not part of the product</Pill>}
        description="Every building block used across the Academy screens, in one place for review."
        actions={
          <>
            <Button iconLeft="download">Secondary</Button>
            <Button variant="primary" iconLeft="spark">
              Primary
            </Button>
          </>
        }
      />

      <Card>
        <CardHeader title="Colour tokens" subtitle="Defined in app/globals.css, mirroring the Figma variables." />
        <div className="mt-4 grid grid-cols-6 gap-3">
          {swatches.map(([name, hex]) => (
            <div key={name} className="space-y-1.5">
              <div className="h-12 rounded-lg border border-line" style={{ background: hex }} />
              <div className="text-xs font-medium">{name}</div>
              <div className="text-[11px] text-muted">{hex}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader title="Controls" />
        <div className="mt-4">
          <Row label="Buttons">
            <Button variant="primary">Generate my dashboard</Button>
            <Button variant="primary" iconRight="arrowRight">
              Go to my dashboard
            </Button>
            <Button iconLeft="sliders">Customize</Button>
            <Button size="sm" iconLeft="plus">
              Add
            </Button>
            <Button variant="dashed" iconLeft="plus">
              Add tool
            </Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </Row>
          <Row label="Segmented control">
            <SegmentedControl
              label="Timeframe"
              options={[
                { value: "today", label: "Today" },
                { value: "week", label: "This week" },
                { value: "month", label: "This month" },
                { value: "6m", label: "Next 6 months" },
              ]}
              defaultValue="week"
            />
            <SegmentedControl
              label="Audience size"
              variant="surface"
              options={[
                { value: "lt1k", label: "Under 1k" },
                { value: "1k", label: "1k–10k" },
                { value: "10k", label: "10k–50k" },
                { value: "50k", label: "50k+" },
              ]}
              defaultValue="1k"
            />
          </Row>
          <Row label="Chips">
            <Chip label="Educator / coach" defaultChecked />
            <Chip label="Signal provider" />
            <Chip label="Telegram" meta="ID · MY" defaultChecked />
            <Chip label="Add country" icon="plus" />
          </Row>
          <Row label="Checkboxes">
            <Checkbox label="Channel member growth" description="Members who joined minus those who left" defaultChecked />
            <Checkbox label="Reactions per post" description="Average emoji reactions per post" />
          </Row>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader title="Labels & tags" />
          <div className="mt-4">
            <Row label="Pills">
              <Pill>+12%</Pill>
              <Pill tone="negative">−0.3 pp</Pill>
              <Pill tone="neutral">Broker</Pill>
              <Pill tone="navy">New</Pill>
              <Pill size="sm">Your clients</Pill>
            </Row>
            <Row label="Source tags">
              <SourceTag source="broker" />
              <SourceTag source="dashboard" />
              <SourceTag source="web" />
            </Row>
            <Row label="Icon badges">
              <IconBadge color="#3B82F6" text="T" />
              <IconBadge color="#099F49" icon="book" size={34} />
              <IconBadge color="#14B8A6" text="ID" size={40} />
              <IconBadge color="#EE443F" icon="shieldCheck" size={48} />
              <IconBadge color="#099F49" icon="book" size={32} tinted />
            </Row>
            <Row label="Avatars">
              <Avatar initials="AK" />
              <Avatar initials="AK" tone="navy" size={36} />
            </Row>
          </div>
        </Card>

        <Card>
          <CardHeader title="Feedback" />
          <div className="mt-4 space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-medium">Lots traded since Jul 1</span>
                <span className="font-semibold">312 / 500</span>
              </div>
              <ProgressBar value={312 / 500} label="Lots traded" />
            </div>
            <Callout>At your current pace you reach 500 lots in about 8 weeks — before the review.</Callout>
            <Callout tone="warning">
              <strong className="font-semibold">Below your 3-month average:</strong> Registration → KYC (52.9% vs 61%).
            </Callout>
            <Callout tone="info">If you’re below target on Dec 31, you stay on Gold rates for the next six months.</Callout>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader
            title="Card header"
            subtitle="Title, subtitle and an optional action."
            action={<Pill tone="neutral">Social</Pill>}
          />
        </Card>
        <Card tone="tint">
          <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.08em] text-brand-green-deep">
            <Icon name="spark" size={16} /> TINT CARD
          </div>
          <p className="mt-2 text-sm">Used for the AI summary on Strategy.</p>
        </Card>
        <Card tone="dark">
          <div className="text-[11px] font-semibold tracking-[0.08em] text-brand-green">DARK CARD</div>
          <p className="mt-2 text-sm text-white/70">Used for AI presets and setup summaries.</p>
        </Card>
      </div>

      <SectionHeader title="Section header" description="Used above groups of cards, e.g. “Core courses”." />
    </>
  );
}
