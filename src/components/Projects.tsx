import React from 'react'
import Image from 'next/image'
import ScrollReveal from './ScrollReveal'
import { Github, ExternalLink } from "lucide-react"
import { Gamepad2, Play } from "lucide-react"
import ProjectCarousel from "./ProjectCarousel"
import TaekwondoPhone from "@/components/TaekwondoPhone"

<a
    href="https://minus-one-studio.itch.io/fishing-legends-the-masters-angler-legacy"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-[#FA5C5C] hover:bg-[#e14c4c] text-white font-medium transition"
>
    <Gamepad2 size={16} />
    Play on Itch.io
</a>


const Projects = () => {
    
    return (
        <section id='projects' className='relative py-28 space-y-32'>
                <h3 className='text-2xl md:text-3xl font-semibold text-white/90 mb-7'>Projects</h3>
            
            <div className="relative p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
            
                <div className='pointer-events-none absolute right-0 left-1/3 top-8 -z-10 h-[420px] opacity-40 blur-3xl'
                    style={{
                        background: 'radial-gradient(60% 60% at 60% 40%, rgba(20,184,166,0.35) 0%, rgba(18, 8, 36, 0) 70%)'
                    }}
                />
                
                <ScrollReveal stagger={0.15} className='grid grid-cols-1 md:grid-cols-2 items-center'>
                    <div className='relative -pl-50 z-10'>
                        {/* heading */}
                        <div className='mb-12'>
                            <p className='text-xs text-[#2DD4BF] '>Featured Project</p>
                            <h3 className='text-2xl md:text-3xl font-semibold text-white/90'>Eye Disease Classification using ConvNeXtV2</h3>
                        </div>

                        {/* descriptio */}
                        <div className='relative md:-mr-24 md:-mt-6 z-20 max-w-5xl rounded-2xl p-5 bg-white/6 backdrop-blur-sm border-white/10 shadow-[0_6px_50px_rgba(20,184,166,0.25)]'>
                            <p className='text-sm p-4 text-white/70'>
                                Developed a deep learning model to classify eye diseases from medical images using the ConvNeXtV2 architecture. The model was trained and evaluated to accurately identify different eye conditions through computer vision techniques.
                            </p>
                            <div className='pointer-events-none absolute -inset-px rounded-[14px] opacity-60'
                                style={{
                                    background: 'linear-gradient(135deg, rgba(20,184,166,0.35), rgba(45,212,191,0.05))',
                                }}
                            />
                        </div>
                        <div className="mt-6 flex flex-col gap-4">

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2 text-xs text-white/70">
                                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Python</span>
                                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">PyTorch</span>
                                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">ConvNeXtV2</span>
                                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Deep Learning</span>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-4">

                                <a
                                    href="https://github.com/Devins16/Eye-Disease-Classification-ConvNeXtV2.git"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition"
                                >
                                    <Github size={16} />
                                    GitHub
                                </a>

                                <a
                                    href="https://klasifikasi-citra.streamlit.app/"
                                    target="_blank"
                                    className="px-4 py-2 text-sm rounded-lg bg-[#14B8A6] hover:bg-[#0f9f8f] text-black font-medium transition"
                                >
                                    Live Demo
                                </a>

                            </div>

                        </div>
                    </div>
                    {/* project images */}
                    <ProjectCarousel
                        images={[
                            "/images/prev.png",
                            "/images/acc.jpeg",
                            "/images/loss.jpeg",
                            "/images/conf.jpeg"
                        ]}
                    />
                </ScrollReveal>
            </div>

            <div className="relative p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
                <div className='pointer-events-none absolute right-0 left-1/3 top-8 -z-10 h-[420px] opacity-40 blur-3xl'
                    style={{
                        background: 'radial-gradient(60% 60% at 60% 40%, rgba(20,184,166,0.35), rgba(18, 8, 36, 0) 70%)'
                    }}
                />
                <ScrollReveal stagger={0.15} delay={0.8} className='grid grid-cols-1 md:grid-cols-2  items-center'>
                    {/* text content */}
                    <div className='relative md:order-2 z-10'>
                        {/* heading */}
                        <div className='mb-12 text-right'>
                            <p className='text-xs text-[#2DD4BF] '>Featured Project</p>
                            <h3 className='text-2xl md:text-3xl font-semibold text-white/90'>Credit Risk Prediction - Home Credit Indonesia X Rakamin</h3>
                        </div>

                        {/* descriptio */}
                        <div className='relative md:-ml-24 md:-mt-6 z-20 max-w-5xl rounded-2xl p-5 bg-white/6 backdrop-blur-sm border-white/10 shadow-[0_6px_50px_rgba(126, 34, 206, 0.25]'>
                            <p className='text-sm p-4 text-white/70'>
                                Built a machine learning model to predict loan default risk using historical customer data. The project includes data preprocessing, feature engineering, and model evaluation to support data-driven credit risk assessment.
                            </p>
                            <div className='pointer-events-none absolute -inset-px rounded-[14px] opacity-60'
                                style={{
                                    background: 'linear-gradient(135deg, rgba(20,184,166,0.35), rgba(45,212,191,0.05))',
                                }}
                            />
                        </div>
                        <div className="mt-6 flex flex-col gap-4">

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2 text-xs text-white/70">
                                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Python</span>
                                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Pandas</span>
                                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Scikit-Learn</span>
                                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Data Scientist</span>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-4">

                                <a
                                    href="https://github.com/Devins16/Home-Credit-Final-Task.git"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition"
                                >
                                    <Github size={16} />
                                    GitHub
                                </a>

                            </div>

                        </div>
                    </div>
                    {/* project images */}
                    <div className='relative md:order-1'>

                        <ProjectCarousel
                            images={[
                                "/images/roc_curve_dark.png",
                                "/images/income_distribution_dark.png",
                                "/images/target_distribution_dark.png"
                            ]}
                        />

                    </div>
                </ScrollReveal>
            </div>

            <div className="relative p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
                <div className='pointer-events-none absolute right-0 left-1/3 top-8 -z-10 h-[420px] opacity-40 blur-3xl'
                    style={{
                        background: 'radial-gradient(60% 60% at 60% 40%, rgba(20,184,166,0.35) 0%, rgba(18, 8, 36, 0) 70%)'
                    }}
                />
                <ScrollReveal stagger={0.15} className='grid grid-cols-1 md:grid-cols-2 items-center'>
                    <div className='relative -pl-50 z-10'>
                        {/* heading */}
                        <div className='mb-12'>
                            <p className='text-xs text-[#2DD4BF] '>Featured Project</p>
                            <h3 className='text-2xl md:text-3xl font-semibold text-white/90'>Sentiment Analysis</h3>
                        </div>

                        {/* descriptio */}
                        <div className='relative md:-mr-24 md:-mt-6 z-20 max-w-5xl rounded-2xl p-5 bg-white/6 backdrop-blur-sm border-white/10 shadow-[0_6px_50px_rgba(20,184,166,0.25)]'>
                            <p className='text-sm p-4 text-white/70'>
                                Developed a natural language processing model to analyze public opinions regarding the naturalization of the national football team. The system processes text data and classifies sentiments into positive, neutral, and negative categories.
                            </p>
                            <div className='pointer-events-none absolute -inset-px rounded-[14px] opacity-60'
                                style={{
                                    background: 'linear-gradient(135deg, rgba(20,184,166,0.35), rgba(45,212,191,0.05))',
                                }}
                            />
                        </div>
                        <div className="mt-6 flex flex-col gap-4">

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2 text-xs text-white/70">
                                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Python</span>
                                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">NLP</span>
                                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Text Processing</span>
                                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Machine Learning</span>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-4">

                                <a
                                    href="https://github.com/Devins16/sentiment-analysis-naturalization.git"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition"
                                >
                                    <Github size={16} />
                                    GitHub
                                </a>

                                <a
                                    href="https://youtu.be/WQiGYUpIgOY"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition"
                                >
                                    <Play size={16} />
                                    YouTube Demo
                                </a>

                            </div>

                        </div>
                    </div>
                    {/* project images */}
                    <div>
                        <ProjectCarousel
                            images={[
                                "/images/result.png",
                                "/images/distri.png",
                                "/images/wordcloud.png"
                            ]}
                        />
                    </div>
                </ScrollReveal>
            </div>

            <div className="relative p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
                <div className='pointer-events-none absolute right-0 left-1/3 top-8 -z-10 h-[420px] opacity-40 blur-3xl'
                    style={{
                        background: 'radial-gradient(60% 60% at 60% 40%, rgba(20,184,166,0.35), rgba(18, 8, 36, 0) 70%)'
                    }}
                />
                <ScrollReveal stagger={0.15} delay={0.8} className='grid grid-cols-1 md:grid-cols-2  items-center'>
                    {/* text content */}
                    <div className='relative md:order-2 z-10'>
                        {/* heading */}
                        <div className='mb-12 text-right'>
                            <p className='text-xs text-[#2DD4BF] '>Featured Project</p>
                            <h3 className='text-2xl md:text-3xl font-semibold text-white/90'>Taekwondo Organization Mobile Application</h3>
                        </div>

                        {/* descriptio */}
                        <div className='relative md:-ml-24 md:-mt-6 z-20 max-w-5xl rounded-2xl p-5 bg-white/6 backdrop-blur-sm border-white/10 shadow-[0_6px_50px_rgba(126, 34, 206, 0.25]'>
                            <p className='text-sm p-4 text-white/70'>
                                A mobile application designed to support the management of a taekwondo organization, providing features such as member information, announcements, and activity management.
                            </p>
                            <div className='pointer-events-none absolute -inset-px rounded-[14px] opacity-60'
                                style={{
                                    background: 'linear-gradient(135deg, rgba(20,184,166,0.35), rgba(45,212,191,0.05))',
                                }}
                            />
                        </div>
                        <div className="mt-6 flex flex-col gap-4">

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2 text-xs text-white/70">
                                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Android Development</span>
                                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Mobile Programming</span>
                                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">React Native</span>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-4">
                                <a
                                    href="https://www.youtube.com/watch?v=bkh_ZYZohT8"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition"
                                >
                                    <Play size={16} />
                                    YouTube Demo
                                </a>

                            </div>

                        </div>
                    </div>
                    {/* project images */}
                    <div className="relative mx-auto w-[220px] md:w-[260px]">

                        {/* Phone Frame */}
                        <div className="rounded-[2.5rem] border-[6px] border-[#1E293B] bg-black shadow-[0_0_60px_rgba(20,184,166,0.25)] overflow-hidden">

                            {/* Screen */}
                            <div className="rounded-[2rem] overflow-hidden">
                                <TaekwondoPhone />
                            </div>

                        </div>

                        {/* Notch */}
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full"></div>

                    </div>
                </ScrollReveal>
            </div>

            <div className="relative p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
                <div className='pointer-events-none absolute right-0 left-1/3 top-8 -z-10 h-[420px] opacity-40 blur-3xl'
                    style={{
                        background: 'radial-gradient(60% 60% at 60% 40%, rgba(20,184,166,0.35) 0%, rgba(18, 8, 36, 0) 70%)'
                    }}
                />
                <ScrollReveal stagger={0.15} className='grid grid-cols-1 md:grid-cols-2 items-center'>
                    <div className='relative -pl-50 z-10'>
                        {/* heading */}
                        <div className='mb-12'>
                            <p className='text-xs text-[#2DD4BF] '>Featured Project</p>
                            <h3 className='text-2xl md:text-3xl font-semibold text-white/90'>2D Fishing Game – Unity</h3>
                        </div>

                        {/* descriptio */}
                        <div className='relative md:-mr-24 md:-mt-6 z-20 max-w-5xl rounded-2xl p-5 bg-white/6 backdrop-blur-sm border-white/10 shadow-[0_6px_50px_rgba(20,184,166,0.25)]'>
                            <p className='text-sm p-4 text-white/70'>
                                A simple 2D fishing game developed using Unity where players catch fish through interactive gameplay mechanics. The project focuses on implementing basic game logic, UI interaction, and player controls.
                            </p>
                            <div className='pointer-events-none absolute -inset-px rounded-[14px] opacity-60'
                                style={{
                                    background: 'linear-gradient(135deg, rgba(20,184,166,0.35), rgba(45,212,191,0.05))',
                                }}
                            />
                        </div>
                        <div className="mt-6 flex flex-col gap-4">

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2 text-xs text-white/70">
                                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Unity</span>
                                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">C#</span>
                                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Game Development</span>
                                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">MBKM</span>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-4">

                                <a
                                    href="https://minus-one-studio.itch.io/fishing-legends-the-masters-angler-legacy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-[#FA5C5C] hover:bg-[#e14c4c] text-white font-medium transition"
                                >
                                    <Gamepad2 size={16} />
                                    Play on Itch.io
                                </a>

                            </div>


                        </div>
                    </div>
                    {/* project images */}
                    <div className='relative md:order-1'>
                        <ProjectCarousel
                            images={[
                                "/images/mancing (2).png",
                                "/images/mancing (4).png",
                                "/images/mancing (7).png",
                                "/images/mancing (8).png",
                                "/images/mancing (10).png",
                                "/images/mancing (11).png",


                            ]}
                        />
                    </div>
                </ScrollReveal>
            </div>

            <div className="relative p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
                <div className='pointer-events-none absolute right-0 left-1/3 top-8 -z-10 h-[420px] opacity-40 blur-3xl'
                    style={{
                        background: 'radial-gradient(60% 60% at 60% 40%, rgba(20,184,166,0.35), rgba(18, 8, 36, 0) 70%)'
                    }}
                />
                <ScrollReveal stagger={0.15} delay={0.8} className='grid grid-cols-1 md:grid-cols-2  items-center'>
                    {/* text content */}
                    <div className='relative md:order-2 z-10'>
                        {/* heading */}
                        <div className='mb-12 text-right'>
                            <p className='text-xs text-[#2DD4BF] '>Featured Project</p>
                            <h3 className='text-2xl md:text-3xl font-semibold text-white/90'>2D Platformer Game – Unity</h3>
                        </div>

                        {/* descriptio */}
                        <div className='relative md:-ml-24 md:-mt-6 z-20 max-w-5xl rounded-2xl p-5 bg-white/6 backdrop-blur-sm border-white/10 shadow-[0_6px_50px_rgba(126, 34, 206, 0.25]'>
                            <p className='text-sm p-4 text-white/70'>
                                A classic 2D platformer game featuring character movement, obstacles, and level-based gameplay. The project demonstrates fundamental game mechanics including jumping physics and collision detection.
                            </p>
                            <div className='pointer-events-none absolute -inset-px rounded-[14px] opacity-60'
                                style={{
                                    background: 'linear-gradient(135deg, rgba(20,184,166,0.35), rgba(45,212,191,0.05))',
                                }}
                            />
                        </div>
                        <div className="mt-6 flex flex-col gap-4">

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2 text-xs text-white/70">
                                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Unity</span>
                                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">C#</span>
                                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Game Development</span>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-4">

                                <a
                                    href="https://github.com/Devins16/2D-Platformer-.git"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition"
                                >
                                    <Github size={16} />
                                    GitHub
                                </a>

                            </div>

                        </div>
                    </div>
                    {/* project images */}
                    <div className='relative md:order-1'>
                        <ProjectCarousel
                            images={[
                                "/images/game.png",
                                "/images/game1.png",
                                "/images/game2.png",
                                "/images/game3.png"
                            ]}
                        />
                    </div>
                </ScrollReveal>
            </div>


        </section>
    )
}

export default Projects