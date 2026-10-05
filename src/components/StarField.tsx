"use client";

import React, { useEffect, useRef } from "react";

type Star = {
    bx: number; // posisi dasar (px)
    by: number;
    d: number; // kedalaman: 0 = jauh, 1 = dekat
    r: number; // radius (px)
    tw: number; // kecepatan kelip
    ph: number; // fase kelip
    rgb: string;
    glow: boolean;
};

// Warna bintang dan peluang munculnya (disesuaikan dengan warna situs: putih, teal, ungu, biru muda)
const PALETTE: [string, number][] = [
    ["255,255,255", 0.62],
    ["45,212,191", 0.18],
    ["167,139,250", 0.12],
    ["186,230,253", 0.08],
];

const pickColor = () => {
    let r = Math.random();
    for (const [c, w] of PALETTE) {
        r -= w;
        if (r <= 0) return c;
    }
    return "255,255,255";
};

const mod = (n: number, m: number) => ((n % m) + m) % m;

// ---- pengaturan ----
const DENSITY = 6000; // luas layar (px²) per bintang. Makin kecil = makin banyak bintang
const MAX_STARS = 380;
const MOUSE_PARALLAX = 0.09; // seberapa jauh bintang bergeser mengikuti mouse
const SCROLL_PARALLAX = 0.25; // seberapa jauh bintang bergeser saat scroll
const DRIFT_X = 1.5; // kecepatan melayang (px/detik) untuk bintang terdekat
const DRIFT_Y = -3;

const StarField = () => {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current!;
        const ctx = canvas.getContext("2d")!;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        let W = 0;
        let H = 0;
        let stars: Star[] = [];
        const cam = { x: 0, y: 0 };
        const target = { x: 0, y: 0 };
        let raf = 0;

        const build = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            W = window.innerWidth;
            H = window.innerHeight;
            canvas.width = Math.round(W * dpr);
            canvas.height = Math.round(H * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const count = Math.round(Math.min(MAX_STARS, Math.max(90, (W * H) / DENSITY)));
            stars = Array.from({ length: count }, () => {
                const d = Math.pow(Math.random(), 1.6); // lebih banyak bintang jauh daripada yang dekat
                return {
                    bx: Math.random() * W,
                    by: Math.random() * H,
                    d,
                    r: 0.35 + d * 1.5 + Math.random() * 0.3,
                    tw: 0.6 + Math.random() * 1.8,
                    ph: Math.random() * Math.PI * 2,
                    rgb: pickColor(),
                    glow: d > 0.8 && Math.random() < 0.5,
                };
            });
        };

        const draw = (t: number) => {
            const sec = t / 1000;
            const M = 20; // margin di luar layar supaya bintang tidak "muncul tiba-tiba"
            const scroll = window.scrollY;

            // kamera mengikuti mouse dengan halus
            cam.x += (target.x - cam.x) * 0.05;
            cam.y += (target.y - cam.y) * 0.05;

            ctx.clearRect(0, 0, W, H);

            for (const s of stars) {
                // bintang dekat bergeser lebih jauh daripada bintang jauh: inilah efek kedalamannya
                const p = 0.08 + 0.92 * s.d;
                const x = mod(s.bx + M - cam.x * p + (reduce ? 0 : sec * DRIFT_X * p), W + 2 * M) - M;
                const y =
                    mod(s.by + M - cam.y * p - scroll * SCROLL_PARALLAX * p + (reduce ? 0 : sec * DRIFT_Y * p), H + 2 * M) - M;

                const twinkle = reduce ? 1 : 0.72 + 0.28 * Math.sin(sec * s.tw + s.ph);
                const a = (0.25 + 0.65 * s.d) * twinkle; // bintang jauh lebih redup

                ctx.fillStyle = `rgba(${s.rgb},${a.toFixed(3)})`;
                ctx.beginPath();
                ctx.arc(x, y, s.r, 0, Math.PI * 2);
                ctx.fill();

                if (s.glow) {
                    ctx.fillStyle = `rgba(${s.rgb},${(a * 0.18).toFixed(3)})`;
                    ctx.beginPath();
                    ctx.arc(x, y, s.r * 3.2, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        };

        const loop = (t: number) => {
            draw(t);
            raf = requestAnimationFrame(loop);
        };

        const onMove = (e: PointerEvent) => {
            target.x = (e.clientX - W / 2) * MOUSE_PARALLAX;
            target.y = (e.clientY - H / 2) * MOUSE_PARALLAX;
        };

        const onResize = () => {
            // abaikan perubahan tinggi kecil (mis. address bar di HP)
            if (window.innerWidth !== W || Math.abs(window.innerHeight - H) > 150) {
                build();
                if (reduce) draw(0);
            }
        };

        build();
        if (reduce) {
            draw(0); // satu gambar statis, tanpa animasi
        } else {
            raf = requestAnimationFrame(loop);
            window.addEventListener("pointermove", onMove, { passive: true });
        }
        window.addEventListener("resize", onResize);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <canvas
            ref={ref}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
        />
    );
};

export default StarField;
