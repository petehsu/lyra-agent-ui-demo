import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MockDataProvider } from "./data/mock/MockDataProvider";
import { AgentChatShell } from "./AgentChatApp";
import { AboutPage } from "./features/about";

export default function App() {
  return (
    <MockDataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AgentChatShell showDebugPanel />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </MockDataProvider>
  );
}
