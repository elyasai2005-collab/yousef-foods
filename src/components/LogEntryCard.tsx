import { useRef, useState } from "react";
import type { LogEntry } from "../types";
import { formatTime } from "../lib/date";

interface LogEntryCardProps {
  entry: LogEntry;
  onDelete: (entry: LogEntry) => void;
}

const DELETE_THRESHOLD = 88;

export function LogEntryCard({ entry, onDelete }: LogEntryCardProps) {
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [removed, setRemoved] = useState(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const axisLocked = useRef<"x" | "y" | null>(null);

  function onTouchStart(e: React.TouchEvent) {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    axisLocked.current = null;
    setDragging(true);
  }

  function onTouchMove(e: React.TouchEvent) {
    const dx = e.touches[0].clientX - startX.current;
    const dy = e.touches[0].clientY - startY.current;

    if (axisLocked.current === null && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
      axisLocked.current = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    }
    if (axisLocked.current === "y") return; // let the page scroll vertically

    // Only allow swiping left (negative), and clamp.
    const next = Math.min(0, Math.max(dx, -160));
    setDragX(next);
  }

  function onTouchEnd() {
    setDragging(false);
    if (dragX < -DELETE_THRESHOLD) {
      setDragX(-400);
      setRemoved(true);
      window.setTimeout(() => onDelete(entry), 160);
    } else {
      setDragX(0);
    }
  }

  return (
    <div className="relative overflow-hidden rounded-3xl">
      <div className="absolute inset-0 flex items-center justify-end bg-danger px-6">
        <span className="text-sm font-semibold text-white">Delete</span>
      </div>
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          transform: `translateX(${dragX}px)`,
          transition: dragging ? "none" : "transform 200ms ease-out",
          opacity: removed ? 0 : 1,
        }}
        className="relative rounded-3xl bg-surface shadow-card px-4 py-3.5"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl leading-none shrink-0">{entry.emoji}</span>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <span className="truncate font-semibold text-ink">
                {entry.foodName} <span className="text-ink-muted font-normal">· {entry.unitLabel}</span>
              </span>
              <span className="shrink-0 text-xs text-ink-faint tabular-nums">{formatTime(entry.timestamp)}</span>
            </div>
            <div className="mt-0.5 text-sm text-ink-muted tabular-nums">
              {Math.round(entry.macros.calories)} kcal · {Math.round(entry.macros.protein)}g protein
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
