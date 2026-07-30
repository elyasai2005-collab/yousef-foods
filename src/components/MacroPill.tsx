interface MacroPillProps {
  label: string;
  value: number;
  unit: string;
  dotClass: string;
}

export function MacroPill({ label, value, unit, dotClass }: MacroPillProps) {
  return (
    <div className="flex-1 rounded-2xl bg-surface shadow-card px-4 py-3 flex items-center gap-2.5">
      <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${dotClass}`} />
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-wide text-ink-muted leading-none mb-1">{label}</div>
        <div className="text-lg font-semibold tabular-nums leading-none">
          {Math.round(value)}
          <span className="text-xs text-ink-muted font-normal ml-0.5">{unit}</span>
        </div>
      </div>
    </div>
  );
}
