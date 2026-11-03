"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
    src?: string;
    minDelay?: number;
    maxDelay?: number;
    duration?: number;
    size?: number;
};

type Flash = { id: number; x: number; y: number; rot: number; size: number };

const rand = (a: number, b: number) => a + Math.random() * (b - a);

const CSS = `
.nf-wrap { position: fixed; z-index: 2147482000; pointer-events: none; opacity: 0; animation-name: nf-flash; animation-timing-function: linear; animation-fill-mode: both; }
.nf-aura { position: absolute; inset: -60%; border-radius: 50%; background: radial-gradient(circle, rgba(0,255,80,.22) 0%, rgba(0,255,80,.08) 35%, transparent 65%); }
.nf-logo { position: relative; display: block; width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 0 3px #b8ffd0) drop-shadow(0 0 10px #00ff50) drop-shadow(0 0 26px #00ff50) drop-shadow(0 0 50px rgba(0,255,80,.7)); }
@keyframes nf-flash {
  0% { opacity: 0; }
  6% { opacity: 1; }
  10% { opacity: .45; }
  15% { opacity: 1; }
  20% { opacity: .7; }
  26% { opacity: 1; }
  72% { opacity: 1; }
  78% { opacity: .6; }
  84% { opacity: 1; }
  100% { opacity: 0; }
}
`;

const Lantern = () => (
    <svg
        className="nf-logo"
        viewBox="0 0 100 120"
        fill="none"
        stroke="#c9ffd9"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M38 24 C38 6 62 6 62 24" />
        <path d="M33 24 H67 L72 34 H28 Z" />
        <path d="M31 34 L26 88 M69 34 L74 88" />
        <path d="M50 46 C60 58 58 72 50 80 C42 72 40 58 50 46 Z" />
        <path d="M24 88 H76 L71 102 H29 Z" />
        <path d="M34 102 L32 112 M66 102 L68 112" />
    </svg>
);

const NeonFlash = ({ src, minDelay = 7000, maxDelay = 22000, duration = 1300, size = 170 }: Props) => {
    const [mounted, setMounted] = useState(false);
    const [flash, setFlash] = useState<Flash | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let t: ReturnType<typeof setTimeout> | undefined;
        let id = 0;

        const schedule = (first: boolean) => {
            t = setTimeout(show, first ? rand(3000, 8000) : rand(minDelay, maxDelay));
        };

        const show = () => {
            if (document.hidden) {
                schedule(false);
                return;
            }
            const s = rand(size * 0.8, size * 1.25);
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            setFlash({
                id: ++id,
                size: s,
                x: rand(24, Math.max(24, vw - s - 24)),
                y: rand(80, Math.max(80, vh - s * 1.2 - 100)),
                rot: rand(-14, 14),
            });
            t = setTimeout(() => {
                setFlash(null);
                schedule(false);
            }, duration);
        };

        schedule(true);
        return () => clearTimeout(t);
    }, [mounted, minDelay, maxDelay, duration, size]);

    if (!mounted || !flash) return null;

    return createPortal(
        <div
            key={flash.id}
            className="nf-wrap"
            aria-hidden="true"
            style={{
                left: flash.x,
                top: flash.y,
                width: flash.size,
                height: flash.size,
                transform: `rotate(${flash.rot}deg)`,
                animationDuration: `${duration}ms`,
            }}
        >
            <style>{CSS}</style>
            <div className="nf-aura" />
            {src ? (
                <img className="nf-logo" src={src} alt="" draggable={false} />
            ) : (
                <Lantern />
            )}
        </div>,
        document.body
    );
};

export default NeonFlash;
