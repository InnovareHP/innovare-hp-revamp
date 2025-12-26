"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface NavigationProps {
  isFieldNotes?: boolean;
}

const navLinks = [
  { name: "About", href: "#about", title: "About" },
  { name: "Partners", href: "#partners", title: "Partners" },
  { name: "Process", href: "#process", title: "Process" },
  { name: "What We Do", href: "#what-we-do", title: "What We Do" },
  { name: "Service Offerings", href: "#services", title: "Service Offerings" },
  { name: "Mission", href: "#mission", title: "Mission" },
  { name: "Team", href: "#team", title: "Team" },
  { name: "Client Review", href: "#reviews", title: "Client Review" },
  { name: "Contact", href: "#contact", title: "Contact" },
  { name: "Field Notes", href: "/field-notes", title: "Field Notes" },
  // { name: "Privacy Policy", href: "/privacy-policy", title: "Privacy Policy" },
];

const Navigation = ({ isFieldNotes = false }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.3 + i * 0.1, duration: 0.4 },
    }),
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 p-6 md:p-10 pointer-events-none">
      <div className="flex justify-between items-center mx-auto w-full pointer-events-auto">
        {/* Logo Section */}
        <nav className="flex items-center gap-2">
          <Link href="/" title="Innovare HP">
            <Image
              src="/images/logo.png"
              alt="Innovare HP"
              width={100}
              title="Innovare HP"
              height={100}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
            />
          </Link>
          <span
            className={`uppercase font-light text-lg font-signika tracking-[0.55em] sm:block hidden ${isFieldNotes ? "text-black" : "text-white"}`}
          >
            Innovare HP
          </span>
        </nav>

        {/* Burger Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-50 flex flex-col justify-between w-8 h-6 group"
          aria-label="Toggle Menu"
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
            className={`w-full h-[2px] rounded-full transition-colors ${isOpen || !isFieldNotes ? "bg-blue-400" : "bg-black"}`}
          />
          <motion.span
            animate={isOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
            className={`w-full h-[2px] rounded-full transition-colors ${isOpen || !isFieldNotes ? "bg-blue-400" : "bg-black"}`}
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -12 } : { rotate: 0, y: 0 }}
            className={`w-full h-[2px] rounded-full transition-colors ${isOpen || !isFieldNotes ? "bg-blue-400" : "bg-black"}`}
          />
        </button>
      </div>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={{
              closed: {
                opacity: 0,
                x: "100%",
                transition: { duration: 0.5, ease: "easeInOut" },
              },
              open: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.5, ease: "easeInOut" },
              },
            }}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-black text-white z-40 flex flex-col justify-center items-center pointer-events-auto"
          >
            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  custom={i}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl sm:text-4xl font-light uppercase tracking-widest hover:text-gray-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navigation;
