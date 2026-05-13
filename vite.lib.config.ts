import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist-lib",
    emptyOutDir: true,
    lib: {
      entry: {
        index: "src/index.ts",
        mock: "src/mock.ts",
      },
      name: "AgentChatDemo",
      formats: ["es", "cjs"],
      cssFileName: "agent-chat-demo",
      fileName: (format, entryName) =>
        format === "es" ? `${entryName}.js` : `${entryName}.cjs`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react-dom/client",
        "react-router-dom",
        "lucide-react",
        "react-markdown",
        "remark-gfm",
        "rehype-highlight",
        "mermaid",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react-dom/client": "ReactDOM",
          "react-router-dom": "ReactRouterDOM",
        },
      },
    },
  },
});
