# Academy Demo

Clickable demo of the CXM IB Academy core screens (Next.js 16, Tailwind v4).

## Run it

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). Until the dashboard has been configured, the dashboard address shows Screen 01 (preset selection). It is configured by taking the preset (**Open dashboard** on Screen 01b) or by **Save dashboard** on Screen 03. After that, `/dashboard` shows Screen 02, and presets and metrics are changed through Screen 03 (**Customize**).

This is remembered in the browser's local storage. To run the demo from the very first load again, clear the site data for localhost:3000 or open it in a private window.

For a production build: `npm run build`, then `npm start` (also on port 3000).

## Screens

| Screen | Route |
| --- | --- |
| 01 Preset selection | `/dashboard` until configured; `/onboarding` from Screen 03 |
| 01b Onboarding: connect channels | `/onboarding/connect` |
| 02 Dashboard | `/dashboard` once configured |
| 03 / 03b Customize metrics, Add channel window | `/dashboard/customize` |
| 04 Strategy | `/strategy` |
| 05 Courses | `/courses` |
| 06 Lesson view | `/courses/multi-level-ib-networks` |
| Shared components | `/ui` |
