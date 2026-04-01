import React from 'react'
import Link from 'next/link'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa6'
import { HiOutlineMail } from "react-icons/hi";
import ScrollReveal from './ScrollReveal';

const Contacts = () => {
    return (
        <section id='contact' className='py-24 relative'>
            <ScrollReveal stagger={0.08}>
                <h3 className='text-2xl md:text-3xl font-semibold text-white/90 mb-7'>Contact</h3>
                <p className='text-sm text-white/60 max-w-xl'>I'm currently looking for opportunities in data science and software development.
                    If you have a role or project that fits my skills, I'd love to hear from you.</p>
                <div className='mt-6 text-white/80'>
                    <Link href="mailto:devinsyafa12@gmail.com" className='hover:text-[#a855f7]'>devinsyafa12@gmail.com</Link>
                </div>

                <div className='mt-6 flex items-center gap-4 text-white/80'>
                    <Link href="https://www.linkedin.com/in/devin-syafa-92b7bb22b/" target="_blank" rel="noopener noreferrer" className='hover:text-[#a855f7]'><FaLinkedin className='size-5' /></Link>

                    <Link href="https://github.com/Devins16" target="_blank" rel="noopener noreferrer" className='hover:text-[#a855f7]'><FaGithub className='size-5' /></Link>

                    <Link
                        href="mailto:devinsyafa12@gmail.com?subject=Portfolio%20Contact&body=Hello,%20I%20would%20like%20to%20connect%20with%20you."
                        className="hover:text-[#a855f7]"
                    >
                        <HiOutlineMail className="size-5" />
                    </Link>

                </div>
            </ScrollReveal>
        </section>
    )
}

export default Contacts