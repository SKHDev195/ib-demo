"use client";

import { useRef, useState, type DragEvent, type KeyboardEvent } from "react";
import { Icon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { cn } from "@/lib/cn";
import { layoutWidgets, type Widget } from "@/lib/customize";

function move<T>(list: T[], from: number, to: number): T[] {
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

/**
 * Screen 03 right column. Rows can be reordered by dragging with the mouse,
 * or with the keyboard: focus a row, press Space to pick it up, move it with
 * the arrow keys, then Space to drop (Escape cancels). The order only lives
 * in this list — the dashboard itself is not changed in the demo.
 */
export function LayoutList() {
  const [items, setItems] = useState<Widget[]>(layoutWidgets);
  const [dragId, setDragId] = useState<string | null>(null);
  const [grabbed, setGrabbed] = useState<{ id: string; originalIndex: number } | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const rowRefs = useRef<Record<string, HTMLLIElement | null>>({});

  const position = (id: string, list = items) => `${list.findIndex((w) => w.id === id) + 1} of ${list.length}`;

  /* ----- mouse: native drag and drop ----- */
  const onDragStart = (e: DragEvent<HTMLLIElement>, id: string) => {
    setDragId(id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);
  };

  const onDragOver = (e: DragEvent<HTMLLIElement>, overId: string) => {
    if (!dragId) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (overId === dragId) return;
    // Reorder live while hovering, so the list shows where the row will land.
    setItems((list) => move(list, list.findIndex((w) => w.id === dragId), list.findIndex((w) => w.id === overId)));
  };

  const onDragEnd = () => {
    if (dragId) {
      const name = items.find((w) => w.id === dragId)?.name;
      setAnnouncement(`${name} moved to position ${position(dragId)}.`);
    }
    setDragId(null);
  };

  /* ----- keyboard ----- */
  const onKeyDown = (e: KeyboardEvent<HTMLLIElement>, id: string) => {
    const index = items.findIndex((w) => w.id === id);
    const name = items[index].name;

    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      if (grabbed) {
        setGrabbed(null);
        setAnnouncement(`${name} dropped at position ${position(id)}.`);
      } else {
        setGrabbed({ id, originalIndex: index });
        setAnnouncement(`${name} picked up, position ${position(id)}. Use the arrow keys to move, Space to drop, Escape to cancel.`);
      }
      return;
    }

    if (!grabbed) {
      // Plain arrow keys move focus between rows.
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const target = items[index + (e.key === "ArrowDown" ? 1 : -1)];
        if (target) rowRefs.current[target.id]?.focus();
      }
      return;
    }

    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const to = index + (e.key === "ArrowDown" ? 1 : -1);
      if (to < 0 || to >= items.length) return;
      const next = move(items, index, to);
      setItems(next);
      setAnnouncement(`${name} moved to position ${position(id, next)}.`);
      requestAnimationFrame(() => rowRefs.current[id]?.focus());
    } else if (e.key === "Escape") {
      e.preventDefault();
      const next = move(items, index, grabbed.originalIndex);
      setItems(next);
      setGrabbed(null);
      setAnnouncement(`Move cancelled. ${name} is back at position ${position(id, next)}.`);
      requestAnimationFrame(() => rowRefs.current[id]?.focus());
    }
  };

  return (
    <Card as="section" className="w-[320px] shrink-0 space-y-2.5 self-start">
      <div>
        <h2 className="text-base font-semibold">Dashboard layout</h2>
        <p id="layout-help" className="mt-0.5 text-xs text-muted">
          15 metrics, drag to reorder
        </p>
      </div>

      <ul aria-label="Dashboard metrics order" aria-describedby="layout-help" className="space-y-2.5">
        {items.map((w) => {
          const isDragging = dragId === w.id;
          const isGrabbed = grabbed?.id === w.id;
          return (
            <li
              key={w.id}
              ref={(el) => {
                rowRefs.current[w.id] = el;
              }}
              draggable
              tabIndex={0}
              aria-roledescription="sortable item"
              aria-label={`${w.name}, ${w.source}, position ${position(w.id)}${isGrabbed ? ", picked up" : ""}`}
              onDragStart={(e) => onDragStart(e, w.id)}
              onDragOver={(e) => onDragOver(e, w.id)}
              onDrop={(e) => e.preventDefault()}
              onDragEnd={onDragEnd}
              onKeyDown={(e) => onKeyDown(e, w.id)}
              onBlur={() => grabbed?.id === w.id && setGrabbed(null)}
              className={cn(
                "group flex cursor-grab items-center gap-2 rounded-lg bg-canvas py-2 pl-2 pr-2.5 transition-[background,box-shadow,opacity] select-none active:cursor-grabbing",
                "hover:bg-line/60 focus-visible:outline-2 focus-visible:outline-brand-green-strong",
                isDragging && "opacity-40",
                isGrabbed && "bg-brand-green-tint shadow-[0_0_0_1.5px_var(--color-brand-green)]",
              )}
            >
              <Icon name="grip" size={14} className="shrink-0 text-subtle group-hover:text-muted" />
              <span className="min-w-0 flex-1 text-xs font-medium">{w.name}</span>
              <Pill tone="subtle">{w.source}</Pill>
            </li>
          );
        })}
      </ul>

      <p className="text-xs font-medium text-muted">+ 5 more</p>

      {/* Display-only in the demo. */}
      <span aria-hidden="true" className="block">
        <Button iconLeft="reset" fullWidth tabIndex={-1} className="pointer-events-none">
          Reset to suggested preset
        </Button>
      </span>

      <p aria-live="assertive" className="sr-only">
        {announcement}
      </p>
    </Card>
  );
}
