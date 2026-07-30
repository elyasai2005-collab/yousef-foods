/** Local (not UTC) ISO date key, e.g. "2026-07-29". Used to group log entries by day. */
export function dateKey(timestamp: number = Date.now()): string {
  const d = new Date(timestamp);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** "08:40" style local time for a log entry. */
export function formatTime(timestamp: number): string {
  const d = new Date(timestamp);
  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  return `${h}:${m}`;
}

export function todayKey(): string {
  return dateKey(Date.now());
}
