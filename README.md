# APS — Security Scan Dashboard

A frontend UI for a security scanning platform. Built with React + Vite + Tailwind CSS. Three pages, fully connected, with mock data driving everything dynamically.

---

## What is this?

This is a pixel-accurate recreation of a B2B security platform UI. The app has three screens:

1. **Login / Sign-Up** — validates the form, stores the user's email, then takes you to the dashboard
2. **Dashboard** — shows all scans in a table, lets you search, and click through to a scan detail
3. **Scan Detail** — shows a live scan in progress with a step tracker, activity logs, and a findings panel on the right

There's no backend. All data comes from mock files in `src/data/`. The UI is meant to look and feel like a real product.

---

## Getting started

Make sure you have Node 18+ installed, then:

```bash
npm install
npm run dev
```

That's it. Opens at `http://localhost:5173`.

To build for production:

```bash
npm run build
npm run preview
```

---

## Project layout

```
src/
├── pages/
│   ├── LoginPage.jsx        # Sign-up form with validation
│   ├── DashboardPage.jsx    # Main dashboard with scan table
│   ├── ScanDetailPage.jsx   # Active scan detail view
│   └── PlaceholderPage.jsx  # Catch-all for nav links not yet built
│
├── data/
│   ├── scans.js             # 11 mock scan records
│   ├── findings.js          # Security findings per scan
│   └── logs.js              # Activity logs + verification loops
│
├── components/
│   └── ReusableComponents.jsx  # SeverityBadge, StatusChip, Button
│
├── context/
│   └── ThemeContext.jsx     # Dark/light mode, persisted to localStorage
│
└── App.jsx                  # Routes: /, /login, /dashboard, /scan/:id
```

---

## How the pages connect

- Visiting `/` redirects to `/login`
- Submitting the login form saves the email to `localStorage` then navigates to `/dashboard`
- Clicking any row in the scan table goes to `/scan/:id`
- The sidebar on both the dashboard and scan detail pages has working nav buttons
- The user's email from the login form shows up in the sidebar on every page

---

## Dark mode

There's a toggle button (🌙 / ☀️) in the dashboard header. The preference is saved to `localStorage` so it persists on refresh. It also picks up your system preference on first load.

Both the dashboard and scan detail page are fully styled for both themes.

---

## Mock data

The data lives in `src/data/`. Here's roughly what's there:

- **scans.js** — 11 scans with different statuses (Completed, Scheduled, Failed), progress values, and vulnerability counts
- **findings.js** — security findings mapped by scan ID, with severity levels (Critical → Low)  
- **logs.js** — two types of logs per scan: activity logs (what the AI agent did step by step) and verification loops

The scan detail page pulls data based on the `:id` param from the URL. If a scan ID doesn't have findings or logs, it just shows empty panels — no crashes.

---

## Tech used

| Thing | Version |
|-------|---------|
| React | 19 |
| React Router | 7 |
| Vite | 7 |
| Tailwind CSS | 4 |

No component libraries. Everything is hand-built with Tailwind utility classes.

---

## A few things worth knowing

- The step tracker on the scan detail page always shows "Spidering" as active (step index 0). In a real app this would be driven by the scan's current status from the API.
- The progress circle shows 0% and "In Progress" — same deal, would need a real data source to animate.
- The bottom status bar counts (Sub-Agents, Parallel Executions, etc.) are hardcoded right now.
- Form validation on login checks name length, email format, password length (8+), and the terms checkbox.
- The `PlaceholderPage` handles routes like `/projects`, `/settings`, `/support` etc. so the app doesn't 404 when you click sidebar items that aren't built yet.

---

## What I'd add with more time

- Animated progress circle that actually reflects scan progress
- Real-time log streaming (WebSocket or polling)
- Toast notifications for actions like "Export Report"
- A proper mobile sidebar (collapse on small screens)
- Sorting and pagination on the dashboard table
- The ability to actually start a new scan from the dashboard
