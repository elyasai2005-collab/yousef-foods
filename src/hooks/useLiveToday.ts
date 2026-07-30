import { useEffect, useState } from "react";
import { todayKey } from "../lib/date";

const CHECK_INTERVAL_MS = 30_000;

/**
 * Returns today's date key ("2026-07-29") and keeps it fresh even if the app
 * is left open across midnight. Since nothing is ever deleted from the log,
 * "starting a new day" just means this key changes — the Today/Log screens
 * re-filter automatically and show an empty day, with the old day's entries
 * still sitting in storage under their own date.
 */
export function useLiveToday(): string {
  const [key, setKey] = useState(() => todayKey());

  useEffect(() => {
    const check = () => {
      const now = todayKey();
      setKey((prev) => (prev !== now ? now : prev));
    };

    // Catches the common case: phone unlocked the next morning with the
    // PWA still "open" in the background.
    document.addEventListener("visibilitychange", check);
    window.addEventListener("focus", check);
    // Catches the rarer case: app left open and awake right through midnight.
    const interval = window.setInterval(check, CHECK_INTERVAL_MS);

    return () => {
      document.removeEventListener("visibilitychange", check);
      window.removeEventListener("focus", check);
      window.clearInterval(interval);
    };
  }, []);

  return key;
}
