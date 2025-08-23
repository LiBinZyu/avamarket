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
          <h2 className="text-white">Create access-protected docs</h2>
          <p className="text-white opacity-60 text-sm">
            With visitor authentication you choose who can access your docs — so you can keep
            sensitive information away from competitors and hackers. Simply set up with an auth
            integration and only authorized users can view your documentation.
          </p>

          <div className="hero-logos mb-24">
            <div className="logo-box logo-a"><img src={cozeLogo} alt="React"/></div>
            <div className="logo-box logo-b"><img src={difyLogo} alt="Dify"/></div>
            <div className="logo-box logo-c"><img src={n8nLogo} alt="n8n"/></div>
          </div>
        </article>

        {/* 右上 - 冰蓝到杏桃 + dotted 线 + 工作流 SVG */}
        <article className="bento grad-ice-to-peach span-4x3 text-[var(--primary-font-a80)] text-sm">
          <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
            <GitBranch size={18} />
            <h2>A workflow you know</h2>
          </div>
          <p className="pb-40">
            AvaMarket’s branch-based workflow will be instantly familiar if you’ve used GitHub or
            GitLab. Open a change request to edit a published page, request a review, then merge.
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
            <Wand2 size={18}/> <h2>Write better with AI</h2>
          </div>
          <p>
            GitBook AI can fix grammar and technical jargon, edit tone, translate docs, or draft pages
            for you — without leaving your tab.
          </p>
          <div className="progress-stack">
            <div className="progress-line"><i style={{width:"68%"}}/></div>
            <div className="progress-line"><i style={{width:"52%"}}/></div>
          </div>
        </article>

        {/* 右下 - 青绿到冰蓝 + CTA */}
        <article className="bento grad-teal-to-ice span-8x3 text-white opacity-80 text-sm">
          <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
            <Sparkles size={18}/> <h2>Effortless API documentation</h2>
          </div>
          <p>
            Create detailed, interactive API docs that your users and customers will love — or
            generate them automatically from API definition files.
          </p>
          <a className="cta" href="#"><ChevronRight size={16}/> FIND OUT MORE</a>
        </article>
      </div>
    </section>
  );
}
