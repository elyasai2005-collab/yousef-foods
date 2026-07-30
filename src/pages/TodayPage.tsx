import { useState } from "react";
import type { Food, FoodUnit } from "../types";
import type { UseAppData } from "../hooks/useAppData";
import { StatCard } from "../components/StatCard";
import { MacroPill } from "../components/MacroPill";
import { FoodGrid } from "../components/FoodGrid";
import { QuickLogSheet } from "../components/QuickLogSheet";
import { ConfirmDialog } from "../components/ConfirmDialog";

interface TodayPageProps {
  app: UseAppData;
  onLogged: (message: string, undo: () => void) => void;
}

function todayLongDate(): string {
  return new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function TodayPage({ app, onLogged }: TodayPageProps) {
  const { data, todaysLog, todaysTotals, logFood, deleteEntry, resetToday, restoreEntries } = app;
  const [activeFood, setActiveFood] = useState<Food | null>(null);
  const [confirmingReset, setConfirmingReset] = useState(false);

  function handlePick(unit: FoodUnit) {
    if (!activeFood) return;
    const entry = logFood(activeFood, unit);
    onLogged(`Logged ${activeFood.name} · ${unit.label}`, () => deleteEntry(entry.id));
  }

  function handleResetToday() {
    setConfirmingReset(false);
    const removed = resetToday();
    if (removed.length === 0) return;
    onLogged(
      `Cleared ${removed.length} ${removed.length === 1 ? "item" : "items"} from today`,
      () => restoreEntries(removed)
    );
  }

  return (
    <div className="px-4 pt-3 pb-6">
      <header className="mb-5 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-ink-muted">{todayLongDate()}</p>
          <h1 className="text-2xl font-bold text-ink">Today</h1>
        </div>
        {todaysLog.length > 0 && (
          <button
            onClick={() => setConfirmingReset(true)}
            className="mt-1 shrink-0 rounded-full bg-surface px-3.5 py-2 text-xs font-semibold text-danger active:scale-95 transition-transform"
          >
            Reset Today
          </button>
        )}
      </header>

      <div className="flex flex-col gap-3">
        <StatCard
          label="Calories"
          current={todaysTotals.calories}
          target={data.targets.calories}
          unit="kcal"
          accentClass="bg-cal"
          barBgClass="bg-cal/15"
        />
        <StatCard
          label="Protein"
          current={todaysTotals.protein}
          target={data.targets.protein}
          unit="g"
          accentClass="bg-protein"
          barBgClass="bg-protein/15"
        />
        <div className="flex gap-3">
          <MacroPill label="Carbs" value={todaysTotals.carbs} unit="g" dotClass="bg-carbs" />
          <MacroPill label="Fat" value={todaysTotals.fat} unit="g" dotClass="bg-fat" />
        </div>
      </div>

      <div className="mt-7">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-muted">Log food</h2>
        <FoodGrid foods={data.foods} onSelect={setActiveFood} />
      </div>

      {activeFood && (
        <QuickLogSheet food={activeFood} onPick={handlePick} onClose={() => setActiveFood(null)} />
      )}

      {confirmingReset && (
        <ConfirmDialog
          title="Reset today's log?"
          message="Are you sure you want to clear today's food log?"
          confirmLabel="Reset"
          cancelLabel="Cancel"
          onConfirm={handleResetToday}
          onCancel={() => setConfirmingReset(false)}
        />
      )}
    </div>
  );
}
