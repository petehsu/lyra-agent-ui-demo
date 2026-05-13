# API Reference

## Package Subpaths

```tsx
import "lyra-agent-ui-demo/styles.css";
import { AgentChatApp } from "lyra-agent-ui-demo";
import { MockDataProvider } from "lyra-agent-ui-demo/mock";
```

- `lyra-agent-ui-demo`: production framework API.
- `lyra-agent-ui-demo/mock`: demo-only fixtures and mock provider.
- `lyra-agent-ui-demo/styles.css`: compiled framework styles.

## App Shells

- `AgentChatApp`: router-aware wrapper that accepts a `DataProviderValue`.
- `AgentChatShell`: shell-only component for apps that already provide routing
  and data context.

## Data APIs

- `DataContextProvider`: React context provider for `DataProviderValue`.
- `useData`: hook used by feature components.
- `createDataProviderValue`: helper for assembling a complete provider value
  with safe defaults.
- `DataProviderValue`: integration contract for application-owned state and
  actions.

## Core Types

The package root re-exports all core domain types, including:

- `ChatMessage`
- `MessageBlock`
- `ToolGroup`
- `ToolCall`
- `ToolDetails`
- `TodoItem`
- `DiffFileEntry`
- `DecisionQuestion`
- `PermissionRequest`
- `SessionMeta`

These types are the stable boundary between a backend adapter and the UI.

## Feature Components

The root package exports feature components for advanced composition:

- Chat: `ChatView`, `Composer`, `Message`
- Tools: `ToolGroupBlock`, `ToolDetails`
- Rich text: `RichText`, `StreamingText`, `MermaidBlock`
- Panels: `DecisionPanel`, `PermissionPanel`
- Pills: `TodoBar`, `DiffStats`, `PillsRail`
- Header: `Header`

Prefer `AgentChatApp` or `AgentChatShell` for normal integrations. Use feature
components only when building a custom shell.

## Mock API

The `lyra-agent-ui-demo/mock` subpath exports:

- `MockDataProvider`
- `MOCK_SESSION`
- `MOCK_MESSAGES`
- `MOCK_DECISIONS`
- `MOCK_PERMISSIONS`
- `MOCK_DIFF_FILES`

Do not import mock exports from production code.

## Stability Rules

- Import framework APIs from the package root.
- Avoid deep imports from internal source paths.
- Treat mock exports as demo-only.
- Run `npm run lint`, `npm run build`, and `npm run build:lib` after changing
  public exports.
