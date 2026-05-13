# Lyra Agent UI Demo

A React 19 + TypeScript UI framework and demo shell for coding-agent chat
experiences. It focuses on agent transcripts, tool execution timelines,
approval prompts, decision prompts, rich Markdown, Mermaid diagrams, todo
progress, and diff summaries.

> Screenshot placeholder: add a first-run screenshot of the chat UI after the
> public repository is created.

## Highlights

- Agent chat layout with user and assistant messages.
- Three-level tool folding: group, tool call, and detailed output.
- Rich text rendering with GFM Markdown, syntax highlighting, and Mermaid.
- Permission and decision panels above the composer.
- Floating todo and diff summary pills.
- Production-oriented data boundary through `DataProviderValue`.
- Clean package API: framework exports at the root, demo fixtures under
  `lyra-agent-ui-demo/mock`.

## Quick Start

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run lint
npm run build
npm run build:lib
npm pack --dry-run
```

## Use As A Framework

Import the framework API and CSS from the package root:

```tsx
import "lyra-agent-ui-demo/styles.css";
import {
  AgentChatApp,
  createDataProviderValue,
  type ChatMessage,
} from "lyra-agent-ui-demo";
```

Build a `DataProviderValue` from your application state and pass it to the app:

```tsx
const data = createDataProviderValue({
  session: {
    title: "My Agent",
    project: "my-project",
    totalAdditions: 0,
    totalDeletions: 0,
  },
  messages,
  async sendMessage(text) {
    await sendToBackend(text);
  },
});

return <AgentChatApp data={data} />;
```

Demo data is optional and isolated:

```tsx
import { MockDataProvider } from "lyra-agent-ui-demo/mock";
```

Production applications should not import from `lyra-agent-ui-demo/mock`.

## Documentation

- [Integration Guide](./INTEGRATION.md): connect a real backend.
- [Architecture](./ARCHITECTURE.md): data flow, package boundary, and module map.
- [API Reference](./API.md): public exports and package subpaths.
- [Contributing](./CONTRIBUTING.md): local workflow and public API rules.
- [License](./LICENSE): Apache-2.0.

## Project Layout

```text
src/
├── AgentChatApp.tsx       # Reusable app shell
├── App.tsx                # Local demo entry
├── index.ts               # Production public API
├── mock.ts                # Demo-only public API subpath
├── core/                  # Domain types, config, i18n
├── data/                  # DataProviderValue and helpers
├── features/              # Chat, tools, rich text, panels, pills, header
├── components/            # Shared visual primitives
├── hooks/                 # UI hooks
└── styles/                # Tokens and runtime guards
```

## Package Shape

The library build emits:

- `dist-lib/index.js` / `index.cjs` / `index.d.ts`
- `dist-lib/mock.js` / `mock.cjs` / `mock.d.ts`
- `dist-lib/agent-chat-demo.css`

Generated `dist/` and `dist-lib/` output is ignored by git and should be
recreated with `npm run build` or `npm run build:lib`.

## License

Apache-2.0
