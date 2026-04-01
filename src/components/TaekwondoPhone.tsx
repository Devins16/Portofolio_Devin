"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function TaekwondoPhone() {

  const images = [
    "/images/tae.png",
    "/images/tae1.png",
    "/images/tae2.png"
  ]

  const [current, setCurrent] = useState(0)

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="flex justify-center">

      <div className="relative w-[220px] md:w-[260px] group">

        {/* PHONE FRAME */}
        <div className="rounded-[2.5rem] border-[6px] border-[#1E293B] bg-black shadow-[0_0_60px_rgba(20,184,166,0.25)] overflow-hidden">

          {/* SCREEN */}
          <div className="rounded-[2rem] overflow-hidden relative">

            <Image
              src={images[current]}
              alt="taekwondo app"
              width={300}
              height={600}
              className="w-full h-auto object-cover transition-all duration-500"
            />

            {/* LEFT ARROW */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white"
            >
              <ChevronLeft size={18} />
            </button>

            {/* RIGHT ARROW */}
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white"
            >
              <ChevronRight size={18} />
            </button>

          </div>
        </div>

        {/* NOTCH */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full"></div>

        {/* DOT INDICATOR */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-2.5 w-2.5 rounded-full ${
                current === index
                  ? "bg-[#14B8A6]"
                  : "bg-white/30"
              }`}
            />
          ))}
        </div>

      </div>

    </div>
  )
}