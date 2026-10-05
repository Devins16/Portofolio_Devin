"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// ---- daftar lagu: taruh file mp3 di folder public/music/ lalu sesuaikan di sini ----
const TRACKS = [
    { title: "Calm Night", src: "/music/calm night.mp3" },
    { title: "Calm Night", src: "/music/calm night.mp3" },
    { title: "Calm Night", src: "/music/calm night.mp3" }   ,
];
const VOLUME = 0.35; // 0 sampai 1
const STORAGE_KEY = "bgm-pref";

type Pref = { muted: boolean; paused: boolean };

const readPref = (): Pref => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const p = JSON.parse(raw);
            return { muted: !!p.muted, paused: !!p.paused };
        }
    } catch {
        /* localStorage tidak tersedia */
    }
    return { muted: false, paused: false };
};

const writePref = (patch: Partial<Pref>) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...readPref(), ...patch }));
    } catch {
        /* abaikan */
    }
};

// Browser memblokir musik otomatis yang bersuara sampai pengunjung berinteraksi dengan halaman
const FIRST_EVENTS = ["pointerdown", "pointerup", "keydown", "touchend"] as const;

const Icon = ({ d }: { d: string }) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d={d} />
    </svg>
);

const ICON_PLAY = "M8 5v14l11-7z";
const ICON_PAUSE = "M6 5h4v14H6zM14 5h4v14h-4z";
const ICON_NEXT = "M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z";
const ICON_VOLUME =
    "M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z";
const ICON_MUTED =
    "M16.5 12A4.5 4.5 0 0 0 14 8v2.18l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.8 8.8 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z";

// CSS ditulis sendiri (bukan Tailwind) supaya tampilan dan posisinya tidak bergantung pada
// konfigurasi Tailwind maupun elemen induk.
const CSS = `
.bgm-root { position: fixed; right: 20px; bottom: 20px; z-index: 2147483000; display: flex; flex-direction: column; align-items: flex-end; gap: 8px; pointer-events: auto; }
@media (min-width: 640px) { .bgm-root { right: 24px; bottom: 24px; } }
.bgm-hint { margin: 0; padding: 4px 12px; border-radius: 9999px; border: 1px solid rgba(255,255,255,.1); background: rgba(7,11,26,.85); color: rgba(255,255,255,.6); font-size: 11px; backdrop-filter: blur(6px); }
.bgm-pill { display: flex; align-items: center; gap: 4px; padding: 6px 6px 6px 12px; border-radius: 9999px; border: 1px solid rgba(255,255,255,.15); background: rgba(7,11,26,.85); box-shadow: 0 10px 40px -12px rgba(45,212,191,.35); backdrop-filter: blur(12px); }
.bgm-eq { display: flex; align-items: flex-end; gap: 3px; height: 16px; }
.bgm-bar { display: block; width: 3px; height: 100%; border-radius: 9999px; background: #2DD4BF; transform-origin: bottom; transform: scaleY(.3); animation: bgm-eq .9s ease-in-out infinite; animation-play-state: paused; }
.bgm-bar.on { animation-play-state: running; }
.bgm-title { display: none; max-width: 130px; margin: 0 4px 0 8px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: rgba(255,255,255,.7); font-size: 12px; }
@media (min-width: 640px) { .bgm-title { display: block; } }
.bgm-btn { display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; padding: 0; border: 0; border-radius: 9999px; background: transparent; color: rgba(255,255,255,.8); cursor: pointer; transition: background .15s, color .15s; }
.bgm-btn:hover { background: rgba(255,255,255,.1); color: #fff; }
.bgm-btn:focus-visible { outline: 2px solid #2DD4BF; outline-offset: 2px; }
.bgm-btn.primary { background: #2DD4BF; color: #04121a; }
.bgm-btn.primary:hover { background: #5eead4; color: #04121a; }
@keyframes bgm-eq { 0%, 100% { transform: scaleY(.3); } 50% { transform: scaleY(1); } }
@media (prefers-reduced-motion: reduce) { .bgm-bar { animation: none; transform: scaleY(.6); } }
`;

