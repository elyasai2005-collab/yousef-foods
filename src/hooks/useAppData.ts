import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { AppData, Food, FoodUnit, LogEntry, Targets } from "../types";
import { loadData, saveData } from "../lib/storage";
import { todayKey } from "../lib/date";
import { useLiveToday } from "./useLiveToday";

let idCounter = 0;
/** Fast, dependency-free unique id — fine for a single-device local log. */
function nextId(): string {
  idCounter += 1;
  return `${Date.now().toString(36)}-${idCounter.toString(36)}`;
}

export function useAppData() {
  const [data, setData] = useState<AppData>(() => loadData());
  // Mirrors the latest committed state into a ref so callbacks below can read
  // a fresh value synchronously without depending on setState's updater
  // timing (which isn't guaranteed to run before the call returns).
  const dataRef = useRef(data);
  dataRef.current = data;
  // Drives the "new day" behavior: when this changes, today's log/totals
  // recompute to an empty day on their own, with no data actually deleted.
  const liveToday = useLiveToday();

  useEffect(() => {
    saveData(data);
  }, [data]);

  const todaysLog = useMemo(() => {
    return data.log
      .filter((e) => e.date === liveToday)
      .sort((a, b) => b.timestamp - a.timestamp);
  }, [data.log, liveToday]);

  const todaysTotals = useMemo(() => {
    return todaysLog.reduce(
      (acc, e) => ({
        calories: acc.calories + e.macros.calories,
        protein: acc.protein + e.macros.protein,
        carbs: acc.carbs + e.macros.carbs,
        fat: acc.fat + e.macros.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [todaysLog]);

  const logFood = useCallback((food: Food, unit: FoodUnit) => {
    const entry: LogEntry = {
      id: nextId(),
      foodId: food.id,
      foodName: food.name,
      emoji: food.emoji,
      unitLabel: unit.label,
      macros: unit.macros,
      date: todayKey(),
      timestamp: Date.now(),
    };
    setData((prev) => ({ ...prev, log: [entry, ...prev.log] }));
    return entry;
  }, []);

  const deleteEntry = useCallback((entryId: string) => {
    setData((prev) => ({ ...prev, log: prev.log.filter((e) => e.id !== entryId) }));
  }, []);

  const undoDelete = useCallback((entry: LogEntry) => {
    setData((prev) => ({ ...prev, log: [entry, ...prev.log] }));
  }, []);

  /**
   * Clears only today's log entries — nutrition totals for today fall back
   * to zero as a result, since they're always derived from the log. Every
   * other day's entries, custom foods, and targets are untouched. Returns
   * the removed entries so the caller can offer an Undo.
   */
  const resetToday = useCallback(() => {
    const key = todayKey();
    const removed = dataRef.current.log.filter((e) => e.date === key);
    setData((prev) => ({ ...prev, log: prev.log.filter((e) => e.date !== key) }));
    return removed;
  }, []);

  const restoreEntries = useCallback((entries: LogEntry[]) => {
    if (entries.length === 0) return;
    setData((prev) => ({ ...prev, log: [...entries, ...prev.log] }));
  }, []);

  const setTargets = useCallback((targets: Targets) => {
    setData((prev) => ({ ...prev, targets }));
  }, []);

  const addFood = useCallback((food: Food) => {
    setData((prev) => ({ ...prev, foods: [...prev.foods, food] }));
  }, []);

  const updateFood = useCallback((foodId: string, patch: Partial<Food>) => {
    setData((prev) => ({
      ...prev,
      foods: prev.foods.map((f) => (f.id === foodId ? { ...f, ...patch } : f)),
    }));
  }, []);

  const deleteFood = useCallback((foodId: string) => {
    setData((prev) => ({ ...prev, foods: prev.foods.filter((f) => f.id !== foodId) }));
  }, []);

  const replaceAll = useCallback((next: AppData) => {
    setData(next);
  }, []);

  return {
    data,
    todaysLog,
    todaysTotals,
    logFood,
    deleteEntry,
    undoDelete,
    resetToday,
    restoreEntries,
    setTargets,
    addFood,
    updateFood,
    deleteFood,
    replaceAll,
  };
}

export type UseAppData = ReturnType<typeof useAppData>;
