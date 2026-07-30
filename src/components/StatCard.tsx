interface StatCardProps {
  label: string;
  current: number;
  target: number;
  unit: string;
  accentClass: string; // e.g. "bg-cal" / "text-cal"
  barBgClass: string;
}

export function StatCard({ label, current, target, unit, accentClass, barBgClass }: StatCardProps) {
  const pct = target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;
  const remaining = Math.max(0, Math.round(target - current));
  const over = current > target;

  return (
    <div className="rounded-3xl bg-surface shadow-card p-5">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-ink-muted">{label}</span>
        <span className={`text-xs font-semibold ${over ? "text-danger" : "text-ink-muted"}`}>
          {over ? "Over" : `${remaining} ${unit} left`}
        </span>
      </div>
      <div className="mt-1.5 flex items-end gap-1.5">
        <span className="text-4xl font-bold tabular-nums tracking-tight">{Math.round(current)}</span>
        <span className="text-lg text-ink-muted pb-0.5 tabular-nums">/ {target} {unit}</span>
      </div>
      <div className={`mt-3 h-2.5 w-full rounded-full ${barBgClass} overflow-hidden`}>
        <div
          className={`h-full rounded-full ${accentClass} transition-[width] duration-500 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
