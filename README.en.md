# Lyra Agent UI Demo

A React UI framework and demo project for Coding Agent / AI IDE experiences.

[中文](./README.md) · [Integration Guide](./INTEGRATION.md) · [Architecture](./ARCHITECTURE.md) · [API](./API.md) · [Contributing](./CONTRIBUTING.md)

![License](https://img.shields.io/badge/license-Apache--2.0-blue)
![React](https://img.shields.io/badge/React-19-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-6.x-3178c6)
![Vite](https://img.shields.io/badge/Vite-8-646cff)
![Agent UI](https://img.shields.io/badge/Agent_UI-Framework-8a63ff)

Lyra Agent UI Demo provides a reusable chat interface for agentic developer tools. It does not prescribe a backend protocol. Instead, your app normalizes backend events into `DataProviderValue` and lets the UI render messages, tool calls, approvals, decisions, todos, diffs, and rich output.

<p align="center">
  <img src="./docs/images/hero.gif" alt="Lyra Agent UI Demo animated preview" width="900" />
</p>

## What It Is For

- Chat and tool execution UI for coding agents, AI IDEs, and automation assistants.
- Displaying agent reasoning, search, file reads, edits, shell commands, web actions, and execution plans.
- Showing permission requests, decision prompts, and progress signals above the composer.
- Serving as an internal product prototype, framework starter, or public GitHub demo.

## Features

- **Three-level tool folding**: group, tool call, and detailed output / diff.
- **Backend-ready boundary**: UI consumes `DataProviderValue`; mock data is optional.
- **Rich output**: GFM Markdown, syntax highlighting, Mermaid diagrams, and streaming text.
- **Permission and decision panels**: approve / deny and multi-option prompts.
- **Floating session pills**: todo progress and diff summaries for long tasks.
- **Clean package shape**: production API at the root; demo data under `lyra-agent-ui-demo/mock`.
- **Interaction details**: hover folding affordances, shimmer, ticking numbers, scroll thresholds, and controlled selectable regions.

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

Import the production API and stylesheet:

```tsx
import "lyra-agent-ui-demo/styles.css";
import {
  AgentChatApp,
  createDataProviderValue,
  type ChatMessage,
} from "lyra-agent-ui-demo";
```

Normalize your backend state into `DataProviderValue`:

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

Demo fixtures live in a separate subpath:

```tsx
import { MockDataProvider } from "lyra-agent-ui-demo/mock";
```

Production applications should not import from `lyra-agent-ui-demo/mock`.

## Package Shape

```text
src/
├── AgentChatApp.tsx       # reusable UI shell
├── App.tsx                # local demo entry
├── index.ts               # production public API
├── mock.ts                # demo/mock subpath
├── core/                  # types, config, i18n
├── data/                  # DataProviderValue and helpers
├── features/              # chat / tools / rich-text / panels / pills
├── components/            # shared visual components
├── hooks/                 # UI hooks
└── styles/                # tokens and runtime guards
```

Library output:

- `dist-lib/index.js` / `index.cjs` / `index.d.ts`
- `dist-lib/mock.js` / `mock.cjs` / `mock.d.ts`
- `dist-lib/agent-chat-demo.css`

Generated `dist/` and `dist-lib/` output is ignored by git.

## Documentation

- [Integration Guide](./INTEGRATION.md): connect a real backend.
- [Architecture](./ARCHITECTURE.md): data flow, public API boundary, and module layout.
- [API Reference](./API.md): exported components, types, subpaths, and stability rules.
- [Contributing](./CONTRIBUTING.md): local workflow and public API rules.
- [License](./LICENSE): Apache-2.0.

## Tags

`agent-ui` · `coding-agent` · `ai-ide` · `react` · `typescript` · `vite` · `chat-ui` · `developer-tools`

## License

Apache-2.0
