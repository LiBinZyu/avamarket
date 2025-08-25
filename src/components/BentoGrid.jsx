import React from "react";
import { Lock, GitBranch, GitMerge, Wand2, Sparkles, FileCode2, ChevronRight } from "lucide-react";
import "./bentogrid.css";

import difyLogo from "../assets/dify.ai.svg";
import n8nLogo from "../assets/n8n.io.svg";
import cozeLogo from "../assets/coze.svg";

export default function HomeBento() {
  return (
    <section className="page-container">
      <div className="bento-grid">
        {/* 左上大卡（深色背景图 + 3个 logo） */}
        <article className="bento bg-bento-hero span-4x6">
          <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
            <div className="icon-pill"><Lock size={16}/> Auth</div>
          </div>
          <h2 className="text-white">Seamless Cross-Platform Collaboration</h2>
          <p className="text-white opacity-60 text-sm">
          Seamlessly integrate with n8n, Dify, coze and more. One platform, endless possibilities—a unified system for all your workflow needs.
          </p>

          {/* <div className="hero-logos mb-24">
            <div className="logo-box logo-a"><img src={cozeLogo} alt="React"/></div>
            <div className="logo-box logo-b"><img src={difyLogo} alt="Dify"/></div>
            <div className="logo-box logo-c"><img src={n8nLogo} alt="n8n"/></div>
          </div> */}
        </article>

        {/* 右上 - 冰蓝到杏桃 + dotted 线 + 工作流 SVG */}
        <article className="bento grad-ice-to-peach span-4x3 text-[var(--primary-font-a80)] text-sm">
          <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
            <GitBranch size={18} />
            <h2>Preview and Download Workflows</h2>
          </div>
          <p className="pb-40">
          See your workflows come to life with interactive previews. Download nodes instantly for use in your favorite platforms.
          </p>

          {/* dotted 框 + main 标签 */}
          {/* <div className="dotted-box">
            <span className="roboto-mono-regular">MAIN</span>
            <GitMerge size={16}/>
          </div> */}

          {/* 流程线（SVG） */}
          {/* <div className="flowline">
            <svg width="100%" height="54" viewBox="0 0 600 54" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 28 H120 C160 28 160 6 200 6 H420 C460 6 460 28 500 28 H600"
                    fill="none" stroke="rgba(17,20,45,.55)" strokeWidth="2"
                    strokeDasharray="4 6" />
              { [120, 200, 260, 320, 380, 460, 520].map((x,i)=>(
                <g key={i} transform={`translate(${x},28)`}>
                  <circle r="8" fill="rgba(17,20,45,.85)"/>
                  <circle r="4" fill="#FFFFFF" />
                </g>
              )) }
            </svg>
          </div> */}
        </article>

        {/* 右上 - 柠黄到冰蓝 + 进度条 */}
          <article className="bento grad-sun-to-sky span-4x3 text-[var(--primary-font-a80)] text-sm">
          <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
            <Wand2 size={18}/> <h2>Welcome to the AI Market</h2>
          </div>
          <p>
          Discover AI workflows, platform integrations, and MCP services—all in one place. Your gateway to smarter automation and productivity.
          </p>
        </article>

        {/* 右下 - 青绿到冰蓝 + CTA */}
        <article className="bento grad-teal-to-ice span-8x3 text-[var(--primary-font-a80)] text-sm">
          <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
            <Sparkles size={18}/> <h2>Explore Our Categories</h2>
          </div>
          <p>
          Templates for AI workflows, platform integrations, and MCP services—explore them all to boost your productivity.
          </p>
        </article>
      </div>
    </section>
  );
}
