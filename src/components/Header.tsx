"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isScrolled || isOpen
          ? "bg-[#0b0416]/70 backdrop-blur-md shadow-[0_0_40px_rgba(113,39,186,0.20)]"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* logo */}
        <Link href="/" className="text-3xl font-extrabold text-[#2DD4BF]">𓅈</Link>

        {/* dekstop navigation */}
        <nav className="hidden md:flex space-x-10 font-medium text-lg text-white/80">
          <Link href="#home" className="hover:text-[#a855f7] transition duration-200">Home</Link>
          <Link href="#about" className="hover:text-[#a855f7] transition duration-200">About Me</Link>
          <Link href="#projects" className="hover:text-[#a855f7] transition duration-200">Projects</Link>
          <Link href="#contact" className="hover:text-[#a855f7] transition duration-200">Contact</Link>
        </nav>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded text-white/80 hover:text-[#a855f7] transition duration-200">
          <FaBarsStaggered className="size-6" /></button>
      </div>

      {/* mobile menu */}
      {
        isOpen && (
          <div className="md:hidden px-6 pb-4">
            <div className="flex flex-col gap-3 text-base font-medium  text-white/80">
              <Link href="#home" className="hover:text-[#a855f7] transition duration-200" onClick={() => setIsOpen(false)}>Home</Link>
              <Link href="#about" className="hover:text-[#a855f7] transition duration-200" onClick={() => setIsOpen(false)}>About Me</Link>
              <Link href="#projects" className="hover:text-[#a855f7] transition duration-200" onClick={() => setIsOpen(false)}>Projects</Link>
              <Link href="#contact" className="hover:text-[#a855f7] transition duration-200" onClick={() => setIsOpen(false)}>Contact</Link>
            </div>
          </div>
        )
      }
    </header>
  );
};

export default Header;