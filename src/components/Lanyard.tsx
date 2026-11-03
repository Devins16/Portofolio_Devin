"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { dustStore } from "./dustStore";

type Point = { x: number; y: number; px: number; py: number };


const CARD_W = 240;
const CARD_H = 350;
const SEGMENTS = 14;
const BARS = [3, 1, 2, 1, 4, 1, 2, 3, 1, 1, 3, 2, 1, 4, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2, 4, 1, 2, 1];

const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace';

// Tema cyberpunk untuk kartu. CSS biasa (bukan Tailwind) supaya tampilannya konsisten.
const CARD_CSS = `
.cp-card-fx { position: absolute; inset: 0; filter: drop-shadow(7px 7px 0 rgba(190,24,93,.7)) drop-shadow(0 0 16px rgba(34,211,238,.3)); }
.cp-card-edge { position: absolute; inset: 0; background: linear-gradient(160deg, rgba(34,211,238,.95), rgba(34,211,238,.25) 45%, rgba(255,42,109,.85)); clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px)); }
.cp-card-body { position: absolute; inset: 1.5px; display: flex; flex-direction: column; padding: 32px 16px 16px; overflow: hidden; background: linear-gradient(180deg, #071722 0%, #070b1a 60%, #0b0716 100%); clip-path: polygon(0 0, calc(100% - 19px) 0, 100% 19px, 100% 100%, 19px 100%, 0 calc(100% - 19px)); }
.cp-card-body::after { content: ""; position: absolute; inset: 0; pointer-events: none; background: repeating-linear-gradient(0deg, rgba(255,255,255,.035) 0 1px, transparent 1px 3px); }
.cp-card-slot { position: absolute; left: 50%; top: 12px; width: 48px; height: 8px; transform: translateX(-50%); border-radius: 9999px; background: rgba(0,0,0,.75); box-shadow: inset 0 0 0 1px rgba(34,211,238,.3); }

.cp-id-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; font-family: ${MONO}; font-size: 9px; letter-spacing: .2em; }
.cp-id-row .a { display: flex; align-items: center; gap: 6px; color: #fcee0a; }
.cp-id-row .a i { display: block; width: 6px; height: 6px; background: #fcee0a; }
.cp-id-row .b { color: #4ade80; }

.cp-id-photo { position: relative; height: 184px; overflow: hidden; border: 1px solid rgba(34,211,238,.25); }
.cp-id-bg { position: absolute; bottom: 0; left: 50%; width: 64%; height: 100%; transform: translateX(-50%); background: linear-gradient(180deg, rgba(34,211,238,.6), rgba(124,58,237,.3) 55%, #0b1020); }

.cp-id-name { margin: 12px 0 0; font-size: 20px; font-weight: 900; line-height: 1; letter-spacing: .04em; text-transform: uppercase; color: #fff; }
.cp-id-role { margin: 5px 0 0; font-family: ${MONO}; font-size: 10px; letter-spacing: .16em; color: #22d3ee; }
.cp-id-bars { display: flex; align-items: stretch; justify-content: space-between; height: 28px; margin-top: auto; opacity: .7; }
.cp-id-bars span { display: block; background: #fff; }

/* nama di kartu sesekali ter-glitch (pecahan merah dan cyan) */
.cp-glitch { position: relative; }
.cp-glitch::before, .cp-glitch::after { content: attr(data-text); position: absolute; left: 0; top: 0; width: 100%; opacity: 0; }
.cp-glitch::before { color: #ff2a6d; animation: cp-g1 4.6s steps(1) infinite; }
.cp-glitch::after { color: #22d3ee; animation: cp-g2 4.6s steps(1) infinite; }
@keyframes cp-g1 {
  0%, 92%, 100% { opacity: 0; transform: none; }
  93% { opacity: .9; transform: translate(-3px, 0); clip-path: inset(10% 0 55% 0); }
  95% { opacity: .9; transform: translate(2px, 0); clip-path: inset(60% 0 8% 0); }
  97% { opacity: .9; transform: translate(-2px, 0); clip-path: inset(30% 0 40% 0); }
}
@keyframes cp-g2 {
  0%, 92%, 100% { opacity: 0; transform: none; }
  94% { opacity: .9; transform: translate(3px, 0); clip-path: inset(50% 0 15% 0); }
  96% { opacity: .9; transform: translate(-2px, 0); clip-path: inset(5% 0 70% 0); }
  98% { opacity: .9; transform: translate(2px, 0); clip-path: inset(40% 0 30% 0); }
}
@media (prefers-reduced-motion: reduce) { .cp-glitch::before, .cp-glitch::after { animation: none; } }
`;

