import { useEffect, useState, type ReactNode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./styles/tokens.css";

import { APP_CONFIG } from "./core/config";
import { assertUsingRealData } from "./styles/guards";
import {
  DataContextProvider,
  useData,
  type DataProviderValue,
} from "./data/DataProvider";
import { Header } from "./features/header";
import { PillsRail } from "./features/pills";
import { ChatView } from "./features/chat";
import { DebugPanel } from "./features/debug";
import { AboutPage } from "./features/about";

export interface AgentChatShellProps {
  showDebugPanel?: boolean;
}

export function AgentChatShell({ showDebugPanel = false }: AgentChatShellProps) {
  const [showDecisions, setShowDecisions] = useState(true);
  const [showPermission, setShowPermission] = useState(true);
  const { isMock } = useData();

  useEffect(() => {
    assertUsingRealData(isMock);
    document.title = APP_CONFIG.name;
  }, [isMock]);

  return (
    <div className="app">
      <Header />
      <PillsRail />
      <ChatView showDecisions={showDecisions} showPermission={showPermission} />
      {showDebugPanel && (
        <DebugPanel
          decisionsVisible={showDecisions}
          permissionVisible={showPermission}
          onToggleDecisions={() => setShowDecisions((v) => !v)}
          onTogglePermission={() => setShowPermission((v) => !v)}
        />
      )}
    </div>
  );
}

export interface AgentChatAppProps {
  data: DataProviderValue;
  showDebugPanel?: boolean;
  withRouter?: boolean;
  children?: ReactNode;
}

export function AgentChatApp({
  data,
  showDebugPanel = false,
  withRouter = true,
  children,
}: AgentChatAppProps) {
  const content = (
    <Routes>
      <Route path="/" element={<AgentChatShell showDebugPanel={showDebugPanel} />} />
      <Route path="/about" element={<AboutPage />} />
      {children}
    </Routes>
  );

  return (
    <DataContextProvider value={data}>
      {withRouter ? <BrowserRouter>{content}</BrowserRouter> : content}
    </DataContextProvider>
  );
}
