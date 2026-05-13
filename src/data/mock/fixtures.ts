// ============================================================================
// Lyra Agent UI — Mock Data Fixtures
// ============================================================================
//
// Hand-crafted demo data simulating a session where the user asks Lyra to
// build its own chat UI (this project). All fixtures are plain values;
// interactive behavior (ticking, state transitions) is driven by the
// MockDataProvider.
//
// To ship without mock data: delete `src/data/mock/` entirely and point your
// <ApiDataProvider> to this directory's former place.

import type {
  ChatMessage,
  DecisionQuestion,
  DiffFileEntry,
  PermissionRequest,
  SessionMeta,
} from "../../core/types";

export const MOCK_SESSION: SessionMeta = {
  title: "Lyra Agent UI 演示界面开发",
  project: "lyra-agent-ui",
  totalAdditions: 2184,
  totalDeletions: 317,
};

export const MOCK_MESSAGES: ChatMessage[] = [
  {
    id: "m1",
    author: "user",
    time: "13:10",
    blocks: [
      {
        type: "text",
        id: "m1-t1",
        body: "我想做一个 Agent 交互的 Demo 界面，TS + React，聊天界面要能显示 Agent 说的话以及工具执行过程，需要三级折叠，一级只显示当前状态，点击展开能看到所有工具，某些工具（比如文件编辑）还需要再点一次展开看具体改动。",
      },
    ],
  },
  {
    id: "m2",
    author: "agent",
    time: "13:11",
    blocks: [
      {
        type: "text",
        id: "m2-t1",
        body:
          "明白，我来按 Devin / OpenCode 这类 Agent IDE 的交互语言做一版。\n\n" +
          "**设计要点**：\n" +
          "- 一级：工具组行，显示当前状态 + 耗时或进度\n" +
          "- 二级：展开后的工具调用列表\n" +
          "- 三级：每条工具的详情卡片（diff、shell 输出、搜索结果等）\n" +
          "- 三层全部继承父级文字基线对齐，无容器感\n\n" +
          "我先起一个 Vite + React + TS 项目做骨架。",
      },
      {
        type: "tools",
        id: "m2-g1",
        group: {
          id: "g1",
          status: "done",
          label: "Worked for 1m 24s",
          hint: "+512",
          calls: [
            {
              id: "c1",
              kind: "task",
              title: "Created 8 tasks",
              status: "success",
              details: {
                type: "task",
                tasks: [
                  { title: "起 Vite + React + TS 项目骨架", status: "done" },
                  { title: "定义 ToolCall / ToolGroup / ChatMessage 核心类型", status: "done" },
                  { title: "实现三级折叠组件（Level 1/2/3）", status: "done" },
                  { title: "设计 token 化：颜色、字号、圆角、阴影", status: "done" },
                  { title: "毛玻璃顶栏 + 悬浮输入框", status: "done" },
                  { title: "富文本渲染：markdown + mermaid + 容错", status: "done" },
                  { title: "流式输出 + 文字辉光扫描动画", status: "done" },
                  { title: "接入审批面板、提问面板、TodoBar、DiffStats", status: "done" },
                ],
              },
            },
            {
              id: "c2",
              kind: "shell",
              title: "npm create vite@latest lyra-agent-ui -- --template react-ts",
              status: "success",
              details: {
                type: "shell",
                command: "npm create vite@latest lyra-agent-ui -- --template react-ts",
                exitCode: 0,
                output:
                  "Scaffolding project in /Users/dev/lyra-agent-ui...\n" +
                  "Installing dependencies with npm... done (153 packages)\n" +
                  "Dev server ready at http://localhost:5173/",
              },
            },
            {
              id: "c3",
              kind: "create",
              title: "Created core/types.ts",
              status: "success",
              details: {
                type: "edit",
                file: "src/core/types.ts",
                additions: 86,
                deletions: 0,
                hunks: [
                  {
                    startLine: 1,
                    lines: [
                      { kind: "add", text: "export type ToolStatus = \"running\" | \"success\" | \"error\";" },
                      { kind: "add", text: "" },
                      { kind: "add", text: "export interface ToolCall {" },
                      { kind: "add", text: "  id: string;" },
                      { kind: "add", text: "  kind: ToolKind;" },
                      { kind: "add", text: "  title: string;" },
                      { kind: "add", text: "  status: ToolStatus;" },
                      { kind: "add", text: "  details?: ToolDetails;" },
                      { kind: "add", text: "}" },
                    ],
                  },
                ],
              },
            },
          ],
        },
      },
      {
        type: "text",
        id: "m2-t2",
        body:
          "骨架起好了，核心类型也落地。接下来做三级折叠的视觉层次：每级的 icon 都要左对齐上一级文字的基线。",
      },
    ],
  },
  {
    id: "m3",
    author: "user",
    time: "13:22",
    blocks: [
      {
        type: "text",
        id: "m3-t1",
        body: "把工具执行的颜色区分再弱化一下，不要花里胡哨。只用形状和亮度区分状态。",
      },
    ],
  },
  {
    id: "m4",
    author: "agent",
    time: "13:22",
    blocks: [
      {
        type: "text",
        id: "m4-t1",
        body:
          "收到，我把配色收到三档灰 + 极细节强调色：\n\n" +
          "| 状态 | 颜色 | 标识 |\n" +
          "| --- | --- | --- |\n" +
          "| 成功 | `--color-text-dim` | 继承普通文字 |\n" +
          "| 执行中 | `--color-text` + 辉光扫描 | shimmer |\n" +
          "| 错误 | `--color-err` | 仅图标变红 |\n\n" +
          "```mermaid\nflowchart LR\n  A[Tool Start] --> B{Status}\n  B -->|success| C[dim text]\n  B -->|running| D[shimmer]\n  B -->|error| E[red icon]\n```",
      },
      {
        type: "tools",
        id: "m4-g1",
        group: {
          id: "g4",
          status: "done",
          label: "Worked for 38s",
          hint: "+147 -89",
          calls: [
            {
              id: "c4",
              kind: "edit",
              title: "styles/tokens.css",
              status: "success",
              details: {
                type: "edit",
                file: "src/styles/tokens.css",
                additions: 92,
                deletions: 58,
                hunks: [
                  {
                    startLine: 12,
                    lines: [
                      { kind: "ctx", text: ":root {" },
                      { kind: "del", text: "  --status-ok: #4eff6b;" },
                      { kind: "del", text: "  --status-err: #ff3b3b;" },
                      { kind: "del", text: "  --status-run: #ffc83b;" },
                      { kind: "add", text: "  --color-ok: #63d26b;" },
                      { kind: "add", text: "  --color-err: #ff6b6b;" },
                      { kind: "add", text: "  --color-warn: #f0b752;" },
                    ],
                  },
                ],
              },
            },
            {
              id: "c5",
              kind: "edit",
              title: "components/ToolGroup.tsx",
              status: "success",
              details: {
                type: "edit",
                file: "src/features/tools/ToolGroup.tsx",
                additions: 55,
                deletions: 31,
                hunks: [
                  {
                    startLine: 48,
                    lines: [
                      { kind: "del", text: "  return <Dot color={statusColor} />;" },
                      { kind: "add", text: "  if (status === \"running\") return <span className=\"shimmer\">{title}</span>;" },
                      { kind: "add", text: "  return <span className={`status-${status}`}>{title}</span>;" },
                    ],
                  },
                ],
              },
            },
            {
              id: "c6",
              kind: "thought",
              title: "Thought for 2s",
              status: "success",
              details: {
                type: "text",
                body: "对齐基线调整后，diff 行号列也要跟着收窄，不然视觉密度不一致。",
              },
            },
            {
              id: "c6b",
              kind: "thought",
              title: `Asked: 表格窄列是否也要去色`,
              status: "success",
              details: {
                type: "ask",
                question: "markdown 表格内的 +/- 统计数字要不要也用去色处理，只保留灰度？",
                answer: "不用，diff 的加减色是语义色，保留。",
              },
            },
          ],
        },
      },
      {
        type: "text",
        id: "m4-t2",
        body: "改完了。现在只有 diff 加减行、错误状态、执行中扫光这三个地方有色彩，其它全是灰度层次。",
      },
    ],
  },
  {
    id: "m5",
    author: "user",
    time: "13:45",
    blocks: [
      {
        type: "text",
        id: "m5-t1",
        body: "顶栏和输入框统一成毛玻璃材质，顶栏下方加一个 Todo 胶囊和 Diff 胶囊，只有其中一个时居中显示，两个都有时分左右。",
      },
    ],
  },
  {
    id: "m6",
    author: "agent",
    time: "13:46",
    blocks: [
      {
        type: "text",
        id: "m6-t1",
        body:
          "正在做。**注意点**：\n" +
          "- 两个 pill 都是 `position: fixed`，不影响消息流\n" +
          "- flex 容器需要 `align-items: flex-start`，否则一个展开会把另一个拉高\n" +
          "- pill 内部展开用 grid-template-rows: 0fr → 1fr 做平滑高度动画",
      },
      {
        type: "tools",
        id: "m6-g1",
        group: {
          id: "g6",
          status: "running",
          label: "正在编辑 pills/DiffStats.tsx",
          currentCallId: "c9",
          calls: [
            {
              id: "c7",
              kind: "read",
              title: "Read TodoBar.tsx:1-82",
              status: "success",
              details: {
                type: "read",
                file: "src/features/pills/TodoBar.tsx",
                range: "1-82",
                preview:
                  "export function TodoBar({ tasks }: { tasks: TodoItem[] }) {\n" +
                  "  const [open, setOpen] = useState(false);\n" +
                  "  ...",
              },
            },
            {
              id: "c8",
              kind: "search",
              title: "grep 'align-items: stretch'",
              status: "success",
              details: {
                type: "search",
                query: "align-items: stretch",
                results: [
                  { file: "src/styles/layout.css", line: 142, text: ".pill-rail { align-items: stretch; }" },
                ],
              },
            },
            {
              id: "c9",
              kind: "edit",
              title: "正在编辑 pills/DiffStats.tsx",
              status: "running",
              details: {
                type: "edit",
                file: "src/features/pills/DiffStats.tsx",
                additions: 0,
                deletions: 0,
                hunks: [],
              },
            },
          ],
        },
      },
    ],
  },
];

