import { useEffect, useState } from "react";
import type { Food, FoodUnit } from "../types";

interface QuickLogSheetProps {
  food: Food;
  onPick: (unit: FoodUnit) => void;
  onClose: () => void;
}

export function QuickLogSheet({ food, onPick, onClose }: QuickLogSheetProps) {
  const [closing, setClosing] = useState(false);

  // Let ESC close it on devices with a keyboard; harmless elsewhere.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClose() {
    setClosing(true);
    window.setTimeout(onClose, 170);
  }

  function handlePick(unit: FoodUnit) {
    if ("vibrate" in navigator) {
      try {
        navigator.vibrate(12);
      } catch {
        /* ignore — vibration is a nicety, not a requirement */
      }
    }
    onPick(unit);
    setClosing(true);
    window.setTimeout(onClose, 170);
  }

  return (
    <div className="fixed inset-0 z-40">
      <div
        className={`absolute inset-0 bg-black/60 ${closing ? "" : "animate-scrim-in"}`}
        onClick={handleClose}
      />
      <div
        className={`absolute bottom-0 left-0 right-0 mx-auto max-w-md rounded-t-3xl bg-surface-alt shadow-card px-5 pt-3 ${
          closing ? "animate-sheet-out" : "animate-sheet-in"
        }`}
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 20px)" }}
        role="dialog"
        aria-modal="true"
        aria-label={`Log ${food.name}`}
      >
        <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-white/15" />
        <div className="flex items-center gap-3 pb-4">
          <span className="text-3xl">{food.emoji}</span>
          <h2 className="text-xl font-bold text-ink">{food.name}</h2>
        </div>
        <div className="flex flex-col gap-2.5 pb-1">
          {food.units.map((unit) => (
            <button
              key={unit.id}
              onClick={() => handlePick(unit)}
              className="flex items-center justify-between rounded-2xl bg-surface px-5 py-4 text-left active:scale-[0.98] active:bg-surface-high transition-transform"
            >
              <span className="text-base font-semibold text-ink">{unit.label}</span>
              <span className="text-sm text-ink-muted tabular-nums">
                {Math.round(unit.macros.calories)} kcal · {Math.round(unit.macros.protein)}g protein
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
