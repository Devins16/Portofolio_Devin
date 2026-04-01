import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import ScrollReveal from './ScrollReveal';

type SkillItem = {
  title: string;
  description: string;
  image: string;
}

const skillItem: SkillItem[] = [
  {
    title: 'Education',
    description: 'I am a Bachelor of Information Technology student at Islamic University of Riau (2021 — 2025), focusing on data science, machine learning, and software development. During my studies, I have worked on various academic and personal projects that strengthened my analytical and programming skills.',
    image: "/images/Education.png"
  },
  {
    title: 'Skills',
    description: 'I work with technologies related to data science and software development, including Python, SQL, machine learning frameworks, and modern web technologies. I enjoy building data-driven solutions and continuously improving my technical abilities.',
    image: "/images/skill.png"
  },
  {
    title: 'Interests',
    description: 'I am particularly interested in data science, machine learning, and artificial intelligence. I enjoy exploring how data and intelligent systems can be used to solve real-world problems and create impactful digital solutions.',
    image: "/images/interest.png"
  },
  {
    title: 'Tools & Technologies',
    description: 'I regularly use tools such as Python, Pandas, Scikit-learn, TensorFlow, Git, and modern development environments. These tools help me analyze data, build machine learning models, and develop practical applications.',
    image: "/images/tool.png"
  },
];

const AboutMe = () => {
  return (
    <section id='about' className='relative py-24'>
      {/* glow effect */}
      <div
        className='pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[90vw] sm:w-[760px] md:w-[1000px] h-[280px] sm:h-[380px] md:h-[520px] opacity-40 blur-3xl'
        style={{
          background:
            'radial-gradient(60% 60% at 50% 0%, rgba(20,184,166,0.55) 0%, rgba(45,212,191,0) 70%)'
        }}
      />

      <div>
        <h3 className='text-2xl md:text-3xl font-semibold text-white/90 mb-8'>
          About Me
        </h3>

        <ScrollReveal
          stagger={0.11}
          className='grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 md:gap-8'
        >
          {skillItem.map((item, index) => (
            <article
              key={index}
              className='group relative overflow-hidden rounded-2xl p-5 sm:p-6 md:p-7 bg-[#0F172A] border border-[#1E293B] shadow-[0_10px_40px_rgba(20,184,166,0.25)] transition-all duration-300 hover:-translate-y-1 md:-translate-y-2 hover:border-[#14B8A6]/60 hover:shadow-[0_20px_60px_rgba(20,184,166,0.40)]'
            >
              {/* card gradients */}
              <div
                className='pointer-events-none absolute inset-0 rounded-2xl opacity-70 transition-opacity duration-300 group-hover:opacity-90'
                style={{
                  background:
                    'radial-gradient(120% 80% at 80% 10%, rgba(20,184,166,0.35) 0%, rgba(45,212,191,0.15) 25%, rgba(2,6,23,0) 60%)'
                }}
              ></div>

              <div className='relative flex flex -col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 md:gap-8'>
                {/* icon */}
                <div className='relative shrink-0 w-16 h-16 sm:size-20 md:size-24 transition-transform duration-300 group-hover:-translate-y-1'>
                  <Image src={item.image} alt={item.title} fill className="object-contain drop-shadow-[0_8px_24px_rgba(113, 39, 186, 0.35)]" />
                </div>

                {/* text content */}
                <div>
                  <h4 className='text-base sm:text-lg md:text-xl font-semibold text-white mt-4 mb-2'>{item.title}</h4>
                  <p className='mt-2 text-xs md:text-sm text-white/60 max-w-sm mx-auto sm:mx-0 text-justify leading-relaxed'>{item.description}</p>
                  <div className='mt-4 flex justify-center sm:justify-start'>

                  </div>
                </div>
              </div>
            </article>
          ))
          }
        </ScrollReveal>
      </div>
    </section>

  )
}

export default AboutMe