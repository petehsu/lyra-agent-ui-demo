# Contributing

## Setup

```bash
npm install
npm run dev
```

## Required Checks

Run these before committing:

```bash
npm run lint
npm run build
npm run build:lib
npm pack --dry-run
```

## Public API Rules

- Export production framework APIs from `src/index.ts`.
- Export demo-only fixtures from `src/mock.ts`.
- Do not add mock data to the package root.
- Avoid deep imports in documentation and examples.
- Update `API.md` when public exports change.

## Data Boundary Rules

- UI components should consume state through `useData`.
- Backend protocols should be normalized outside feature components.
- Keep `DataProviderValue` and `core/types` as the integration boundary.
- Do not add direct network calls to visual components.

## Styling Rules

- Prefer design tokens in `src/styles/tokens.css`.
- Keep component styles scoped by existing class names.
- Do not commit generated `dist/` or `dist-lib/` output.

## Documentation Rules

- Keep `README.md` focused on public project orientation.
- Put backend adapter details in `INTEGRATION.md`.
- Put package and module decisions in `ARCHITECTURE.md`.
- Put exported API details in `API.md`.
