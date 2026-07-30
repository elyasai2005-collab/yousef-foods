import type { LogEntry } from "../types";
import type { UseAppData } from "../hooks/useAppData";
import { LogEntryCard } from "../components/LogEntryCard";

interface LogPageProps {
  app: UseAppData;
  onDeleted: (entry: LogEntry) => void;
}

export function LogPage({ app, onDeleted }: LogPageProps) {
  const { todaysLog, todaysTotals, deleteEntry } = app;

  function handleDelete(entry: LogEntry) {
    deleteEntry(entry.id);
    onDeleted(entry);
  }

  return (
    <div className="px-4 pt-3 pb-6">
      <header className="mb-5">
        <p className="text-sm text-ink-muted">
          {todaysLog.length} {todaysLog.length === 1 ? "item" : "items"} · {Math.round(todaysTotals.calories)} kcal
        </p>
        <h1 className="text-2xl font-bold text-ink">Today's Log</h1>
      </header>

      {todaysLog.length === 0 ? (
        <div className="mt-16 flex flex-col items-center text-center">
          <span className="text-5xl mb-3">🍽️</span>
          <p className="text-ink-muted">Nothing logged yet.</p>
          <p className="text-sm text-ink-faint mt-1">Log a meal from the Today tab.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {todaysLog.map((entry) => (
            <LogEntryCard key={entry.id} entry={entry} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
