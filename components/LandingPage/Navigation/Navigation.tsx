"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface NavigationProps {
  isFieldNotes?: boolean;
}

const navLinks = [
  { name: "About", href: "#about", title: "About" },
  { name: "Services", href: "#services", title: "Services" },
  { name: "Our Approach", href: "#process", title: "Our Approach" },
  { name: "Client Stories", href: "#reviews", title: "Client Stories" },
  { name: "Mission", href: "#mission", title: "Mission" },
  { name: "Team", href: "#team", title: "Team" },
  { name: "Events", href: "/events", title: "Events" },
  { name: "Field Notes", href: "/field-notes", title: "Field Notes" },
  { name: "Contact", href: "#contact", title: "Contact" },
  { name: "Privacy Policy", href: "/privacy-policy", title: "Privacy Policy" },
];

const Navigation = ({ isFieldNotes = false }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Hash links only resolve on the landing page; prefix them elsewhere.
  const getHref = (href: string) =>
    pathname !== "/" && href.startsWith("#") ? `/${href}` : href;

  // Keyboard handling and focus trapping for the overlay menu.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        const menuButton = document.querySelector(
          '[aria-controls="navigation-menu"]'
        ) as HTMLElement;
        menuButton?.focus();
      }

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
      document.body.style.overflow = "hidden";

      setTimeout(() => {
        const firstLink = document.querySelector(
          "#navigation-menu a"
        ) as HTMLElement;
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

  const barLine =
    "block h-[2px] w-full rounded-full bg-white transition-transform duration-300";

  return (
    <>
      <Link
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-[60] focus-visible:rounded-md focus-visible:bg-white focus-visible:px-4 focus-visible:py-2 focus-visible:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        Skip to main content
      </Link>

      <header
        className={`fixed inset-x-0 top-0 z-50 bg-brand ${
          isFieldNotes ? "shadow-sm" : ""
        }`}
      >
        <div className="hp-container flex h-16 items-center justify-between lg:h-[81px]">
          <Link
            href="/"
            title="Innovare HP"
            aria-label="Innovare HP home page"
            className="no-underline"
          >
            <Image
              src="/images/redesign/logo-wordmark.webp"
              alt="Innovare HP"
              width={640}
              height={125}
              priority
              className="h-8 w-auto lg:h-[45px]"
            />
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-50 flex h-6 w-8 flex-col justify-between"
            aria-label={
              isOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isOpen}
            aria-controls="navigation-menu"
          >
            <span
              className={`${barLine} ${isOpen ? "translate-y-[11px] rotate-45" : ""}`}
            />
            <span
              className={`${barLine} ${isOpen ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`${barLine} ${isOpen ? "-translate-y-[11px] -rotate-45" : ""}`}
            />
          </button>
        </div>

        {/* Overlay menu — always mounted so aria-controls stays valid. */}
        <div
          id="navigation-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          aria-hidden={!isOpen}
          inert={!isOpen}
          className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-brand-deep text-white transition-transform duration-500 ease-in-out ${
            isOpen ? "translate-x-0" : "pointer-events-none translate-x-full"
          }`}
        >
          <nav
            className="flex max-h-[80vh] flex-col gap-5 overflow-y-auto px-6 text-center"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={getHref(link.href)}
                onClick={() => setIsOpen(false)}
                className="text-xl tracking-[0.15em] uppercase underline transition-colors hover:text-white/70 focus:ring-2 focus:ring-white focus:outline-none sm:text-3xl"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navigation;
