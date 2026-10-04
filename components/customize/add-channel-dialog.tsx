"use client";

import { useEffect, useId, useRef } from "react";
import { BrandTile } from "@/components/brand-logos";
import { Icon } from "@/components/icons";
import { classesFor } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { catalog, catalogRegions, type CatalogChannel } from "@/lib/customize";

function ChannelCard({ channel }: { channel: CatalogChannel }) {
  const api = channel.kind === "api";
  return (
    <li className="flex flex-col gap-2.5 rounded-xl border border-line bg-surface p-3.5">
      <div className="flex items-center gap-2.5">
        {channel.brand ? (
          <BrandTile name={channel.brand} size={34} logoSize={channel.brand === "lemon8" ? 29 : 19} />
        ) : (
          <span
            aria-hidden="true"
            className="inline-flex size-[34px] shrink-0 items-center justify-center rounded-[9px] text-white"
            style={{ background: channel.color }}
          >
            <Icon name="users" size={19} />
          </span>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold">{channel.name}</h3>
          <p className="text-xs text-muted">{channel.regions}</p>
        </div>
        <span className={classesFor({ size: "sm", children: null })}>
          <Icon name="plus" size={14} />
          Add
        </span>
      </div>
      <span
        className={cn(
          "inline-flex w-fit items-center gap-1.5 rounded-full py-[3px] pl-2 pr-2.5 text-xs font-medium",
          api ? "bg-brand-green-tint text-brand-green-strong" : "bg-canvas text-muted",
        )}
      >
        <Icon name={api ? "plug" : "link"} size={12} />
        {channel.availability}
      </span>
      <ul className="flex flex-wrap gap-1.5" aria-label={`${channel.name} metrics`}>
        {channel.metrics.map((m) => (
          <li key={m} className="rounded-md border border-line px-2 py-[3px] text-xs text-muted">
            {m}
          </li>
        ))}
      </ul>
    </li>
  );
}

type AddChannelDialogProps = {
  open: boolean;
  onClose: () => void;
};

/**
 * "Add a channel" window from Screen 03b. Opens as a native modal dialog, so
 * focus is trapped inside and the page behind is inert. Closes with the ×
 * button, Escape, or a click on the dimmed backdrop. The controls inside are
 * display-only in the demo.
 */
export function AddChannelDialog({ open, onClose }: AddChannelDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      aria-describedby={descId}
      onClose={onClose}
      // A click on the <dialog> element itself (not its content) is a click on the backdrop.
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className={cn(
        "m-auto max-h-[calc(100vh-48px)] w-[820px] max-w-[calc(100vw-48px)] overflow-hidden rounded-2xl bg-surface p-0 text-ink",
        "shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop:bg-brand-navy/55",
      )}
    >
      <div className="flex max-h-[calc(100vh-48px)] flex-col gap-[18px] overflow-y-auto px-7 py-6">
        <div className="flex items-start gap-4">
          <div className="min-w-0 flex-1 space-y-1">
            <h2 id={titleId} className="text-xl font-semibold">
              Add a channel
            </h2>
            <p id={descId} className="text-sm text-muted">
              Each channel offers different metrics. Channels that can’t be connected can still be tracked with a
              referral link.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1 text-muted transition hover:bg-canvas hover:text-ink focus-visible:outline-2 focus-visible:outline-brand-green-strong"
          >
            <Icon name="x" size={20} />
          </button>
        </div>

        {/* Display-only filters. */}
        <div className="flex items-center gap-3" aria-hidden="true">
          <span className="flex w-[272px] shrink-0 items-center gap-2 rounded-[10px] border border-line px-3.5 py-[9px] text-sm text-muted">
            <Icon name="search" size={15} />
            Search channels
          </span>
          <span className="flex flex-wrap gap-1.5">
            {catalogRegions.map((r) => (
              <span
                key={r}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium",
                  r === "Southeast Asia" ? "bg-brand-navy text-white" : "bg-canvas text-muted",
                )}
              >
                {r}
              </span>
            ))}
          </span>
        </div>

        <ul className="grid grid-cols-2 items-start gap-3" aria-label="Channels in Southeast Asia">
          {catalog.map((c) => (
            <ChannelCard key={c.name} channel={c} />
          ))}
          <li className="flex min-h-[167px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line bg-canvas p-3.5 text-center">
            <Icon name="plus" size={18} className="text-muted" />
            <span className="text-sm font-semibold">Request a channel</span>
            <span className="text-xs text-muted">We’ll check which metrics it can provide and add them.</span>
          </li>
        </ul>

        <div className="flex items-center gap-3 rounded-[10px] bg-canvas px-4 py-3">
          <p className="flex-1 text-xs text-muted">
            Using a channel that isn’t listed? Create a tracked referral link for it to see clicks, registrations and
            funded accounts.
          </p>
          <span className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-brand-green-strong">
            <Icon name="link" size={14} />
            Create tracked link
          </span>
        </div>
      </div>
    </dialog>
  );
}
