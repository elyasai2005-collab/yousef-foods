# Nutrition Tracker

A very fast, fully offline meal logger for one person. No login, no cloud,
no backend — everything lives in the browser's `localStorage` on your phone.

## Run it

```bash
npm install
npm run dev
```

Open the printed local URL on your phone (same Wi-Fi) or in a desktop
browser. To install it as a home-screen app, open it in Chrome/Safari and
use "Add to Home Screen" — it's a full PWA and works offline after the
first load.

To build a production bundle:

```bash
npm run build
npm run preview
```

## How logging works

Tap a food card on **Today** → a bottom sheet slides up with that food's
exact preset quantities (e.g. "150 g", "One glass", "2 eggs"). Tapping a
quantity logs it **immediately** — there's no separate "Save" step, so a
full log entry takes two taps and well under 10 seconds. This is the
one-tap-quantity behavior suggested in the brief.

## Screens

1. **Today** — calories/protein progress bars, carbs/fat totals, and the
   food grid.
2. **Log** — every item eaten today, swipe a card left to delete (with an
   Undo toast).
3. **Settings** — daily calorie/protein targets, add/edit/delete foods and
   their quantities & macros, and export/import a full JSON backup.

## Data & backups

Everything is stored under a single `localStorage` key. Nothing ever
leaves the device. Use **Settings → Export JSON** before switching phones
or reinstalling, and **Import JSON** to restore it (this replaces all
current data, so you'll get a confirmation prompt first).

## Editing nutrition values

Built-in foods and their macros live in `src/data/foods.ts` as the
starting defaults, but once the app has run once, your on-device copy
(editable from Settings → Manage Foods) is the source of truth — edits
and deletions always stick.

## Project structure

```
src/
  types/        Shared TypeScript types
  data/foods.ts Built-in food + macro defaults
  lib/          localStorage persistence, date helpers
  hooks/        useAppData — all state, all persistence
  components/   Presentational building blocks
  pages/        The 3 screens
  App.tsx       Navigation + toast orchestration
```
