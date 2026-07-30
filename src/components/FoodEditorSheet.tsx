import { useState } from "react";
import type { Food, FoodUnit } from "../types";

interface FoodEditorSheetProps {
  food: Food | null; // null = creating a new food
  onSave: (food: Food) => void;
  onDelete?: (foodId: string) => void;
  onClose: () => void;
}

let unitIdCounter = 0;
function nextUnitId() {
  unitIdCounter += 1;
  return `unit-${Date.now().toString(36)}-${unitIdCounter}`;
}

function blankUnit(): FoodUnit {
  return { id: nextUnitId(), label: "", macros: { calories: 0, protein: 0, carbs: 0, fat: 0 } };
}

export function FoodEditorSheet({ food, onSave, onDelete, onClose }: FoodEditorSheetProps) {
  const isNew = food === null;
  const [name, setName] = useState(food?.name ?? "");
  const [emoji, setEmoji] = useState(food?.emoji ?? "🍽️");
  const [units, setUnits] = useState<FoodUnit[]>(food ? food.units.map((u) => ({ ...u, macros: { ...u.macros } })) : [blankUnit()]);
  const [error, setError] = useState<string | null>(null);

  function updateUnit(id: string, patch: Partial<FoodUnit>) {
    setUnits((prev) => prev.map((u) => (u.id === id ? { ...u, ...patch } : u)));
  }

  function updateMacro(id: string, key: keyof FoodUnit["macros"], value: string) {
    const num = Number(value);
    setUnits((prev) =>
      prev.map((u) => (u.id === id ? { ...u, macros: { ...u.macros, [key]: Number.isFinite(num) ? num : 0 } } : u))
    );
  }

  function addUnit() {
    setUnits((prev) => [...prev, blankUnit()]);
  }

  function removeUnit(id: string) {
    setUnits((prev) => (prev.length > 1 ? prev.filter((u) => u.id !== id) : prev));
  }

  function handleSave() {
    if (!name.trim()) {
      setError("Give the food a name.");
      return;
    }
    if (units.some((u) => !u.label.trim())) {
      setError("Every quantity needs a label.");
      return;
    }
    const savedFood: Food = {
      id: food?.id ?? `custom-${Date.now().toString(36)}`,
      name: name.trim(),
      emoji: emoji.trim() || "🍽️",
      builtIn: food?.builtIn ?? false,
      units,
    };
    onSave(savedFood);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black/60 animate-scrim-in" onClick={onClose} />
      <div
        className="absolute bottom-0 left-0 right-0 mx-auto max-h-[88vh] max-w-md overflow-y-auto rounded-t-3xl bg-surface-alt px-5 pt-3 shadow-card animate-sheet-in"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 24px)" }}
        role="dialog"
        aria-modal="true"
      >
        <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-white/15" />
        <h2 className="mb-4 text-xl font-bold text-ink">{isNew ? "Add Food" : "Edit Food"}</h2>

        <div className="flex gap-3">
          <div className="w-20">
            <label className="mb-1 block text-xs font-medium text-ink-muted">Emoji</label>
            <input
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              maxLength={4}
              className="w-full rounded-xl bg-surface px-3 py-3 text-center text-2xl text-ink outline-none ring-1 ring-white/5 focus:ring-cal"
            />
          </div>
          <div className="flex-1">
            <label className="mb-1 block text-xs font-medium text-ink-muted">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Oatmeal"
              className="w-full rounded-xl bg-surface px-3 py-3 text-base text-ink outline-none ring-1 ring-white/5 focus:ring-cal"
            />
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">Quantities</h3>
          <button onClick={addUnit} className="text-sm font-semibold text-cal active:opacity-60">
            + Add quantity
          </button>
        </div>

        <div className="mt-3 flex flex-col gap-3">
          {units.map((unit) => (
            <div key={unit.id} className="rounded-2xl bg-surface p-3.5 ring-1 ring-white/5">
              <div className="flex items-center gap-2">
                <input
                  value={unit.label}
                  onChange={(e) => updateUnit(unit.id, { label: e.target.value })}
                  placeholder="e.g. 150 g"
                  className="flex-1 rounded-lg bg-surface-alt px-3 py-2 text-sm text-ink outline-none ring-1 ring-white/5 focus:ring-cal"
                />
                {units.length > 1 && (
                  <button
                    onClick={() => removeUnit(unit.id)}
                    className="shrink-0 rounded-lg px-2.5 py-2 text-sm font-semibold text-danger active:opacity-60"
                    aria-label="Remove quantity"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="mt-2.5 grid grid-cols-4 gap-2">
                <MacroInput label="kcal" value={unit.macros.calories} onChange={(v) => updateMacro(unit.id, "calories", v)} />
                <MacroInput label="Protein" value={unit.macros.protein} onChange={(v) => updateMacro(unit.id, "protein", v)} />
                <MacroInput label="Carbs" value={unit.macros.carbs} onChange={(v) => updateMacro(unit.id, "carbs", v)} />
                <MacroInput label="Fat" value={unit.macros.fat} onChange={(v) => updateMacro(unit.id, "fat", v)} />
              </div>
            </div>
          ))}
        </div>

        {error && <p className="mt-3 text-sm font-medium text-danger">{error}</p>}

        <div className="mt-5 flex gap-3">
          {!isNew && onDelete && (
            <button
              onClick={() => {
                onDelete(food.id);
                onClose();
              }}
              className="flex-1 rounded-2xl bg-surface py-3.5 text-sm font-semibold text-danger active:scale-[0.98] transition-transform"
            >
              Delete food
            </button>
          )}
          <button
            onClick={handleSave}
            className="flex-1 rounded-2xl bg-cal py-3.5 text-sm font-bold text-bg active:scale-[0.98] transition-transform"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function MacroInput({ label, value, onChange }: { label: string; value: number; onChange: (v: string) => void }) {
  return (
    <label className="flex flex-col items-center gap-1">
      <input
        type="number"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg bg-surface-alt px-1.5 py-2 text-center text-sm text-ink outline-none ring-1 ring-white/5 focus:ring-cal tabular-nums"
      />
      <span className="text-[10px] text-ink-faint">{label}</span>
    </label>
  );
}
