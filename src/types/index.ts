/** Macro values are always the *total* for the quantity in question, never per-100g. */
export interface Macros {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

/** One selectable quantity for a food, e.g. "150 g" or "1 egg". */
export interface FoodUnit {
  id: string;
  /** Label shown on the quick-log button, e.g. "150 g" or "Half glass". */
  label: string;
  macros: Macros;
}

export interface Food {
  id: string;
  name: string;
  emoji: string;
  /** True for built-in foods; custom foods can be freely deleted. */
  builtIn: boolean;
  units: FoodUnit[];
}

/** A single logged entry in today's (or any day's) food log. */
export interface LogEntry {
  id: string;
  foodId: string;
  foodName: string;
  emoji: string;
  unitLabel: string;
  macros: Macros;
  /** ISO date, e.g. "2026-07-29" — used to group entries by day. */
  date: string;
  /** Unix ms timestamp, used for sorting and display time. */
  timestamp: number;
}

export interface Targets {
  calories: number;
  protein: number;
}

export interface AppData {
  version: 1;
  targets: Targets;
  foods: Food[];
  log: LogEntry[];
}
