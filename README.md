# Pokemon Explorer

React + TypeScript + Vite app for browsing Pokemon with a simple login and favourites stored in localStorage. Uses pokenode-ts to pull Pokemon data from PokeAPI and React Query for fetching.

## Prerequisites
- Node 18+ (Node 20 recommended)
- npm

## Scripts
- `npm install` — install dependencies
- `npm run dev` — start Vite dev server
- `npm run build` — type-check and build for production
- `npm run preview` — preview the production build
- `npm run test` — run Vitest tests
- `npm run test:watch` — run Vitest in watch mode

## Running locally
1) Install deps: `npm install`
2) Start dev server: `npm run dev`
3) Open the printed localhost URL (default http://localhost:5173)
4) Any username/password works for login; favourites are stored in `localStorage`

## Testing
Run `npm run test` to execute unit tests (Vitest + React Testing Library).

## Project structure
- `src/api/` — PokeAPI wrapper, auth/favourites mock APIs
- `src/context/` — auth and favourites providers
- `src/pages/` — routed pages (login, home, detail)
- `src/components/` — shared UI (cards, etc.)
- `src/styles/` — global styles
- `src/tests/` — test setup

## Notes
- Data fetching via `@tanstack/react-query`
- Pokemon data (names, images, types, stats) from `pokenode-ts`/PokeAPI
- Favourites and auth user persisted to `localStorage`
