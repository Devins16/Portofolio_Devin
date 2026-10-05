"use client";

import React from 'react'
import Image from 'next/image'
import ScrollReveal from './ScrollReveal';
import Lanyard from './Lanyard';
import DustZone from './DustZone';
import { DustText, DustTypewriter } from './DustText';

const HereSection = () => {
    return (
        <section id='home' className='relative min-h-screen'>
            <div className='relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 md:flex-row md:items-center'>

                {/* lanyard (kolom kiri), z-10 supaya kartu berada di atas teks */}
                <div className='relative z-10 h-[520px] w-full shrink-0 md:h-screen md:w-5/12'>
                    {/* glow di belakang kartu */}
                    <div className='pointer-events-none absolute left-1/2 top-[38%] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-b from-[#2DD4BF]/40 via-[#6d28d9]/20 to-transparent blur-3xl' />
                    <Lanyard />
                </div>

                {/* teks (kolom kanan): huruf yang tersentuh kartu berubah jadi debu */}
                <DustZone className='relative pb-24 text-center md:flex-1 md:pb-0 md:pl-8 md:text-left'>
                    {/* headline */}
                    <ScrollReveal stagger={0.12}>
                        <p className='mb-2 text-sm text-white/60 md:text-base'>
                            <DustText text="Hello! I am Devin Syafa 👋" />
                        </p>

                        <h1 className='text-4xl font-normal leading-[1.15] tracking-tight sm:text-5xl'>
                            <span className='block'>
                                <DustText text="Welcome to my portfolio" />
                            </span>
                            <span className='block'>
                                <span className='relative ml-2 inline-block align-baseline'>
                                    <span className='relative z-10 text-[#2DD4BF]'>
                                        <DustText text="Explore" />
                                    </span>
                                    {/* ellipse ikut menghilang halus saat tersentuh kartu */}
                                    <span
                                        data-dust-fade
                                        className='pointer-events-none absolute -inset-x-2 -inset-y-2 -z-10 translate-y-1 rotate-12 transition-opacity duration-500'
                                    >
                                        <Image src="/images/ellipse.png" alt='' fill className='object-contain' />
                                    </span>
                                </span>
                                <DustText text="...." />
                            </span>
                        </h1>

                        <p className='mx-auto mt-2 max-w-md text-[10px] text-white/50 md:mx-0 md:max-w-lg md:text-xs'>
                            <DustText text="Take a look at the projects I've built and the work I'm passionate about." />
                        </p>
                    </ScrollReveal>

                    {/* role and description */}
                    <div className='mt-12 max-w-3xl'>
                        <h2 className='text-3xl font-normal tracking-tight sm:text-4xl md:text-5xl'>
                            <DustTypewriter
                                words={["I'm an IT Graduate.", "Machine Learning Enthusiast", "Junior Software Developer", "Aspiring Data Scientist"]}
                                typeSpeed={65}
                                delay={600}
                            />
                        </h2>
                        <p className='mt-2 text-white/60'>
                            <DustText text="Exploring Software, Data & AI" />
                        </p>
                        <p className='mt-6 leading-7 text-white/70'>
                            <DustText text="An IT graduate passionate about technology, software development, and data science. I enjoy building projects, exploring new technologies, and continuously improving my technical skills. Currently seeking opportunities to start my career and contribute in the IT industry." />
                        </p>
                    </div>
                </DustZone>
            </div>
        </section>
    )
}

export default HereSection
