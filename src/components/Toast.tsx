export interface ToastData {
  id: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

interface ToastProps {
  toast: ToastData;
}

export function Toast({ toast }: ToastProps) {
  return (
    <div
      className="fixed left-4 right-4 z-50 mx-auto flex max-w-md items-center justify-between gap-3 rounded-2xl bg-surface-high px-4 py-3.5 shadow-card animate-toast-in"
      style={{ bottom: "calc(env(safe-area-inset-bottom) + 76px)" }}
      role="status"
    >
      <span className="text-sm font-medium text-ink">{toast.message}</span>
      {toast.actionLabel && toast.onAction && (
        <button
          onClick={toast.onAction}
          className="shrink-0 text-sm font-semibold text-cal active:opacity-60"
        >
          {toast.actionLabel}
        </button>
      )}
    </div>
  );
}
