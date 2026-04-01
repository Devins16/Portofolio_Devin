"use client";

import React from 'react'
import Image from 'next/image'
import { Typewriter } from 'react-simple-typewriter'
import ScrollReveal from './ScrollReveal';

const HereSection = () => {
    return (
        <section id='home' className='relative pt-36 pb-24'>
            <div className='mt-12 md:mt-24'>
                {/* avatar and headline */}
                <ScrollReveal stagger={0.12} className='flex flex-col md:flex-row gap-8 items-start md:items-center'>
                    {/* avatar and greetings */}
                    <div className='relative flex justify-center md:justify-end'>
                        <div className='pointer-events-none absolute -inset-12 md:-inset-24 rounded-full bg-linear-to-b from-[#2DD4BF] vai[#6d28d9]/30 to-transparent blur-3xl opacity-90'></div>
                        <div className='relative'>
                            <Image src="/images/IMG_9294-removebg-preview.png" alt="avatar" width={340} height={340} className="relative scale-x-[-1]" priority />

                            {/* small greeting with curve arrow */}
                            <div className='select-none pointer-events-none absolute -top-8 -right-6 md:-top-16 md:-right-40 text-xs text-white/70'>
                                <div className='relative flex items-center justify-end'>
                                    <div className='relative w-16 h-6 md:w-24 md:h-16'>
                                        <Image src="/images/hero-arrow.png" alt="avatar" fill className="object-contain scale-x-100 -rotate-6" priority />
                                    </div>
                                    <div className='-mt-6 md:-mt-10 shrink-0'>
                                        <span>How are {" "}</span>
                                        <span className='text-[#2DD4BF]'>you?</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* headline */}
                    <div className='md:pl-2 text-center md:text-left'>
                        <p className='text-sm md:text-base text-white/60 mb-2'>Hello! I am Devin Syafa 👋</p>

                        <h1 className='text-4xl sm:text-5xl font-normal tracking-tight leading-[1.15]'>
                            <span className='block'>Welcome to my portfolio</span>
                            <span className='block'>
                                 {" "}
                                <span className='relative inline-block align-baseline ml-2'>
                                    <span className='relative z-10 text-[#2DD4BF]'>Explore</span>
                                    <span className='pointer-events-none absolute -inset-x-2 -inset-y-2 translate-y-1 -z-10 rotate-12'>
                                        <Image src="/images/ellipse.png" alt='arrow' fill className='object-contain priority' />
                                    </span>

                                </span>
                                ....
                            </span>

                        </h1>

                        <p className='mt-2 text-[10px] md:text-xs text-white/50 max-w-md md:max-w-lg mx-auto md:mx-0'>Take a look at the projects I've built and the work I'm passionate about.</p>
                    </div>
                </ScrollReveal>

                {/* role and description */}
                <div className='mt-16 max-w-3xl'>
                    <h2 className='text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight'>
                        <Typewriter
                            words={["I'm an IT Graduate.", "Machine Learning Enthusiast", "Junior Software Developer", "Aspiring Data Scientist"]}
                            typeSpeed={65}
                            deleteSpeed={0}
                            delaySpeed={600}
                            cursor
                            cursorStyle="|"
                            loop={1}
                        />
                    </h2>
                    <p>Exploring Software, Data & AI</p>
                    <p className='mt-6 text-white/70 leading-7'>An IT graduate passionate about technology, software development, and data science.
                        I enjoy building projects, exploring new technologies, and continuously improving my technical skills.
                        Currently seeking opportunities to start my career and contribute in the IT industry. </p>

                </div>
            </div>
        </section>
    )
}

export default HereSection