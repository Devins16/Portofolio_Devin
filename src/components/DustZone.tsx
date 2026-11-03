"use client";

import React, { useEffect, useRef } from "react";
import { dustStore } from "./dustStore";

type Particle = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    age: number;
    life: number; // dalam satuan frame (60fps)
    kind: 0 | 1 | 2; // 0 = piksel, 1 = irisan horizontal (RGB split), 2 = karakter data
    w: number;
    h: number;
    color: string;
    ch: string;
    snap: number; // hitung mundur sampai "loncatan" glitch berikutnya
    show: boolean; // partikel berkedip
};

const MAX_PARTICLES = 2200; // batas total partikel di layar
const PER_CHAR = 6; // jumlah partikel per huruf yang hancur
const MARGIN = 4; // huruf mulai hancur sedikit sebelum benar-benar tersentuh (px)

// Warna cyberpunk: cyan, pink, kuning, putih
const CYAN = "#22d3ee";
const PINK = "#ff2a6d";
const YELLOW = "#fcee0a";
const PALETTE = [CYAN, CYAN, PINK, PINK, YELLOW, "#ffffff"];
const GLYPHS = "01<>/\\|#$%&@=+*";
const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace';

const pick = <T,>(arr: ArrayLike<T>) => arr[(Math.random() * arr.length) | 0];

