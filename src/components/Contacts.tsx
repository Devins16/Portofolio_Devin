'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'
import { HiOutlineMail } from 'react-icons/hi'
import ScrollReveal from './ScrollReveal'
import styles from './Contacts.module.css'

const EMAIL = 'devinsyafa12@gmail.com'
const MAILTO = `mailto:${EMAIL}?subject=Portfolio%20Contact&body=Hello,%20I%20would%20like%20to%20connect%20with%20you.`

const channels = [
    {
        idx: '01',
        name: 'LinkedIn',
        handle: 'in/devin-syafa-92b7bb22b',
        href: 'https://www.linkedin.com/in/devin-syafa-92b7bb22b/',
        icon: FaLinkedin,
        external: true,
    },
    {
        idx: '02',
        name: 'GitHub',
        handle: '@Devins16',
        href: 'https://github.com/Devins16',
        icon: FaGithub,
        external: true,
    },
    {
        idx: '03',
        name: 'Email',
        handle: EMAIL,
        href: MAILTO,
        icon: HiOutlineMail,
        external: false,
    },
]

const Contacts = () => {
    const [copied, setCopied] = useState(false)

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL)
            setCopied(true)
            setTimeout(() => setCopied(false), 1800)
        } catch {
        }
    }

    return (
        <section id='contact' className='py-24 relative'>
            <ScrollReveal stagger={0.08}>
                <div className={styles.wrap}>
                    <div className={styles.frame}>
                        <span className={`${styles.corner} ${styles.tl}`} />
                        <span className={`${styles.corner} ${styles.br}`} />

                        <div>
                            <span className={styles.tag}>INCOMING TRANSMISSION</span>
                            <br />
                            <h3 className={styles.title} data-text='CONTACT'>
                                CONTACT
                            </h3>
                            <div className={styles.bar} />

                            <p className={styles.desc}>
                                I&apos;m currently looking for opportunities in <b>data science</b> and{' '}
                                <i>software development</i>. If you have a role or project that fits my skills,
                                I&apos;d love to hear from you.
                            </p>

                            <div className={styles.chips}>
                                <div className={`${styles.chip} ${styles.ok}`}>
                                    <span>STATUS</span>
                                    <em>● OPEN TO WORK</em>
                                </div>
                                <div className={styles.chip}>
                                    <span>FOCUS</span>
                                    DATA SCI // SWE
                                </div>
                                <div className={styles.chip}>
                                    <span>REPLY TIME</span>
                                    &lt; 24H
                                </div>
                            </div>
                        </div>

                        <div className={styles.panelWrap}>
                            <div className={styles.panelBorder}>
                                <div className={styles.panel}>
                                    <div className={styles.head}>
                                        <strong>CONTACT_LIST</strong>
                                        <span>03 ENTRIES</span>
                                    </div>

                                    <ul className={styles.list}>
                                        {channels.map(({ idx, name, handle, href, icon: Icon, external }) => (
                                            <li key={name}>
                                                <Link
                                                    href={href}
                                                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                                    className={styles.row}
                                                >
                                                    <span className={styles.idx}>[{idx}]</span>
                                                    <Icon className={styles.ico} />
                                                    <span className={styles.rowName}>
                                                        {name}
                                                        <span className={styles.rowHandle}>{handle}</span>
                                                    </span>
                                                    <span className={styles.rowHint}>CONNECT ▸</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className={styles.ctaRow}>
                                        <Link href={MAILTO} className={styles.cta}>
                                            ▶ SEND TRANSMISSION
                                        </Link>
                                        <button type='button' onClick={copyEmail} className={styles.copy}>
                                            {copied ? 'COPIED ✓' : 'COPY'}
                                        </button>
                                    </div>

                                    <div className={styles.foot}>
                                        <div className={styles.signal}>
                                            <i /><i /><i /><i />
                                        </div>
                                        <span>NC-2077 // SECURE</span>
                                        <div className={styles.barcode} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </section>
    )
}

export default Contacts