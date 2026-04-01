"use client"

import { useState } from "react"
import Image from "next/image"

type Props = {
  images: string[]
}

export default function ProjectCarousel({ images }: Props) {

  const [current, setCurrent] = useState(0)

  return (
    <div className="relative rounded-2xl overflow-hidden bg-[#0F172A] border border-[#1E293B] shadow-[0_0_90px_rgba(20,184,166,0.28)]">

      {/* Images */}
      <div className="overflow-hidden md:h-[360px] h-[250px]">

        <div
          className="flex transition-transform duration-700 ease-out"
          style={{
            transform: `translateX(-${current * 100}%)`
          }}
        >
          {images.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt="project screenshot"
              width={600}
              height={360}
              className="w-full shrink-0 object-cover"
            />
          ))}
        </div>

      </div>

      {/* Indicator dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              current === index
                ? "bg-[#14B8A6] scale-110"
                : "bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

    </div>
  )
}