export const MOCK_DECISIONS: DecisionQuestion[] = [
  {
    id: "dq1",
    question: "检测到项目同时有 ESLint 和 Biome 配置，保留哪个？",
    options: ["保留 ESLint", "迁移到 Biome", "两者共存"],
  },
  {
    id: "dq2",
    question: "富文本渲染遇到未闭合的代码块，如何处理？",
    options: ["自动补全反引号", "原样显示", "截断到上一个有效边界"],
  },
  {
    id: "dq3",
    question: "测试覆盖率当前 43%，目标设为多少？",
    options: ["60%", "80%", "90%+"],
  },
];

export const MOCK_PERMISSIONS: PermissionRequest[] = [
  {
    id: "perm1",
    type: "shell",
    title: "执行 Shell 命令",
    detail: "npm install lucide-react react-markdown remark-gfm",
  },
];

/**
 * Hand-picked "files modified in this work session" — six representative
 * files from the Lyra Agent UI codebase itself.
 */
export const MOCK_DIFF_FILES: DiffFileEntry[] = [
  { file: "src/features/tools/ToolGroup.tsx", additions: 124, deletions: 18 },
  { file: "src/features/panels/DecisionPanel.tsx", additions: 96, deletions: 22 },
  { file: "src/features/pills/TodoBar.tsx", additions: 78, deletions: 14 },
  { file: "src/styles/tokens.css", additions: 92, deletions: 58 },
  { file: "src/core/types.ts", additions: 86, deletions: 0 },
  { file: "src/App.tsx", additions: 64, deletions: 23 },
];
