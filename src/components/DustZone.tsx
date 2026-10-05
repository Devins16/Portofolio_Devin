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
    size: number;
    color: string;
    alpha: number;
};

const MAX_PARTICLES = 2500; // batas total partikel di layar
const PER_CHAR = 7; // jumlah partikel per huruf yang hancur
const MARGIN = 4; // huruf mulai hancur sedikit sebelum benar-benar tersentuh (px)

// Warna debu ala Green Lantern
const DUST_GREEN = "rgb(0,255,80)";
const DUST_LIGHT = "rgb(170,255,200)"; // sebagian percikan dibuat lebih terang

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
                // pusat kartu, dipakai sebagai arah hembusan debu
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

                    const dist = 14 + Math.random() * 22;
                    t.inner.style.transitionDuration = "320ms";
                    t.inner.style.opacity = "0";
                    t.inner.style.transform = `translate(${dx * dist + (Math.random() - 0.5) * 10}px, ${
                        dy * dist + (Math.random() - 0.5) * 10 - 6
                    }px) rotate(${(Math.random() - 0.5) * 80}deg) scale(0.4)`;
                    dusted.add(t.el);

                    for (let k = 0; k < PER_CHAR && particles.length < MAX_PARTICLES; k++) {
                        const sp = 0.6 + Math.random() * 1.8;
                        particles.push({
                            x: t.r.left + Math.random() * t.r.width,
                            y: t.r.top + Math.random() * t.r.height,
                            vx: dx * sp + (Math.random() - 0.5) * 0.9,
                            vy: dy * sp + (Math.random() - 0.5) * 0.9 - 0.35,
                            age: 0,
                            life: 50 + Math.random() * 70,
                            size: 0.8 + Math.random() * 1.7,
                            color: Math.random() < 0.25 ? DUST_LIGHT : DUST_GREEN,
                            alpha: 0.95,
                        });
                    }
                }

                for (const el of toRestore) {
                    const inner = el.firstElementChild as HTMLElement;
                    inner.style.transitionDuration = "900ms";
                    inner.style.opacity = "";
                    inner.style.transform = "";
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

            // partikel debu
            if (particles.length > 0 || hadParticles) {
                ctx.clearRect(0, 0, vw, vh);
                ctx.globalCompositeOperation = "lighter";
                for (let i = particles.length - 1; i >= 0; i--) {
                    const p = particles[i];
                    p.age += dt;
                    if (p.age >= p.life) {
                        particles[i] = particles[particles.length - 1];
                        particles.pop();
                        continue;
                    }
                    p.vx = (p.vx + (Math.random() - 0.5) * 0.08) * 0.975;
                    p.vy = (p.vy + (Math.random() - 0.5) * 0.08 - 0.004) * 0.975;
                    p.x += p.vx * dt;
                    p.y += p.vy * dt;
                    ctx.globalAlpha = p.alpha * (1 - p.age / p.life);
                    ctx.fillStyle = p.color;
                    ctx.fillRect(p.x, p.y, p.size, p.size);
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
