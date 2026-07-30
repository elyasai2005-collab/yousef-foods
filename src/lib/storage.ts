import type { AppData } from "../types";
import { BUILT_IN_FOODS } from "../data/foods";

const STORAGE_KEY = "nutrition-tracker:data";

const DEFAULT_DATA: AppData = {
  version: 1,
  targets: { calories: 2200, protein: 100 },
  foods: BUILT_IN_FOODS,
  log: [],
};

export function loadData(): AppData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_DATA;
    const parsed = JSON.parse(raw) as Partial<AppData>;
    return {
      version: 1,
      targets: {
        calories: parsed.targets?.calories ?? DEFAULT_DATA.targets.calories,
        protein: parsed.targets?.protein ?? DEFAULT_DATA.targets.protein,
      },
      // Once a user has data, it's the source of truth — edits and deletes
      // (including of built-in foods) stick, and we never silently re-add
      // something they removed.
      foods: parsed.foods ?? DEFAULT_DATA.foods,
      log: parsed.log ?? [],
    };
  } catch {
    return DEFAULT_DATA;
  }
}

export function saveData(data: AppData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage full or unavailable (private browsing) — fail silently rather
    // than crash a single-user offline app; the in-memory state still works
    // for the rest of the session.
  }
}

export function exportJson(data: AppData): string {
  return JSON.stringify(data, null, 2);
}

export function parseImportedJson(raw: string): AppData {
  const parsed = JSON.parse(raw) as Partial<AppData>;
  if (!parsed || typeof parsed !== "object") {
    throw new Error("File is not valid backup data.");
  }
  if (!Array.isArray(parsed.foods) || !Array.isArray(parsed.log)) {
    throw new Error("File is missing foods or log data.");
  }
  return {
    version: 1,
    targets: {
      calories: parsed.targets?.calories ?? DEFAULT_DATA.targets.calories,
      protein: parsed.targets?.protein ?? DEFAULT_DATA.targets.protein,
    },
    foods: parsed.foods,
    log: parsed.log,
  };
}