const Lanyard = () => {
    const wrapRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const wrap = wrapRef.current!;
        const card = cardRef.current!;
        const inner = innerRef.current!;
        const svg = svgRef.current!;
        const strapPaths = Array.from(svg.querySelectorAll<SVGPathElement>("path[data-strap]"));

        const N = SEGMENTS;
        let pts: Point[] = [];
        let scale = 1;
        let anchorX = 0;
        let anchorY = 0;
        let seg = 0;
        let total = 0;
        let dragging = false;
        let dragTarget = { x: 0, y: 0 };
        let grab = { x: 0, y: 0 };
        let angle = 0;
        let raf = 0;

        const getScale = () => (window.innerWidth < 768 ? 0.78 : 1);

        const init = () => {
            const rect = wrap.getBoundingClientRect();
            const W = rect.width;
            const H = rect.height;
            scale = getScale();

            const cardW = CARD_W * scale;
            const cardH = CARD_H * scale;
            card.style.width = `${cardW}px`;
            card.style.height = `${cardH}px`;
            inner.style.transform = `scale(${scale})`;

            const visibleRope = Math.max(100, Math.min(260, H - cardH - 70));
            total = visibleRope + cardH + 30;
            seg = total / N;

            anchorX = W / 2;
            anchorY = -(cardH + 30);

            const dir = Math.random() < 0.5 ? -1 : 1;
            pts = Array.from({ length: N + 1 }, (_, i) => ({
                x: anchorX,
                y: anchorY,
                px: anchorX - dir * 1.6 * (i / N),
                py: anchorY,
            }));
            angle = 0;
        };

        const step = () => {
            const gravity = 0.55;
            const damping = 0.994;

            for (let i = 1; i <= N; i++) {
                if (i === N && dragging) continue;
                const p = pts[i];
                const vx = (p.x - p.px) * damping;
                const vy = (p.y - p.py) * damping;
                p.px = p.x;
                p.py = p.y;
                p.x += vx;
                p.y += vy + gravity;
            }

            if (dragging) {
                const e = pts[N];
                e.px = e.x;
                e.py = e.y;
                e.x += (dragTarget.x - e.x) * 0.45;
                e.y += (dragTarget.y - e.y) * 0.45;
            }

            for (let it = 0; it < 24; it++) {
                pts[0].x = anchorX;
                pts[0].y = anchorY;
                for (let i = 0; i < N; i++) {
                    const a = pts[i];
                    const b = pts[i + 1];
                    const dx = b.x - a.x;
                    const dy = b.y - a.y;
                    const d = Math.hypot(dx, dy);
                    if (d <= seg) continue;
                    const diff = (d - seg) / d;
                    const wa = i === 0 ? 0 : 1;
                    const wb = i + 1 === N ? (dragging ? 0 : 0.35) : 1;
                    const s = wa + wb;
                    if (s === 0) continue;
                    a.x += (dx * diff * wa) / s;
                    a.y += (dy * diff * wa) / s;
                    b.x -= (dx * diff * wb) / s;
                    b.y -= (dy * diff * wb) / s;
                }
            }
        };

        const render = () => {
            const e = pts[N];
            const b = pts[N - 2];
            let ang = Math.atan2(-(e.x - b.x), e.y - b.y);
            ang = Math.max(-1.2, Math.min(1.2, ang));
            angle += (ang - angle) * 0.35;

            const wr = wrap.getBoundingClientRect();
            dustStore.active = true;
            dustStore.x = wr.left + e.x;
            dustStore.y = wr.top + e.y;
            dustStore.angle = angle;
            dustStore.w = CARD_W * scale;
            dustStore.h = CARD_H * scale;

            card.style.transform = `translate3d(${e.x - (CARD_W * scale) / 2}px, ${e.y}px, 0) rotate(${angle}rad)`;

            let d = `M${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
            for (let i = 1; i < N; i++) {
                const nx = (pts[i].x + pts[i + 1].x) / 2;
                const ny = (pts[i].y + pts[i + 1].y) / 2;
                d += ` Q${pts[i].x.toFixed(1)} ${pts[i].y.toFixed(1)} ${nx.toFixed(1)} ${ny.toFixed(1)}`;
            }
            d += ` L${e.x.toFixed(1)} ${e.y.toFixed(1)}`;
            strapPaths.forEach((p) => p.setAttribute("d", d));
        };

        const toLocal = (ev: PointerEvent) => {
            const r = wrap.getBoundingClientRect();
            return { x: ev.clientX - r.left, y: ev.clientY - r.top };
        };

        const onDown = (ev: PointerEvent) => {
            dragging = true;
            card.setPointerCapture(ev.pointerId);
            const m = toLocal(ev);
            const end = pts[N];
            grab = { x: m.x - end.x, y: m.y - end.y };
            dragTarget = { x: end.x, y: end.y };
        };

        const onMove = (ev: PointerEvent) => {
            if (!dragging) return;
            const m = toLocal(ev);
            let tx = m.x - grab.x;
            let ty = m.y - grab.y;
            const dx = tx - anchorX;
            const dy = ty - anchorY;
            const dist = Math.hypot(dx, dy);
            const max = total - 2;
            if (dist > max) {
                tx = anchorX + (dx / dist) * max;
                ty = anchorY + (dy / dist) * max;
            }
            dragTarget = { x: tx, y: ty };
        };

        const onUp = (ev: PointerEvent) => {
            dragging = false;
            try {
                card.releasePointerCapture(ev.pointerId);
            } catch {
            }
        };

        const onResize = () => {
            if (getScale() !== scale) {
                init();
            } else {
                anchorX = wrap.getBoundingClientRect().width / 2;
            }
        };

        let last = performance.now();
        let acc = 0;
        const FRAME = 1000 / 60;
        const loop = (now: number) => {
            acc += Math.min(now - last, 50);
            last = now;
            while (acc >= FRAME) {
                step();
                acc -= FRAME;
            }
            render();
            raf = requestAnimationFrame(loop);
        };

        init();
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            for (let i = 0; i < 900; i++) step();
        }
        render();
        raf = requestAnimationFrame(loop);

        card.addEventListener("pointerdown", onDown);
        card.addEventListener("pointermove", onMove);
        card.addEventListener("pointerup", onUp);
        card.addEventListener("pointercancel", onUp);
        window.addEventListener("resize", onResize);

        return () => {
            cancelAnimationFrame(raf);
            dustStore.active = false;
            card.removeEventListener("pointerdown", onDown);
            card.removeEventListener("pointermove", onMove);
            card.removeEventListener("pointerup", onUp);
            card.removeEventListener("pointercancel", onUp);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <div
            ref={wrapRef}
            className="pointer-events-none absolute inset-0"
            style={{ clipPath: "inset(0 -50vw -50vh -50vw)" }}
        >
            <style>{CARD_CSS}</style>

            {/* tali: kuning neon bergaya cyberpunk */}
            <svg
                ref={svgRef}
                className="absolute inset-0 h-full w-full overflow-visible"
                style={{ filter: "drop-shadow(0 0 6px rgba(252,238,10,0.4))" }}
                aria-hidden="true"
            >
                <path data-strap fill="none" stroke="#3b3600" strokeWidth={18} />
                <path data-strap fill="none" stroke="#fcee0a" strokeWidth={14} />
                <path data-strap fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth={1.5} strokeDasharray="5 5" />
            </svg>

            <div
                ref={cardRef}
                role="img"
                aria-label="ID card Devin Syafa"
                className="pointer-events-auto absolute left-0 top-0 cursor-grab touch-none select-none active:cursor-grabbing"
                style={{ transform: "translate3d(0,-1000px,0)", transformOrigin: "50% 0", willChange: "transform" }}
            >
                <div ref={innerRef} className="relative" style={{ width: CARD_W, height: CARD_H, transformOrigin: "top left" }}>
                    <div className="absolute left-1/2 top-[-30px] z-10 h-5 w-3.5 -translate-x-1/2 rounded-full border-[3px] border-zinc-300" />
                    <div className="absolute left-1/2 top-[-22px] z-20 h-9 w-6 -translate-x-1/2 rounded-[3px] bg-linear-to-b from-zinc-100 via-zinc-300 to-zinc-500 shadow-md" />

                    <div className="cp-card-fx">
                        <div className="cp-card-edge" />
                        <div className="cp-card-body">
                            <div className="cp-card-slot" />

                            <div className="cp-id-row">
                                <span className="a">
                                    <i />
                                    OPERATOR_ID
                                </span>
                                <span className="b">● ONLINE</span>
                            </div>

                            <div className="cp-id-photo">
                                <div className="cp-id-bg" />
                                <Image
                                    src="/images/Prof.png"
                                    alt="Devin Syafa"
                                    fill
                                    sizes="240px"
                                    priority
                                    draggable={false}
                                    className=" object-contain object-bottom"
                                />
                            </div>

                            <p className="cp-id-name cp-glitch" data-text="Devin Syafa">
                                Devin Syafa
                            </p>
                            <p className="cp-id-role">IT GRADUATE // DATA &amp; AI</p>

                            <div className="cp-id-bars">
                                {BARS.map((w, i) => (
                                    <span key={i} style={{ width: w * 1.5 }} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/40">
                Drag the card pwease :3
            </p>
        </div>
    );
};

export default Lanyard;