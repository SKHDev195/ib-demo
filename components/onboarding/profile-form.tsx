"use client";

import Link from "next/link";
import { useId, useState, type ReactNode } from "react";
import { AddChannelDialog } from "@/components/customize/add-channel-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AddChip, Chip } from "@/components/ui/chip";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Select } from "@/components/ui/select";
import {
  audienceSizes,
  baseChannels,
  countries,
  countryChannels,
  defaultAnswers,
  goals,
  ibTypes,
  type Country,
} from "@/lib/onboarding";

type AudienceSize = (typeof audienceSizes)[number]["value"];
type Goal = (typeof goals)[number]["value"];

/** Field label row: bold question plus an optional grey hint. */
function FieldLabel({ id, children, hint }: { id: string; children: ReactNode; hint?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
      <span id={id} className="text-sm font-semibold">
        {children}
      </span>
      {hint}
    </div>
  );
}

function toggle<T>(list: T[], item: T): T[] {
  return list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
}

/** "A", "A and B", "A, B and C" */
function joinNames(names: string[]) {
  return names.length < 2 ? names.join("") : `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`;
}

export function ProfileForm() {
  const ids = {
    type: useId(),
    countries: useId(),
    channels: useId(),
    audience: useId(),
    goal: useId(),
    description: useId(),
  };

  const [types, setTypes] = useState<string[]>(defaultAnswers.ibTypes);
  const [picked, setPicked] = useState<Country[]>(defaultAnswers.countries);
  const [channels, setChannels] = useState<string[]>(defaultAnswers.channels);
  const [audience, setAudience] = useState<AudienceSize>(defaultAnswers.audience as AudienceSize);
  const [goal, setGoal] = useState<Goal>(defaultAnswers.goal as Goal);
  const [description, setDescription] = useState(defaultAnswers.description);
  const [addingChannel, setAddingChannel] = useState(false);

  // Channels specific to the picked countries are listed first; the rest follow.
  const regional = countries.filter((c) => picked.includes(c)).flatMap((c) => countryChannels[c] ?? []);
  const channelOptions = [...regional, ...baseChannels];
  const pickedInOrder = countries.filter((c) => picked.includes(c));

  const toggleCountry = (country: Country) => {
    const next = toggle(picked, country);
    setPicked(next);
    // Drop selections for channels that are no longer offered.
    const offered = new Set([...next.flatMap((c) => countryChannels[c] ?? []), ...baseChannels]);
    setChannels((current) => current.filter((ch) => offered.has(ch)));
  };

  return (
    <Card padding="lg" className="flex flex-col gap-[22px]">
      {/* IB type */}
      <div role="group" aria-labelledby={ids.type} className="space-y-2.5">
        <FieldLabel id={ids.type} hint={<span className="text-xs text-muted">Pick all that apply</span>}>
          What kind of IB are you?
        </FieldLabel>
        <div className="flex flex-wrap gap-2">
          {ibTypes.map((t) => (
            <Chip key={t} label={t} checked={types.includes(t)} onChange={() => setTypes(toggle(types, t))} />
          ))}
        </div>
      </div>

      {/* Countries */}
      <div role="group" aria-labelledby={ids.countries} className="space-y-2.5">
        <FieldLabel id={ids.countries} hint={<span className="text-xs text-muted">Pick all that apply</span>}>
          Where are your clients?
        </FieldLabel>
        <div className="flex flex-wrap gap-2">
          {countries.map((c) => (
            <Chip key={c} label={c} checked={picked.includes(c)} onChange={() => toggleCountry(c)} />
          ))}
          {/* Not wired up in the demo. */}
          <AddChip label="Add country" />
        </div>
      </div>

      {/* Channels */}
      <div role="group" aria-labelledby={ids.channels} className="space-y-2.5">
        <FieldLabel
          id={ids.channels}
          hint={
            pickedInOrder.length > 0 && (
              <span className="text-xs text-muted">Most used in {joinNames(pickedInOrder)} are listed first</span>
            )
          }
        >
          Which channels do you use to find and keep clients?
        </FieldLabel>
        <div className="flex flex-wrap gap-2">
          {channelOptions.map((ch) => (
            <Chip
              key={ch}
              label={ch}
              checked={channels.includes(ch)}
              onChange={() => setChannels(toggle(channels, ch))}
            />
          ))}
          {/* Opens the same "Add a channel" window as Screen 03. */}
          <AddChip label="Add channel" aria-haspopup="dialog" onClick={() => setAddingChannel(true)} />
          <AddChannelDialog open={addingChannel} onClose={() => setAddingChannel(false)} />
        </div>
        <p className="text-xs text-muted">
          This list changes with the countries you pick. Add Thailand to see LINE, or Vietnam to see Zalo.
        </p>
      </div>

      {/* Audience + goal */}
      <div className="flex gap-6">
        <div className="space-y-2.5">
          <FieldLabel id={ids.audience}>Followers across all channels</FieldLabel>
          <SegmentedControl
            label="Followers across all channels"
            variant="surface"
            options={audienceSizes}
            value={audience}
            onChange={setAudience}
          />
        </div>
        <div className="min-w-0 flex-1 space-y-2.5">
          <FieldLabel id={ids.goal}>Main goal for the next 6 months</FieldLabel>
          <Select options={goals} value={goal} onChange={setGoal} labelledBy={ids.goal} />
        </div>
      </div>

      {/* Free text */}
      <div className="space-y-2.5">
        <label htmlFor={ids.description} className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-sm font-semibold">Describe your business in your own words</span>
          <span className="text-xs text-muted">Optional. Helps us choose your metrics and courses.</span>
        </label>
        <textarea
          id={ids.description}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          maxLength={1000}
          placeholder="For example: which channels you use, who your clients are, and where they get stuck."
          className="block min-h-24 w-full resize-y rounded-[10px] border border-line bg-surface px-3.5 py-3 text-sm leading-relaxed placeholder:text-subtle hover:border-brand-green/60 focus:border-brand-green focus:outline-none"
        />
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between">
        <Link
          href="/dashboard/customize"
          className="text-sm font-medium text-brand-green-strong hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green-deep"
        >
          Choose metrics manually
        </Link>
        <Button href="/onboarding/connect" variant="primary">
          Next: connect channels
        </Button>
      </div>
    </Card>
  );
}
