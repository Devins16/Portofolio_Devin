"use client";

import React from "react";
import ScrollReveal from "./ScrollReveal";
import Lanyard from "./Lanyard";
import DustZone from "./DustZone";
import { DustText, DustTypewriter } from "./DustText";


const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace';

const CSS = `
.cp-scan { position: absolute; inset: 0; pointer-events: none; background: repeating-linear-gradient(0deg, rgba(255,255,255,.02) 0 1px, transparent 1px 4px); }
.cp-glow { position: absolute; left: 50%; top: 38%; width: 460px; height: 460px; transform: translate(-50%, -50%); border-radius: 50%; pointer-events: none; background: radial-gradient(circle, rgba(34,211,238,.26) 0%, rgba(255,42,109,.12) 45%, transparent 70%); filter: blur(30px); }

.cp-bracket { position: absolute; width: 22px; height: 22px; pointer-events: none; }
.cp-bracket.tl { left: 5%; top: 150px; border-top: 2px solid #22d3ee; border-left: 2px solid #22d3ee; }
.cp-bracket.br { right: 5%; bottom: 56px; border-right: 2px solid #ff2a6d; border-bottom: 2px solid #ff2a6d; }
@media (max-width: 767px) { .cp-bracket { display: none; } }

/* kolom teks: jarak atas tetap 112px untuk navbar, isinya ditengahkan di ruang di bawahnya.
   Kalau navbar kamu lebih tinggi dan masih menutupi, naikkan angka 112px. */
.cp-text { position: relative; padding-bottom: 96px; }
@media (min-width: 768px) {
  .cp-text { display: flex; flex-direction: column; justify-content: center; align-self: stretch; flex: 1 1 0%; min-width: 0; padding: 112px 0 32px 32px; }
}

.cp-tag { display: inline-block; padding: 5px 24px 5px 12px; background: #fcee0a; color: #0a0a0a; font-family: ${MONO}; font-size: 11px; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; clip-path: polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%); }
.cp-title { margin: 14px 0 0; font-size: clamp(2.5rem, min(7vw, 10.5vh), 6rem); font-weight: 900; line-height: .92; letter-spacing: -.02em; text-transform: uppercase; color: #fff; text-shadow: 0 0 28px rgba(34,211,238,.45), 0 0 2px rgba(255,255,255,.6); }
.cp-title .line { display: block; }
.cp-rule { width: 140px; height: 4px; margin-top: 18px; background: linear-gradient(90deg, #22d3ee, #ff2a6d); }

.cp-role { display: flex; align-items: baseline; gap: 10px; margin-top: 20px; font-family: ${MONO}; font-size: clamp(1.05rem, 2.2vw, 1.5rem); color: #fff; }
.cp-prompt { color: #22d3ee; text-shadow: 0 0 10px rgba(34,211,238,.7); }
.cp-sub { margin: 6px 0 0; font-family: ${MONO}; font-size: 11px; letter-spacing: .16em; text-transform: uppercase; color: rgba(255,255,255,.4); }

.cp-desc { max-width: 40rem; margin: 14px 0 0; font-size: 15px; line-height: 1.65; color: rgba(255,255,255,.62); }
.cp-cyan { color: #22d3ee; font-weight: 600; }
.cp-pink { color: #ff2a6d; font-weight: 600; }

.cp-chips { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 18px; }
.cp-chip { padding: 8px 16px 8px 12px; background: rgba(8,30,45,.6); border-left: 2px solid var(--c, #22d3ee); font-family: ${MONO}; }
.cp-chip small { display: block; font-size: 9px; letter-spacing: .2em; text-transform: uppercase; color: rgba(255,255,255,.4); }
.cp-chip b { display: block; margin-top: 3px; font-size: 11px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; color: var(--c, #22d3ee); }

.cp-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 20px; }
.cp-btn { display: inline-flex; align-items: center; gap: 10px; padding: 14px 30px 14px 22px; background: #fcee0a; color: #0a0a0a; font-family: ${MONO}; font-size: 12px; font-weight: 700; letter-spacing: .24em; text-transform: uppercase; text-decoration: none; clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px)); transition: filter .15s, transform .15s; }
.cp-btn:hover { filter: brightness(1.1); transform: translateY(-1px); }
.cp-btn.ghost { padding: 14px 24px; background: transparent; color: #22d3ee; clip-path: none; box-shadow: inset 0 0 0 1px rgba(34,211,238,.6); }
.cp-btn.ghost:hover { background: rgba(34,211,238,.08); filter: none; }
.cp-btn:focus-visible { outline: 2px solid #22d3ee; outline-offset: 3px; }

.cp-hint { margin: 14px 0 0; max-width: 40rem; font-family: ${MONO}; font-size: 10px; letter-spacing: .12em; text-transform: uppercase; line-height: 1.7; color: rgba(255,255,255,.38); }
`;

const HereSection = () => {
    return (
        <section id="home" className="relative min-h-screen">
            <style>{CSS}</style>

            <div className="cp-scan" />
            <span className="cp-bracket tl" />
            <span className="cp-bracket br" />

            <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 md:flex-row md:items-center md:px-12">
                <div className="relative z-10 h-[520px] w-full shrink-0 md:h-screen md:w-5/12">
                    <div className="cp-glow" />
                    <Lanyard />
                </div>

                <DustZone className="cp-text">
                    <ScrollReveal stagger={0.12}>
                        <span className="cp-tag">Hello! Welcome to my portfolio</span>

                        <h1 className="cp-title">
                            <span className="line">
                                <DustText text="DEVIN" />
                            </span>
                            <span className="line">
                                <DustText text="SYAFA" />
                            </span>
                        </h1>

                        <div className="cp-rule" />
                    </ScrollReveal>

                    <div className="cp-role">
                        <span className="cp-prompt">&gt;</span>
                        <DustTypewriter
                            words={["I'm an IT Graduate.", "Machine Learning Enthusiast", "Junior Software Developer", "Aspiring Data Scientist"]}
                            typeSpeed={65}
                            delay={600}
                        />
                    </div>
                    <p className="cp-sub">{"// Exploring software, data & AI"}</p>

                    <p className="cp-desc">
                        <DustText text="An IT graduate passionate about technology, " />
                        <span className="cp-pink">
                            <DustText text="software development" />
                        </span>
                        <DustText text=", and " />
                        <span className="cp-cyan">
                            <DustText text="data science" />
                        </span>
                        <DustText text=". I enjoy building projects, exploring new technologies, and continuously improving my technical skills. Currently seeking opportunities to start my career and contribute in the IT industry." />
                    </p>

                    <div className="cp-chips">
                        <div className="cp-chip" style={{ "--c": "#4ade80" } as React.CSSProperties}>
                            <small>Status</small>
                            <b>● Open to work</b>
                        </div>
                        <div className="cp-chip" style={{ "--c": "#22d3ee" } as React.CSSProperties}>
                            <small>Focus</small>
                            <b>Data sci // SWE</b>
                        </div>
                        <div className="cp-chip" style={{ "--c": "#ff2a6d" } as React.CSSProperties}>
                            <small>Role</small>
                            <b>IT graduate</b>
                        </div>
                    </div>

                    <div className="cp-actions">
                        <a className="cp-btn" href="#projects">
                            ▶ View projects
                        </a>
                        <a className="cp-btn ghost" href="#contact">
                            Contact
                        </a>
                    </div>

                    <p className="cp-hint">
                        <DustText text="Take a look at the projects I've built and the work I'm passionate about." />
                    </p>
                </DustZone>
            </div>
        </section>
    );
};

export default HereSection;