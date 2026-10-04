"use client";

import { Fragment, useId, useRef, useState, type KeyboardEvent } from "react";
import { BrandTile } from "@/components/brand-logos";
import { Icon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { AddChannelDialog } from "./add-channel-dialog";
import { cn } from "@/lib/cn";
import { channelGroups, channels, type Metric } from "@/lib/customize";

/** Static checkbox look — metric selection is display-only in the demo. */
function CheckMark({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-[18px] shrink-0 items-center justify-center rounded-[5px]",
        on ? "bg-brand-green-deep text-white" : "border-[1.5px] border-line bg-surface",
      )}
    >
      {on && <Icon name="check" size={12} strokeWidth={2.5} />}
    </span>
  );
}

function MetricRow({ metric }: { metric: Metric }) {
  return (
    <li className="flex items-center gap-3.5 border-t border-line px-5 py-3">
      <CheckMark on={metric.shown} />
      <div className="min-w-0">
        <div className="text-sm font-medium">{metric.name}</div>
        <div className="text-xs text-muted">{metric.description}</div>
      </div>
      <span className="sr-only">{metric.shown ? "Shown on dashboard" : "Not shown"}</span>
    </li>
  );
}

/**
 * Screen 03 left + middle columns. The channel list is a vertical tab list:
 * click a channel (or use the arrow keys) to show its metrics.
 */
export function ChannelPicker() {
  const [selected, setSelected] = useState(channels[0].id);
  const [adding, setAdding] = useState(false);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const baseId = useId();
  const tabId = (id: string) => `${baseId}-tab-${id}`;
  const panelId = `${baseId}-panel`;
  const active = channels.find((c) => c.id === selected) ?? channels[0];

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = channels.length - 1;
    const next =
      e.key === "ArrowDown" ? (index === last ? 0 : index + 1)
      : e.key === "ArrowUp" ? (index === 0 ? last : index - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    setSelected(channels[next].id);
    tabRefs.current[channels[next].id]?.focus();
  };

  return (
    <>
      <Card padding="none" className="w-[280px] shrink-0 self-start px-3 py-5">
        <div role="tablist" aria-orientation="vertical" aria-label="Your channels" className="flex flex-col gap-1.5">
          {channelGroups.map((group, gi) => (
            <Fragment key={group.id}>
              <div
                role="presentation"
                className={cn("px-0 text-xs font-semibold tracking-[0.08em] text-muted", gi > 0 && "mt-1.5")}
              >
                {group.label}
              </div>
              {channels
                .filter((c) => c.group === group.id)
                .map((c) => {
                  const index = channels.indexOf(c);
                  const isActive = c.id === selected;
                  return (
                    <button
                      key={c.id}
                      ref={(el) => {
                        tabRefs.current[c.id] = el;
                      }}
                      id={tabId(c.id)}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={panelId}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => setSelected(c.id)}
                      onKeyDown={(e) => onKeyDown(e, index)}
                      className={cn(
                        "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition",
                        "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-green-strong",
                        isActive ? "bg-brand-green-tint" : "hover:bg-canvas",
                      )}
                    >
                      <BrandTile name={c.brand} size={28} logoSize={16} />
                      <span className="min-w-0 flex-1">
                        <span className={cn("block text-sm", isActive ? "font-semibold" : "font-medium")}>{c.name}</span>
                        <span className="block text-xs text-muted">{c.status}</span>
                      </span>
                      {c.action ? (
                        <Pill>{c.action}</Pill>
                      ) : (
                        <Icon name="chevronRight" size={14} className="shrink-0 text-muted" />
                      )}
                    </button>
                  );
                })}
            </Fragment>
          ))}
        </div>
        <Button
          variant="dashed"
          iconLeft="plus"
          fullWidth
          className="mt-1.5"
          aria-haspopup="dialog"
          onClick={() => setAdding(true)}
        >
          Add channel
        </Button>
        <AddChannelDialog open={adding} onClose={() => setAdding(false)} />
      </Card>

      <Card
        padding="none"
        as="section"
        className="min-w-0 flex-1 self-start pb-2"
      >
        <div id={panelId} role="tabpanel" aria-labelledby={tabId(active.id)}>
          <div className="px-5 pb-3.5 pt-[18px]">
            <h2 className="text-base font-semibold">{active.name} metrics</h2>
            <p className="mt-0.5 text-xs text-muted">{active.panelSubtitle}</p>
          </div>
          <ul>
            {active.metrics.map((m) => (
              <MetricRow key={m.name} metric={m} />
            ))}
          </ul>
        </div>
      </Card>
    </>
  );
}
