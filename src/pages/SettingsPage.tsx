import { useRef, useState } from "react";
import type { Food } from "../types";
import type { UseAppData } from "../hooks/useAppData";
import { exportJson, parseImportedJson } from "../lib/storage";
import { FoodEditorSheet } from "../components/FoodEditorSheet";

interface SettingsPageProps {
  app: UseAppData;
  onMessage: (message: string) => void;
}

export function SettingsPage({ app, onMessage }: SettingsPageProps) {
  const { data, setTargets, addFood, updateFood, deleteFood, replaceAll } = app;
  const [calorieInput, setCalorieInput] = useState(String(data.targets.calories));
  const [proteinInput, setProteinInput] = useState(String(data.targets.protein));
  const [editorFood, setEditorFood] = useState<Food | null | "new">(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function commitTargets() {
    const calories = Math.max(0, Math.round(Number(calorieInput)) || 0);
    const protein = Math.max(0, Math.round(Number(proteinInput)) || 0);
    setTargets({ calories, protein });
    onMessage("Targets updated");
  }

  function handleExport() {
    const json = exportJson(data);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const stamp = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `nutrition-backup-${stamp}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    onMessage("Backup exported");
  }

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  function handleFileChosen(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-choosing the same file later
    if (!file) return;

    const confirmed = window.confirm(
      "Restoring will replace all current foods and log entries with the backup's data. Continue?"
    );
    if (!confirmed) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = String(reader.result);
        const restored = parseImportedJson(text);
        replaceAll(restored);
        setCalorieInput(String(restored.targets.calories));
        setProteinInput(String(restored.targets.protein));
        onMessage("Backup restored");
      } catch {
        onMessage("That file isn't a valid backup");
      }
    };
    reader.readAsText(file);
  }

  function handleSaveFood(food: Food) {
    const exists = data.foods.some((f) => f.id === food.id);
    if (exists) {
      updateFood(food.id, food);
      onMessage(`${food.name} updated`);
    } else {
      addFood(food);
      onMessage(`${food.name} added`);
    }
  }

  function handleDeleteFood(foodId: string) {
    const removed = data.foods.find((f) => f.id === foodId);
    deleteFood(foodId);
    if (removed) onMessage(`${removed.name} removed`);
  }

  return (
    <div className="px-4 pt-3 pb-6">
      <header className="mb-5">
        <h1 className="text-2xl font-bold text-ink">Settings</h1>
      </header>

      <section className="rounded-3xl bg-surface shadow-card p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink-muted">Daily Targets</h2>
        <div className="flex flex-col gap-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Calorie target</span>
            <div className="flex items-center gap-2 rounded-2xl bg-surface-alt px-4 py-3 ring-1 ring-white/5 focus-within:ring-cal">
              <input
                type="number"
                inputMode="numeric"
                value={calorieInput}
                onChange={(e) => setCalorieInput(e.target.value)}
                onBlur={commitTargets}
                className="w-full bg-transparent text-lg font-semibold text-ink outline-none tabular-nums"
              />
              <span className="text-sm text-ink-muted">kcal</span>
            </div>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Protein target</span>
            <div className="flex items-center gap-2 rounded-2xl bg-surface-alt px-4 py-3 ring-1 ring-white/5 focus-within:ring-cal">
              <input
                type="number"
                inputMode="numeric"
                value={proteinInput}
                onChange={(e) => setProteinInput(e.target.value)}
                onBlur={commitTargets}
                className="w-full bg-transparent text-lg font-semibold text-ink outline-none tabular-nums"
              />
              <span className="text-sm text-ink-muted">g</span>
            </div>
          </label>
        </div>
      </section>

      <section className="mt-4 rounded-3xl bg-surface shadow-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">Manage Foods</h2>
          <button onClick={() => setEditorFood("new")} className="text-sm font-semibold text-cal active:opacity-60">
            + Add food
          </button>
        </div>
        <div className="flex flex-col gap-1.5">
          {data.foods.map((food) => (
            <button
              key={food.id}
              onClick={() => setEditorFood(food)}
              className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left active:bg-surface-alt transition-colors"
            >
              <span className="text-2xl">{food.emoji}</span>
              <div className="min-w-0 flex-1">
                <div className="font-medium text-ink">{food.name}</div>
                <div className="truncate text-xs text-ink-muted">
                  {food.units.length} {food.units.length === 1 ? "quantity" : "quantities"}
                </div>
              </div>
              <span className="text-ink-faint">›</span>
            </button>
          ))}
          {data.foods.length === 0 && (
            <p className="px-3 py-4 text-sm text-ink-muted">No foods yet — add one above.</p>
          )}
        </div>
      </section>

      <section className="mt-4 rounded-3xl bg-surface shadow-card p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink-muted">Backup</h2>
        <div className="flex flex-col gap-2.5">
          <button
            onClick={handleExport}
            className="rounded-2xl bg-surface-alt py-3.5 text-sm font-semibold text-ink active:scale-[0.98] transition-transform"
          >
            Export JSON
          </button>
          <button
            onClick={handleImportClick}
            className="rounded-2xl bg-surface-alt py-3.5 text-sm font-semibold text-ink active:scale-[0.98] transition-transform"
          >
            Import JSON
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={handleFileChosen}
          />
        </div>
        <p className="mt-3 text-xs text-ink-faint">
          Everything lives on this device only. Export a backup before switching phones or reinstalling.
        </p>
      </section>

      <p className="mt-6 text-center text-xs text-ink-faint">Nutrition Tracker · works fully offline</p>

      {editorFood && (
        <FoodEditorSheet
          food={editorFood === "new" ? null : editorFood}
          onSave={handleSaveFood}
          onDelete={editorFood !== "new" ? handleDeleteFood : undefined}
          onClose={() => setEditorFood(null)}
        />
      )}
    </div>
  );
}
