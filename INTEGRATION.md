# Integration Guide

Lyra Agent UI Demo is data-provider driven. Your application owns the backend
connection and passes normalized state into the UI through `DataProviderValue`.

## Install From This Package

```tsx
import "lyra-agent-ui-demo/styles.css";
import {
  AgentChatApp,
  createDataProviderValue,
  type ChatMessage,
  type DataProviderValue,
} from "lyra-agent-ui-demo";
```

Mock data is intentionally not exported from the package root. Demo-only helpers
live under the optional subpath:

```tsx
import { MockDataProvider, MOCK_MESSAGES } from "lyra-agent-ui-demo/mock";
```

Production apps should not import from `lyra-agent-ui-demo/mock`.

## Minimal App

```tsx
import { useMemo, useState } from "react";
import "lyra-agent-ui-demo/styles.css";
import {
  AgentChatApp,
  createDataProviderValue,
  type ChatMessage,
} from "lyra-agent-ui-demo";

export function MyAgentUi() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const data = useMemo(
    () =>
      createDataProviderValue({
        session: {
          title: "My Agent",
          project: "my-project",
          totalAdditions: 0,
          totalDeletions: 0,
        },
        messages,
        async sendMessage(text) {
          setMessages((current) => [
            ...current,
            {
              id: crypto.randomUUID(),
              author: "user",
              blocks: [{ type: "text", id: crypto.randomUUID(), body: text }],
            },
          ]);
          await sendToBackend(text);
        },
      }),
    [messages]
  );

  return <AgentChatApp data={data} />;
}
```

## Production Adapter Contract

Use `createDataProviderValue` for simple integration, or implement the interface
directly when you need full control:

```ts
interface DataProviderValue {
  session: SessionMeta;
  messages: ChatMessage[];
  todos: TodoItem[];
  diffFiles: DiffFileEntry[];
  decisions: DecisionQuestion[];
  permissions: PermissionRequest[];
  sendMessage(text: string): Promise<void>;
  submitDecisions(answers: Record<string, string>): Promise<void>;
  approvePermission(id: string): Promise<void>;
  denyPermission(id: string): Promise<void>;
  readonly isMock: boolean;
}
```

Recommended backend mapping:

- Append the user message immediately in `sendMessage`, then send the request to
  your backend.
- Convert backend message deltas into `ChatMessage.blocks`.
- Convert tool lifecycle events into `ToolGroup` objects with stable call ids.
- Convert approval requests into `permissions`.
- Convert agent questions into `decisions`.
- Keep `todos` and `diffFiles` derived from backend state.

## Rendering Without The Built-In Router

If your app already owns routing, render the shell inside your router:

```tsx
import {
  AgentChatShell,
  DataContextProvider,
  type DataProviderValue,
} from "lyra-agent-ui-demo";

export function RouteContent({ data }: { data: DataProviderValue }) {
  return (
    <DataContextProvider value={data}>
      <AgentChatShell />
    </DataContextProvider>
  );
}
```

## Removing Mock Data

The reusable framework does not depend on `src/data/mock`. To remove demo data
from an application fork:

1. Replace the local demo root in `src/App.tsx` with your own
   `DataProviderValue`.
2. Stop importing `MockDataProvider`.
3. Delete `src/data/mock` and `src/mock.ts` if you do not need the demo subpath.
4. Remove the `"./mock"` export from `package.json` if publishing a production
   only package.

No feature component should need changes when switching from mock data to a real
backend.
