"use client";

import React, { useEffect, useState } from "react";

/*
  Setiap huruf dibungkus dua <span>:
  - luar  (data-dust): tidak pernah bergerak, dipakai DustZone untuk mengukur posisi huruf
  - dalam            : yang dianimasikan (hilang jadi debu, lalu kembali)
*/
const Char = ({ ch }: { ch: string }) => (
    <span data-dust className="inline-block">
        <span className="inline-block ease-out transition-[opacity,transform]">{ch}</span>
    </span>
);

// Kata dibungkus nowrap supaya baris tetap pindah per kata, bukan per huruf
export const DustChars = ({ text }: { text: string }) => {
    const words = text.split(" ");
    return (
        <>
            {words.map((word, wi) => (
                <React.Fragment key={wi}>
                    <span className="inline-block whitespace-nowrap">
                        {Array.from(word).map((ch, ci) => (
                            <Char key={ci} ch={ch} />
                        ))}
                    </span>
                    {wi < words.length - 1 && " "}
                </React.Fragment>
            ))}
        </>
    );
};

export const DustText = ({ text, className }: { text: string; className?: string }) => (
    <span className={className}>
        <span className="sr-only">{text}</span>
        <span aria-hidden="true">
            <DustChars text={text} />
        </span>
    </span>
);

// Pengganti react-simple-typewriter: mengetik tiap kata, kata terakhir tetap tampil (sama seperti loop={1})
export const DustTypewriter = ({
    words,
    typeSpeed = 65,
    delay = 600,
    className,
}: {
    words: string[];
    typeSpeed?: number;
    delay?: number;
    className?: string;
}) => {
    const [text, setText] = useState("");
    const key = words.join("|");

    useEffect(() => {
        const list = key.split("|");
        let wi = 0;
        let ci = 0;
        let t: ReturnType<typeof setTimeout> | undefined;
        setText("");

        const typeNext = () => {
            ci += 1;
            setText(list[wi].slice(0, ci));
            if (ci < list[wi].length) {
                t = setTimeout(typeNext, typeSpeed);
                return;
            }
            if (wi === list.length - 1) return; // kata terakhir tetap
            t = setTimeout(() => {
                wi += 1;
                ci = 0;
                typeNext();
            }, delay);
        };

        t = setTimeout(typeNext, typeSpeed);
        return () => clearTimeout(t);
    }, [key, typeSpeed, delay]);

    return (
        <span className={className}>
            <span className="sr-only">{words[words.length - 1]}</span>
            <span aria-hidden="true">
                <DustChars text={text} />
                <span className="animate-pulse">|</span>
            </span>
        </span>
    );
};
