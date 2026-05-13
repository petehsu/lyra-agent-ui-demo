// ============================================================================
// Lyra Agent UI — Mock Data Provider
// ============================================================================
//
// Implements DataProviderValue against the hand-crafted fixtures.
// Handles "running" animation for the last in-progress group so the demo
// feels alive. All runtime-only state lives inside this file; delete this
// file and its siblings when you ship a real backend.

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  DataContextProvider,
  type DataProviderValue,
} from "../DataProvider";
import type {
  ChatMessage,
  DecisionQuestion,
  DiffFileEntry,
  PermissionRequest,
  SessionMeta,
  TodoItem,
  ToolCall,
} from "../../core/types";
import {
  MOCK_DECISIONS,
  MOCK_DIFF_FILES,
  MOCK_MESSAGES,
  MOCK_PERMISSIONS,
  MOCK_SESSION,
} from "./fixtures";
import { APP_CONFIG } from "../../core/config";

function now(): string {
  return new Date().toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function buildFakeReply(userText: string): { id: string; calls: ToolCall[] } {
  const base = Date.now();
  return {
    id: `m-${base}`,
    calls: [
      {
        id: `c-${base}-1`,
        kind: "thought",
        title: "Thought for 1s",
        status: "success",
        details: {
          type: "text",
          body: `Parsing request: "${userText.slice(0, 60)}${userText.length > 60 ? "…" : ""}"`,
        },
      },
      {
        id: `c-${base}-2`,
        kind: "search",
        title: "grep relevant files",
        status: "success",
        details: {
          type: "search",
          query: userText.split(" ").slice(0, 3).join(" "),
          results: [
            { file: "src/App.tsx", line: 42, text: "// Entry point" },
            { file: "src/core/types.ts", line: 14, text: "export interface ChatMessage {" },
          ],
        },
      },
      {
        id: `c-${base}-3`,
        kind: "edit",
        title: "Applied edit",
        status: "success",
        details: {
          type: "edit",
          file: "src/App.tsx",
          additions: 12,
          deletions: 3,
          hunks: [
            {
              startLine: 20,
              lines: [
                { kind: "ctx", text: "function App() {" },
                { kind: "add", text: "  // Implementation updated per request" },
                { kind: "add", text: "  return <ChatView />;" },
              ],
            },
          ],
        },
      },
    ],
  };
}

export function MockDataProvider({ children }: { children: ReactNode }) {
  const [session] = useState<SessionMeta>(MOCK_SESSION);
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES);
  const [decisions, setDecisions] = useState<DecisionQuestion[]>(MOCK_DECISIONS);
  const [permissions, setPermissions] = useState<PermissionRequest[]>(MOCK_PERMISSIONS);
  const diffFiles = useState<DiffFileEntry[]>(MOCK_DIFF_FILES)[0];

  // Aggregate all task tool calls into a flat todo list
  const todos = useMemo<TodoItem[]>(() => {
    const items: TodoItem[] = [];
    for (const m of messages) {
      for (const b of m.blocks) {
        if (b.type !== "tools") continue;
        for (const call of b.group.calls) {
          if (call.details?.type === "task") {
            for (const t of call.details.tasks) {
              items.push({
                id: `${call.id}:${t.title}`,
                title: t.title,
                status: t.status,
              });
            }
          }
        }
      }
    }
    return items;
  }, [messages]);

  // Animate running edit tools by bumping their +/- counters periodically
  const intervalRef = useRef<number>(0);
  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setMessages((prev) =>
        prev.map((m) => ({
          ...m,
          blocks: m.blocks.map((b) => {
            if (b.type !== "tools") return b;
            const running = b.group.calls.find(
              (c) => c.status === "running" && c.details?.type === "edit"
            );
            if (!running || running.details?.type !== "edit") return b;
            const add = running.details.additions + (Math.floor(Math.random() * 4) + 1);
            const del =
              running.details.deletions + (Math.random() < 0.4 ? Math.floor(Math.random() * 2) + 1 : 0);
            return {
              ...b,
              group: {
                ...b.group,
                calls: b.group.calls.map((c): ToolCall =>
                  c.id === running.id && c.details?.type === "edit"
                    ? {
                        ...c,
                        details: {
                          ...c.details,
                          additions: add,
                          deletions: del,
                        },
                      }
                    : c
                ),
              },
            };
          }),
        }))
      );
    }, APP_CONFIG.demo.editTickIntervalMs);

    return () => window.clearInterval(intervalRef.current);
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    const timeStr = now();
    const userMsg: ChatMessage = {
      id: `m-${Date.now()}-u`,
      author: "user",
      time: timeStr,
      blocks: [{ type: "text", id: `t-u-${Date.now()}`, body: text }],
    };

    const reply = buildFakeReply(text);
    const agentMsg: ChatMessage = {
      id: reply.id,
      author: "agent",
      time: timeStr,
      blocks: [
        {
          type: "tools",
          id: `b-${reply.id}`,
          group: {
            id: `g-${reply.id}`,
            status: "running",
            label: "Working",
            currentCallId: reply.calls[0].id,
            calls: [{ ...reply.calls[0], status: "running" }],
          },
        },
      ],
    };

    setMessages((prev) => [...prev, userMsg, agentMsg]);

    // Step through remaining calls
    reply.calls.forEach((call, i) => {
      window.setTimeout(() => {
        setMessages((prev) =>
          prev.map((m) => {
            if (m.id !== reply.id) return m;
            return {
              ...m,
              blocks: m.blocks.map((b) => {
                if (b.type !== "tools") return b;
                const done = reply.calls.slice(0, i).map((c) => ({
                  ...c,
                  status: "success" as const,
                }));
                const isLast = i === reply.calls.length - 1;
                return {
                  ...b,
                  group: {
                    ...b.group,
                    status: isLast ? ("done" as const) : ("running" as const),
                    label: isLast
                      ? `Worked for ${reply.calls.length}s`
                      : call.title,
                    currentCallId: isLast ? undefined : call.id,
                    calls: isLast
                      ? reply.calls.map((c) => ({ ...c, status: "success" as const }))
                      : [...done, { ...call, status: "running" as const }],
                  },
                };
              }),
            };
          })
        );
      }, APP_CONFIG.demo.toolStepIntervalMs * (i + 1));
    });

    // After all tools, append a trailing text block
    window.setTimeout(
      () => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === reply.id
              ? {
                  ...m,
                  blocks: [
                    ...m.blocks,
                    {
                      type: "text",
                      id: `t-tail-${reply.id}`,
                      body:
                        "完成。你可以继续追加需求，我会在上面的工具组里记录每一步的执行过程。",
                    },
                  ],
                }
              : m
          )
        );
      },
      APP_CONFIG.demo.toolStepIntervalMs * (reply.calls.length + 1)
    );
  }, []);

  const submitDecisions = useCallback(async () => {
    setDecisions([]);
  }, []);

  const approvePermission = useCallback(async (id: string) => {
    setPermissions((rs) => rs.filter((r) => r.id !== id));
  }, []);

  const denyPermission = useCallback(async (id: string) => {
    setPermissions((rs) => rs.filter((r) => r.id !== id));
  }, []);

  const value: DataProviderValue = {
    session,
    messages,
    todos,
    diffFiles,
    decisions,
    permissions,
    sendMessage,
    submitDecisions,
    approvePermission,
    denyPermission,
    isMock: true,
  };

  return <DataContextProvider value={value}>{children}</DataContextProvider>;
}