const MusicPlayer = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const playerRef = useRef<HTMLDivElement>(null);
    const wantPlay = useRef(false); // niat pengunjung: lanjut memutar lagu berikutnya atau tidak
    const userPaused = useRef(false);

    const [mounted, setMounted] = useState(false);
    const [index, setIndex] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [blocked, setBlocked] = useState(false);

    // pemutar dirender lewat portal ke <body>, jadi hanya setelah halaman tampil di browser
    useEffect(() => {
        setMounted(true);
    }, []);

    // saat halaman dibuka: coba putar otomatis, kalau diblokir tunggu interaksi pertama
    useEffect(() => {
        if (!mounted) return;
        const a = audioRef.current;
        if (!a) return;
        a.volume = VOLUME;

        const pref = readPref();
        setMuted(pref.muted);
        a.muted = pref.muted;
        if (pref.paused) {
            // pengunjung sengaja menjeda terakhir kali, jadi jangan putar otomatis
            userPaused.current = true;
            return;
        }

        function cleanup() {
            FIRST_EVENTS.forEach((ev) => window.removeEventListener(ev, onFirst));
        }

        function onFirst(e: Event) {
            if (!a || !a.paused || userPaused.current) {
                cleanup();
                return;
            }
            // klik di dalam pemutar ditangani oleh tombolnya sendiri
            if (playerRef.current?.contains(e.target as Node)) return;
            a.play()
                .then(cleanup)
                .catch(() => {
                    /* belum dianggap interaksi (mis. pointerdown di layar sentuh), tunggu event berikutnya */
                });
        }

        a.play().catch(() => {
            setBlocked(true);
            FIRST_EVENTS.forEach((ev) => window.addEventListener(ev, onFirst));
        });

        return cleanup;
    }, [mounted]);

    useEffect(() => {
        if (audioRef.current) audioRef.current.muted = muted;
    }, [muted, mounted]);

    // ganti lagu: lanjut memutar kalau tadi sedang/ingin diputar
    useEffect(() => {
        if (wantPlay.current) audioRef.current?.play().catch(() => {});
    }, [index]);

    const toggle = () => {
        const a = audioRef.current;
        if (!a) return;
        if (a.paused) {
            userPaused.current = false;
            wantPlay.current = true;
            writePref({ paused: false });
            a.play().catch(() => {});
        } else {
            userPaused.current = true;
            wantPlay.current = false;
            writePref({ paused: true });
            a.pause();
        }
    };

    const next = () => {
        wantPlay.current = true;
        userPaused.current = false;
        writePref({ paused: false });
        setIndex((i) => (i + 1) % TRACKS.length);
    };

    const toggleMute = () => {
        const m = !muted;
        setMuted(m);
        writePref({ muted: m });
    };

    if (!mounted) return null;

    return createPortal(
        <div ref={playerRef} className="bgm-root">
            <style>{CSS}</style>

            {blocked && !playing && <p className="bgm-hint">Click anywhere to start the music</p>}

            <div className="bgm-pill">
                {/* equalizer kecil, bergerak saat musik diputar */}
                <div className="bgm-eq" aria-hidden="true">
                    {[0, 0.3, 0.6].map((delay, i) => (
                        <span key={i} className={`bgm-bar${playing ? " on" : ""}`} style={{ animationDelay: `${delay}s` }} />
                    ))}
                </div>

                <span className="bgm-title" title={TRACKS[index].title}>
                    {TRACKS[index].title}
                </span>

                <button
                    type="button"
                    className="bgm-btn primary"
                    onClick={toggle}
                    aria-label={playing ? "Pause music" : "Play music"}
                    title={playing ? "Pause" : "Play"}
                >
                    <Icon d={playing ? ICON_PAUSE : ICON_PLAY} />
                </button>

                <button type="button" className="bgm-btn" onClick={next} aria-label="Next song" title="Next song">
                    <Icon d={ICON_NEXT} />
                </button>

                <button
                    type="button"
                    className="bgm-btn"
                    onClick={toggleMute}
                    aria-label={muted ? "Unmute" : "Mute"}
                    aria-pressed={muted}
                    title={muted ? "Unmute" : "Mute"}
                >
                    <Icon d={muted ? ICON_MUTED : ICON_VOLUME} />
                </button>
            </div>

            <audio
                ref={audioRef}
                src={TRACKS[index].src}
                preload="auto"
                onPlay={() => {
                    wantPlay.current = true;
                    setPlaying(true);
                    setBlocked(false);
                }}
                onPause={() => setPlaying(false)}
                onEnded={next}
            />
        </div>,
        document.body
    );
};

export default MusicPlayer;
