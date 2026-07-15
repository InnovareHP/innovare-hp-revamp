"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ContactInfoCard, { type OfficeContact } from "./ContactInfoCard";
import ContactSection from "./ContactSection";

type OfficeKey = "grand-rapids" | "ann-arbor";

type OfficeConfig = {
  key: OfficeKey;
  name: string;
  shortName: string;
  tagline: string;
  meta: string;
  description: string;
  mapsHref: string;
  icon: typeof MapPin;
  imageSrc?: string;
  data?: OfficeContact;
};

const annArborOffice: OfficeContact = {
  email: {
    value: "hello@innovarehp.com",
    href: "mailto:hello@innovarehp.com",
  },
  address: {
    value:
      "South State Commons, 2723 S. State St., Suite 150, Ann Arbor, MI 48104",
    displayValue: (
      <>
        South State Commons
        <br />
        2723 S. State St., Suite 150
        <br />
        Ann Arbor, MI 48104
      </>
    ),
    href: "https://maps.google.com/?q=2723+S+State+St+Suite+150+Ann+Arbor+MI+48104",
  },
};

const offices: OfficeConfig[] = [
  {
    key: "grand-rapids",
    name: "Grand Rapids Office",
    shortName: "Grand Rapids",
    tagline: "Headquarters",
    meta: "Comstock Park, MI · (269) 501-4496",
    description:
      "Our Comstock Park headquarters is the heart of the Innovare HP team — home base for our strategy, creative, and growth experts serving healthcare partners across the country.",
    mapsHref:
      "https://maps.google.com/?q=4221+Bud+Drive+NE+Comstock+Park+MI+49321",
    icon: MapPin,
  },
  {
    key: "ann-arbor",
    name: "Ann Arbor Office",
    shortName: "Ann Arbor",
    tagline: "Now open",
    meta: "South State Commons, Ann Arbor, MI",
    description:
      "We're proud to expand into Southeast Michigan, bringing strategic healthcare growth, marketing, and brand expertise closer to the partners and communities we serve. Stop by South State Commons or drop us a line anytime.",
    mapsHref:
      "https://maps.google.com/?q=2723+S+State+St+Suite+150+Ann+Arbor+MI+48104",
    icon: MapPin,
    imageSrc: "/images/contact-form-3.jpg",
    data: annArborOffice,
  },
];

const ContactPage = () => {
  const [activeOffice, setActiveOffice] = useState<OfficeKey | null>(
    "grand-rapids"
  );

  return (
    <footer id="contact" className="relative overflow-hidden bg-white">
      {/* Ambient background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-blue-50/60 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 md:px-8 md:py-20 lg:px-12 lg:py-28">
        {/* Intro */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-[1.05]">
            Two offices.{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              One mission.
            </span>
          </h2>
          <p className="text-gray-600 mt-5 md:text-lg leading-relaxed">
            From our Grand Rapids headquarters to our brand-new Ann Arbor
            office, the Innovare HP team is closer than ever to the healthcare
            partners we serve.
          </p>
        </div>

        {/* Offices — single-open accordion */}
        <Accordion
          type="single"
          collapsible
          value={activeOffice ?? ""}
          onValueChange={(v) => setActiveOffice((v as OfficeKey) || null)}
          className="max-w-6xl mx-auto space-y-4 md:space-y-5"
        >
          {offices.map((office) => {
            const isOpen = activeOffice === office.key;
            const Icon = office.icon;
            return (
              <AccordionItem
                key={office.key}
                value={office.key}
                className={`group/card rounded-3xl border transition-all duration-500 overflow-hidden last:border-b ${
                  isOpen
                    ? "border-blue-200 bg-white shadow-[0_20px_60px_-20px_rgba(37,99,235,0.25)]"
                    : "border-gray-200/70 bg-white/70 hover:border-blue-200 hover:bg-white hover:shadow-lg"
                }`}
              >
                <AccordionTrigger className="flex w-full items-center justify-between gap-4 p-6 md:p-8 text-left rounded-none hover:no-underline">
                  <div className="flex items-center gap-5 min-w-0 flex-1">
                    <div
                      className={`flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl shrink-0 transition-all duration-500 ${
                        isOpen
                          ? "bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30 scale-105"
                          : "bg-blue-50 text-blue-600 group-hover/card:bg-blue-100"
                      }`}
                    >
                      <Icon
                        className="w-6 h-6 md:w-7 md:h-7"
                        role="presentation"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.18em] text-blue-600 mb-1">
                        {office.tagline}
                      </p>
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight truncate">
                        {office.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1 truncate">
                        {office.meta}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-0">
                  <div className="border-t border-gray-100 p-5 md:p-8 lg:p-10 bg-gradient-to-b from-blue-50/30 via-white to-white">
                    <ContactInfoCard
                      office={office.data}
                      showSocial={office.key === "grand-rapids"}
                      imageSrc={office.imageSrc}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        {/* Shared form */}
        <div
          id="contact-form"
          className="max-w-6xl mx-auto mt-20 md:mt-28 scroll-mt-24"
        >
          <div className="text-center mb-8 md:mb-10">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-[1.1]">
              Have a question for{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                either office?
              </span>
            </h3>
            <p className="text-gray-600 mt-4 md:text-lg max-w-2xl mx-auto">
              Send us a message and the right team will get back to you within
              one business day.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <ContactSection />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200/70 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl mx-auto text-sm text-gray-600">
            <p>
              &copy; {new Date().getFullYear()} Innovare HP. All rights
              reserved.
            </p>
            <nav aria-label="Footer links">
              <Link
                href="/privacy-policy"
                className="hover:text-blue-700 transition-colors underline"
              >
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactPage;
