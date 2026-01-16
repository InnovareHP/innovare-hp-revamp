"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
  { name: "Privacy Policy", href: "/privacy-policy", title: "Privacy Policy" },
];

const Navigation = ({ isFieldNotes = false }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Helper function to get the correct href based on current path
  const getHref = (href: string) => {
    // If we're not on the home page and the link is a hash link, prepend "/"
    if (pathname !== "/" && href.startsWith("#")) {
      return `/${href}`;
    }
    return href;
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY || window.pageYOffset;
      setIsScrolled(scrollPosition > 0);
    };

    // Check initial scroll position
    handleScroll();

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle keyboard navigation and focus management for mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        // Return focus to menu button
        const menuButton = document.querySelector('[aria-controls="navigation-menu"]') as HTMLElement;
        menuButton?.focus();
      }
      
      // Trap focus within dialog when open
      if (isOpen && e.key === "Tab") {
        const dialog = document.getElementById("navigation-menu");
        if (!dialog) return;
        
        const focusableElements = dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
      
      // Focus first link in menu when it opens
      setTimeout(() => {
        const firstLink = document.querySelector('#navigation-menu a') as HTMLElement;
        firstLink?.focus();
      }, 100);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.3 + i * 0.1, duration: 0.4 },
    }),
  };

  return (
    <>
      {/* Skip to main content link for keyboard navigation */}
      <Link
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Skip to main content
      </Link>
      <header 
        className="fixed top-0 left-0 w-full z-50 px-6 py-2 md:px-6 md:py-2 pointer-events-none bg-white"
        role="banner"
      >
        <div className="flex justify-between items-center mx-auto w-full pointer-events-auto">
          {/* Logo Section */}
          <nav className="flex items-center gap-2" aria-label="Main navigation" role="navigation">
            <Link href="/" title="Innovare HP" aria-label="Innovare HP home page">
              <Image
                src="/images/logo.png"
                alt="Innovare HP logo"
                width={100}
                title="Innovare HP logo"
                height={100}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
              />
            </Link>
            <span
              className={`uppercase font-light text-lg font-signika tracking-[0.55em] sm:block hidden ${isFieldNotes || isScrolled ? "text-black" : "text-white"}`}
            >
              Innovare HP
            </span>
          </nav>

          {/* Burger Icon */}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-50 flex flex-col justify-between w-8 h-6 group"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="navigation-menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
              className={`w-full h-[2px] rounded-full transition-colors ${
                isOpen
                  ? "bg-blue-600"
                  : isScrolled
                    ? "bg-blue-600"
                    : isFieldNotes
                      ? "bg-black"
                      : "bg-white"
              }`}
            />
            <motion.span
              animate={isOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
              className={`w-full h-[2px] rounded-full transition-colors ${
                isOpen
                  ? "bg-blue-600"
                  : isScrolled
                    ? "bg-blue-600"
                    : isFieldNotes
                      ? "bg-black"
                      : "bg-white"
              }`}
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -12 } : { rotate: 0, y: 0 }}
              className={`w-full h-[2px] rounded-full transition-colors ${
                isOpen
                  ? "bg-blue-600"
                  : isScrolled
                    ? "bg-blue-600"
                    : isFieldNotes
                      ? "bg-black"
                      : "bg-white"
              }`}
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
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              id="navigation-menu"
            >
              <nav className="flex flex-col gap-6 text-center" role="navigation" aria-label="Site navigation">
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
                      href={getHref(link.href)}
                      onClick={() => setIsOpen(false)}
                      className="text-2xl sm:text-4xl font-light uppercase tracking-widest hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded underline focus:no-underline"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navigation;
