import { useCallback, useRef, useState } from "react";
import { useAppData } from "./hooks/useAppData";
import { BottomNav, type Screen } from "./components/BottomNav";
import { Toast, type ToastData } from "./components/Toast";
import { BrandHeader } from "./components/BrandHeader";
import { TodayPage } from "./pages/TodayPage";
import { LogPage } from "./pages/LogPage";
import { SettingsPage } from "./pages/SettingsPage";
import type { LogEntry } from "./types";

const TOAST_MS = 3200;

export default function App() {
  const app = useAppData();
  const [screen, setScreen] = useState<Screen>("today");
  const [toast, setToast] = useState<ToastData | null>(null);
  const toastTimer = useRef<number | null>(null);

  const showToast = useCallback((message: string, actionLabel?: string, onAction?: () => void) => {
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    const id = `${Date.now()}`;
    setToast({ id, message, actionLabel, onAction: onAction ? () => { onAction(); setToast(null); } : undefined });
    toastTimer.current = window.setTimeout(() => setToast(null), TOAST_MS);
  }, []);

  const handleLogged = useCallback(
    (message: string, undo: () => void) => {
      showToast(message, "Undo", undo);
    },
    [showToast]
  );

  const handleDeleted = useCallback(
    (entry: LogEntry) => {
      showToast(`Removed ${entry.foodName}`, "Undo", () => app.undoDelete(entry));
    },
    [showToast, app]
  );

  const handleMessage = useCallback(
    (message: string) => {
      showToast(message);
    },
    [showToast]
  );

  return (
    <div className="min-h-screen bg-bg text-ink">
      <div className="mx-auto max-w-md">
        <BrandHeader />
        {screen === "today" && <TodayPage app={app} onLogged={handleLogged} />}
        {screen === "log" && <LogPage app={app} onDeleted={handleDeleted} />}
        {screen === "settings" && <SettingsPage app={app} onMessage={handleMessage} />}
      </div>

      {/* Spacer so content never sits under the fixed bottom nav */}
      <div className="h-20" />

      <BottomNav active={screen} onChange={setScreen} />
      {toast && <Toast toast={toast} />}
    </div>
  );
}
