export type Screen = "today" | "log" | "settings";

interface BottomNavProps {
  active: Screen;
  onChange: (screen: Screen) => void;
}

const TABS: { id: Screen; label: string; icon: JSX.Element }[] = [
  {
    id: "today",
    label: "Today",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path
          d="M12 3.5c-4.7 0-8.5 3.8-8.5 8.5s3.8 8.5 8.5 8.5 8.5-3.8 8.5-8.5S16.7 3.5 12 3.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "log",
    label: "Log",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path d="M5 4.5h14v15l-3-2-2 2-2-2-2 2-2-2-3 2v-15Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M8 9h8M8 12.5h8M8 16h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path
          d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M19.4 13.6c.05-.53.05-1.07 0-1.6l1.7-1.3-1.7-2.9-2 .8a7.6 7.6 0 0 0-1.4-.8L15.7 5.5H12.3l-.3 2.3c-.5.2-.97.47-1.4.8l-2-.8-1.7 2.9 1.7 1.3a6 6 0 0 0 0 1.6l-1.7 1.3 1.7 2.9 2-.8c.43.33.9.6 1.4.8l.3 2.3h3.4l.3-2.3c.5-.2.97-.47 1.4-.8l2 .8 1.7-2.9-1.7-1.3Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 bg-surface/95 backdrop-blur border-t border-white/5"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex max-w-md items-stretch">
        {TABS.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 active:scale-95 transition-transform"
              aria-label={tab.label}
              aria-current={isActive ? "page" : undefined}
            >
              <span className={isActive ? "text-cal" : "text-ink-faint"}>{tab.icon}</span>
              <span className={`text-[11px] font-medium ${isActive ? "text-ink" : "text-ink-faint"}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