const DustZone = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const zoneRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // hormati pengguna yang mematikan animasi
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const zone = zoneRef.current!;

        // kanvas partikel menempel di <body> supaya tidak terpengaruh transform elemen induk
        const canvas = document.createElement("canvas");
        canvas.setAttribute("aria-hidden", "true");
        canvas.style.cssText =
            "position:fixed;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:40";
        document.body.appendChild(canvas);
        const ctx = canvas.getContext("2d")!;

        let vw = 0;
        let vh = 0;
        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const r = canvas.getBoundingClientRect();
            vw = r.width;
            vh = r.height;
            canvas.width = Math.round(vw * dpr);
            canvas.height = Math.round(vh * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();
        window.addEventListener("resize", resize);

        let chars: HTMLElement[] = [];
        let fades: HTMLElement[] = [];
        let dirty = true;
        const mo = new MutationObserver(() => {
            dirty = true; // typewriter menambah/mengurangi huruf
        });
        mo.observe(zone, { childList: true, subtree: true });

        const dusted = new Set<HTMLElement>();
        const particles: Particle[] = [];
        let hadParticles = false;
        let fadeActive = false;

        let raf = 0;
        let last = performance.now();

        const frame = (now: number) => {
            raf = requestAnimationFrame(frame);
            const dt = Math.min((now - last) / 16.667, 3);
            last = now;

            if (dirty) {
                chars = Array.from(zone.querySelectorAll<HTMLElement>("[data-dust]"));
                fades = Array.from(zone.querySelectorAll<HTMLElement>("[data-dust-fade]"));
                dirty = false;
            }

            const { active, x, y, angle, w, h } = dustStore;
            const c = Math.cos(angle);
            const s = Math.sin(angle);

            // apakah titik (px, py) ada di dalam kartu yang miring?
            const inside = (px: number, py: number, m: number) => {
                const dx = px - x;
                const dy = py - y;
                const u = dx * c + dy * s;
                const v = -dx * s + dy * c;
                return Math.abs(u) <= w / 2 + m && v >= -m && v <= h + m;
            };

            // tahap kasar: kalau kartu jauh dari area teks, tidak perlu cek huruf satu per satu
            let near = false;
            if (active && w > 0) {
                const zr = zone.getBoundingClientRect();
                let minX = Infinity;
                let maxX = -Infinity;
                let minY = Infinity;
                let maxY = -Infinity;
                for (const u of [-w / 2, w / 2]) {
                    for (const v of [0, h]) {
                        const px = x + u * c - v * s;
                        const py = y + u * s + v * c;
                        minX = Math.min(minX, px);
                        maxX = Math.max(maxX, px);
                        minY = Math.min(minY, py);
                        maxY = Math.max(maxY, py);
                    }
                }
                near =
                    maxX >= zr.left - 10 && minX <= zr.right + 10 && maxY >= zr.top - 10 && minY <= zr.bottom + 10;
            }

            if (near || dusted.size > 0 || fadeActive) {
                // pusat kartu, dipakai sebagai arah semburan partikel
                const ccx = x - (h / 2) * s;
                const ccy = y + (h / 2) * c;

                type Hit = {
                    el: HTMLElement;
                    inner: HTMLElement;
                    r: DOMRect;
                    cx: number;
                    cy: number;
                };
                const toDust: Hit[] = [];
                const toRestore: HTMLElement[] = [];

                // 1) baca dulu semua posisi (tanpa menulis ke DOM agar tidak memaksa layout berulang)
                for (const el of chars) {
                    const r = el.getBoundingClientRect();
                    if (r.width === 0) continue;
                    const cx = r.left + r.width / 2;
                    const cy = r.top + r.height / 2;
                    const hit = near && inside(cx, cy, MARGIN);
                    const was = dusted.has(el);
                    if (hit && !was) {
                        const inner = el.firstElementChild as HTMLElement;
                        toDust.push({ el, inner, r, cx, cy });
                    } else if (!hit && was) {
                        toRestore.push(el);
                    }
                }

                const fadeStates = fades.map((el) => {
                    const r = el.getBoundingClientRect();
                    const pts = [
                        [0.5, 0.5],
                        [0.1, 0.1],
                        [0.9, 0.1],
                        [0.1, 0.9],
                        [0.9, 0.9],
                    ];
                    return near && pts.some(([fx, fy]) => inside(r.left + r.width * fx, r.top + r.height * fy, MARGIN));
                });

                // 2) lalu tulis semua perubahan sekaligus
                for (const t of toDust) {
                    let dx = t.cx - ccx;
                    let dy = t.cy - ccy;
                    const len = Math.hypot(dx, dy) || 1;
                    dx /= len;
                    dy /= len;

                    // huruf ter-glitch: berubah warna, pecah RGB, miring, lalu hilang bertahap (steps)
                    const st = t.inner.style;
                    st.transitionDuration = "180ms";
                    st.transitionTimingFunction = "steps(3, end)";
                    st.color = pick([CYAN, PINK, YELLOW]);
                    st.textShadow = `2px 0 ${PINK}, -2px 0 ${CYAN}`;
                    st.opacity = "0";
                    st.transform = `translate(${dx * 10 + (Math.random() - 0.5) * 16}px, ${
                        (Math.random() - 0.5) * 6
                    }px) skewX(${(Math.random() - 0.5) * 50}deg) scaleX(${1 + Math.random() * 0.8})`;
                    dusted.add(t.el);

                    for (let k = 0; k < PER_CHAR && particles.length < MAX_PARTICLES; k++) {
                        const roll = Math.random();
                        const kind: 0 | 1 | 2 = roll < 0.55 ? 0 : roll < 0.85 ? 1 : 2;
                        const sp = 0.8 + Math.random() * 2.6;
                        const size = 1.5 + Math.random() * 2.2;
                        particles.push({
                            x: t.r.left + Math.random() * t.r.width,
                            y: t.r.top + Math.random() * t.r.height,
                            vx: dx * sp + (Math.random() - 0.5) * 1.6,
                            vy: dy * sp * 0.6 + (Math.random() - 0.5) * 0.8,
                            age: 0,
                            life: 28 + Math.random() * 50,
                            kind,
                            w: kind === 1 ? 8 + Math.random() * 22 : size,
                            h: kind === 1 ? 1.5 + Math.random() * 1.5 : size,
                            color: pick(PALETTE),
                            ch: pick(GLYPHS),
                            snap: Math.random() * 4,
                            show: true,
                        });
                    }
                }

                // huruf kembali: muncul bertahap (steps) dengan warna aslinya
                for (const el of toRestore) {
                    const st = (el.firstElementChild as HTMLElement).style;
                    st.transitionDuration = "420ms";
                    st.transitionTimingFunction = "steps(5, end)";
                    st.opacity = "";
                    st.transform = "";
                    st.color = "";
                    st.textShadow = "";
                    dusted.delete(el);
                }

                // huruf yang sudah dihapus dari DOM (typewriter) tidak perlu dilacak lagi
                for (const el of dusted) {
                    if (!el.isConnected) dusted.delete(el);
                }

                fadeActive = false;
                fades.forEach((el, i) => {
                    el.style.opacity = fadeStates[i] ? "0" : "";
                    if (fadeStates[i]) fadeActive = true;
                });
            }

            // partikel glitch
            if (particles.length > 0 || hadParticles) {
                ctx.clearRect(0, 0, vw, vh);
                // "lighter": saat pink dan cyan bertumpuk jadi putih, efek aberasi kromatik
                ctx.globalCompositeOperation = "lighter";
                ctx.font = `10px ${MONO}`;
                ctx.textBaseline = "top";

                for (let i = particles.length - 1; i >= 0; i--) {
                    const p = particles[i];
                    p.age += dt;
                    if (p.age >= p.life) {
                        particles[i] = particles[particles.length - 1];
                        particles.pop();
                        continue;
                    }

                    // gerak patah-patah: sesekali melompat ke samping dan berkedip
                    p.snap -= dt;
                    if (p.snap <= 0) {
                        p.x += (Math.random() - 0.5) * (p.kind === 1 ? 26 : 12);
                        p.y += (Math.random() - 0.5) * 3;
                        p.snap = 2 + Math.random() * 5;
                        p.show = Math.random() > 0.22;
                    }
                    p.vx *= 0.96;
                    p.vy *= 0.96;
                    p.x += p.vx * dt;
                    p.y += p.vy * dt;

                    if (!p.show) continue;

                    const a = 1 - p.age / p.life;
                    // posisi dibulatkan ke grid 2px supaya terlihat seperti piksel digital
                    const px = Math.round(p.x / 2) * 2;
                    const py = Math.round(p.y / 2) * 2;

                    if (p.kind === 0) {
                        ctx.globalAlpha = a;
                        ctx.fillStyle = p.color;
                        ctx.fillRect(px, py, p.w, p.h);
                    } else if (p.kind === 1) {
                        // irisan dengan pecahan warna: pink bergeser kiri, cyan bergeser kanan
                        ctx.globalAlpha = a * 0.85;
                        ctx.fillStyle = PINK;
                        ctx.fillRect(px - 2, py, p.w, p.h);
                        ctx.fillStyle = CYAN;
                        ctx.fillRect(px + 2, py, p.w, p.h);
                    } else {
                        ctx.globalAlpha = a;
                        ctx.fillStyle = p.color;
                        ctx.fillText(p.ch, px, py);
                    }
                }
                ctx.globalAlpha = 1;
                ctx.globalCompositeOperation = "source-over";
                hadParticles = particles.length > 0;
            }
        };

        raf = requestAnimationFrame(frame);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", resize);
            mo.disconnect();
            canvas.remove();
            dusted.forEach((el) => {
                const inner = el.firstElementChild as HTMLElement | null;
                if (inner) {
                    inner.style.opacity = "";
                    inner.style.transform = "";
                    inner.style.color = "";
                    inner.style.textShadow = "";
                    inner.style.transitionTimingFunction = "";
                }
            });
            dusted.clear();
            fades.forEach((el) => {
                el.style.opacity = "";
            });
        };
    }, []);

    return (
        <div ref={zoneRef} className={className}>
            {children}
        </div>
    );
};

export default DustZone;