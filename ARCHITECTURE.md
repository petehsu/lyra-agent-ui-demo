# Architecture

Lyra Agent UI Demo is organized as a reusable UI framework plus a local demo
application.

## Runtime Shape

The UI reads all runtime state from `DataProviderValue`. Application code owns
networking, persistence, backend protocols, and event normalization.

```text
backend events
  -> application adapter
  -> DataProviderValue
  -> DataContextProvider
  -> feature components
```

Feature components do not call backend APIs directly. They invoke callbacks from
`DataProviderValue`, such as `sendMessage`, `approvePermission`, or
`submitDecisions`.

## Public API Boundary

`src/index.ts` is the production public API. It exports:

- app shells
- data provider utilities
- core domain types
- feature components
- i18n/config helpers

`src/mock.ts` is a separate demo-only public API. It exports mock fixtures and
`MockDataProvider`. Production apps should not import from the mock subpath.

## Module Map

```text
src/
├── AgentChatApp.tsx       # Reusable shell and router-aware app wrapper
├── App.tsx                # Local demo composition
├── index.ts               # Production package root
├── mock.ts                # Demo package subpath
├── core/                  # Domain models, config, i18n
├── data/                  # Context, provider contract, provider helper
├── features/chat/         # Transcript, messages, composer
├── features/tools/        # Tool groups and details
├── features/rich-text/    # Markdown, streaming text, Mermaid
├── features/panels/       # Decisions and permissions
├── features/pills/        # Todo and diff summary pills
├── features/header/       # Session header
├── components/            # Shared visual primitives
└── hooks/                 # UI hooks
```

## Package Build

`npm run build:lib` produces a source package shape:

- `dist-lib/index.js`, `index.cjs`, `index.d.ts`
- `dist-lib/mock.js`, `mock.cjs`, `mock.d.ts`
- `dist-lib/agent-chat-demo.css`

Generated output is ignored by git. Consumers should build from source or use
the packaged output created during release.

## Design Constraints

- Keep backend protocols out of visual components.
- Keep mock data behind the `lyra-agent-ui-demo/mock` subpath.
- Treat `DataProviderValue` and `core/types` as the integration contract.
- Prefer token-level styling for broad visual changes.
- Keep generated build output out of source control.
