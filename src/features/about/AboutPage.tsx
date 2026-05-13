// ============================================================================
// About page — project description, architecture summary
// ============================================================================

import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { APP_CONFIG } from "../../core/config";
import "./about.css";

export function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-inner">
        <Link to="/" className="about-back">
          <ArrowLeft size={14} strokeWidth={2} />
          <span>返回</span>
        </Link>

        <h1 className="about-title">{APP_CONFIG.name}</h1>
        <p className="about-tagline">一个面向编码代理（Coding Agent）的交互界面参考实现。</p>

        <section className="about-section">
          <h2>它是什么</h2>
          <p>
            {APP_CONFIG.name} 展示了一套可复用的 Agent 聊天交互模式，覆盖工具执行的
            三级折叠、流式输出、富文本渲染、决策面板、权限审批、全局 Todo 和 Diff 统计等
            常见场景。所有视觉语言与交互曲线都经过打磨，可作为你自己 Agent
            产品的设计底座。
          </p>
        </section>

        <section className="about-section">
          <h2>架构一览</h2>
          <ul className="about-list">
            <li>
              <code>core/</code> — 域类型、配置、i18n
            </li>
            <li>
              <code>data/</code> — DataProvider 接口 + Mock 实现（可删除后接真实后端）
            </li>
            <li>
              <code>features/</code> — 按功能域组织（chat / tools / pills / panels / rich-text / about）
            </li>
            <li>
              <code>styles/</code> — 设计 token + 架构守卫
            </li>
            <li>
              <code>components/</code> — 原子 UI（Icons、FileTypeIcon、TickingNumber…）
            </li>
            <li>
              <code>hooks/</code> — 可复用 hooks
            </li>
          </ul>
        </section>

        <section className="about-section">
          <h2>接入真实数据</h2>
          <p>
            删除 <code>src/data/mock/</code> 目录，实现自己的{" "}
            <code>DataProviderValue</code>，在 <code>App.tsx</code> 中替换{" "}
            <code>&lt;MockDataProvider&gt;</code> 即可。所有 UI 都通过{" "}
            <code>useData()</code> 消费数据，业务逻辑与视图完全解耦。
          </p>
        </section>

        <section className="about-section">
          <h2>设计原则</h2>
          <ul className="about-list">
            <li>无容器感：三级折叠靠对齐、不靠边框</li>
            <li>微动画优先：shimmer 扫光 / 计数跳转 / 错峰入场</li>
            <li>毛玻璃材质统一：顶栏、胶囊、面板、输入框共用一套 token</li>
            <li>主题 token 化：所有色值从 <code>tokens.css</code> 派生</li>
            <li>i18n 就绪：所有 UI 文案通过 <code>t()</code> 渲染</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
