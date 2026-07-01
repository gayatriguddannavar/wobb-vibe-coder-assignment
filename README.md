# Wobb Vibe Coder Intern Assignment

A polished influencer search application built with React, TypeScript, Vite, and Tailwind CSS.

Live Demo: https://gayatriguddannavar.github.io/wobb-vibe-coder-assignment/ 

## What I Changed

### 1. Bug Fixes
- **Engagement rate calculation** — was incorrectly multiplying by 10,000 instead of 100, showing values like "450%" instead of "4.5%"
- **Engagements stat** — was showing engagement rate instead of the actual engagements count
- **Removed unused `clickCount` state** — caused unnecessary re-renders on every profile click with no real purpose
- **Fixed hardcoded card width** — `w-[700px]` broke on smaller screens, replaced with `w-full max-w-2xl` for responsive layout
- **Case-insensitive search** — username search was case-sensitive, so typing "MRBEAST" returned no results
- **YouTube search crash** — some YouTube profiles had missing `fullname` field, calling `.toLowerCase()` on `undefined` caused a full page crash. Fixed with null-safe fallback `(p.fullname ?? "")`
- **Removed `react-beautiful-dnd`** — unused dependency that caused `npm install` to fail entirely due to React 19 peer dependency conflict

### 2. UI/UX Redesign
- Replaced the light theme with a dark interface, including a layered starfield background built from CSS gradients (no images or canvas)
- Cards and panels use a "mirror glass" treatment — a translucent tinted surface, a thin light border, and a subtle sheen highlight, instead of flat white boxes with hard borders
- Profile cards now sit in a responsive two-column grid instead of a single stacked column
- Primary actions use a chrome/steel gradient button; a single ion-blue accent is used sparingly for links, focus states, and the verified badge
- Numeric stats (followers, engagement rate, avg likes/comments/views) use a monospace font so they read clearly as data
- Platform filter is a segmented tab group with an active-state highlight, paired with a glass-style search input with a focus ring
- Sticky, glass-style navbar that stays visible while scrolling
- Added smooth, minimal hover/focus transitions throughout — no heavy motion
- Navbar shows "My List (X)" badge that updates in real time

### 3. Replaced React Context with Zustand
- Implemented Zustand store (`src/store/useShortlistStore.ts`) for the shortlist feature
- Used Zustand's `persist` middleware to automatically save to `localStorage`
- No Context provider needed — any component can access the store directly

### 4. Add to List Feature
- "Add to List" button works on both the search page and profile detail page
- Prevents duplicate entries by checking `user_id` before adding
- Button changes color and text dynamically (blue "Add to List" → red "Remove")
- Shortlist persists after page refresh via localStorage
- Dedicated `/shortlist` page to view and manage all added profiles
- Live count badge in the navbar

### 5. Code Quality
- Proper TypeScript types throughout — no `any` types used
- Removed dead code (unused state, unused dependency, TODO comments)
- Consistent component structure across all files
- Moved reusable UI components into `src/components/ui/` subfolder
- React Hooks rules followed correctly (no hooks after conditional returns)

### 6. Performance Optimization
- `useMemo` for `extractProfiles` — only recalculates when platform changes
- `useMemo` for `filterProfiles` — only recalculates when search query or profiles change
- `useCallback` for `handleProfileClick` — stable function reference across renders
- `React.memo` on `ProfileCard` — prevents re-rendering cards that haven't changed
- Lazy loading for `ProfileDetailPage` — code splits into separate chunk, only loads when needed

---

## Libraries Added
- **Zustand** (`zustand`) — lightweight state management with built-in persistence middleware

---

## Assumptions & Trade-offs
- Profile detail data only exists for a subset of profiles (those with JSON files in `src/assets/data/profiles/`). Profiles without a detail file show a graceful "Could not load" message — this is expected behavior from the starter project
- The shortlist is stored in `localStorage` under the key `wobb-shortlist-storage`. Clearing browser data will reset it
- `React.memo` on ProfileCard gives the most benefit when many cards are visible at once — most noticeable on slower devices
- Lazy loading ProfileDetailPage reduces initial bundle size since most users land on the search page first

---

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:5173`

## Commands

| Command | Description |
|---|---|
| `npm install` | Install project dependencies |
| `npm run dev` | Start the development server |
| `npm run build` | Build the project for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |
| `npm run deploy` | Deploy the production build to GitHub Pages |
