"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ContactInfoCard, { type OfficeContact } from "./ContactInfoCard";
import ContactSection from "./ContactSection";

const annArborOffice: OfficeContact = {
  email: { value: "hello@innovarehp.com", href: "mailto:hello@innovarehp.com" },
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

type OfficeKey = "grand-rapids" | "ann-arbor";

const ContactPage = () => {
  const [openOffices, setOpenOffices] = useState<Record<OfficeKey, boolean>>({
    "grand-rapids": true,
    "ann-arbor": false,
  });

  const toggle = (key: OfficeKey) =>
    setOpenOffices((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <footer id="contact" className="overflow-hidden">
      <div className="container mx-auto p-4 md:p-8 lg:p-12">
        <div className="max-w-6xl mx-auto">
          {/* Brag banner */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Two Offices. One Mission.
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              From our Grand Rapids headquarters to our brand-new Ann Arbor
              office, the Innovare HP team is closer than ever to the healthcare
              partners we serve.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto space-y-4">
          {/* Grand Rapids Office */}
          <Collapsible
            open={openOffices["grand-rapids"]}
            onOpenChange={() => toggle("grand-rapids")}
            className="rounded-lg border bg-white shadow-sm"
          >
            <CollapsibleTrigger
              className="group flex w-full items-center justify-between gap-4 p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg"
              aria-label="Toggle Grand Rapids Office details"
            >
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  Grand Rapids Office
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Comstock Park, MI — Headquarters
                </p>
              </div>
              <ChevronDown
                className="h-6 w-6 text-blue-600 transition-transform duration-200 group-data-[state=open]:rotate-180 shrink-0"
                role="presentation"
              />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="border-t p-4 md:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
                  <div className="lg:sticky lg:top-8 self-start">
                    <ContactInfoCard />
                  </div>
                  <div>
                    <ContactSection />
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Ann Arbor Office */}
          <Collapsible
            open={openOffices["ann-arbor"]}
            onOpenChange={() => toggle("ann-arbor")}
            className="rounded-lg border bg-white shadow-sm"
          >
            <CollapsibleTrigger
              className="group flex w-full items-center justify-between gap-4 p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg"
              aria-label="Toggle Ann Arbor Office details"
            >
              <div className="flex items-center gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                      Ann Arbor Office
                    </h2>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    South State Commons, Ann Arbor, MI
                  </p>
                </div>
              </div>
              <ChevronDown
                className="h-6 w-6 text-blue-600 transition-transform duration-200 group-data-[state=open]:rotate-180 shrink-0"
                role="presentation"
              />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="border-t p-4 md:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  <div>
                    <ContactInfoCard
                      office={annArborOffice}
                      showSocial={false}
                    />
                  </div>
                  <div className="space-y-5 lg:pt-6">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wide border border-blue-100">
                      <MapPin className="w-3.5 h-3.5" role="presentation" />
                      Now Open
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                      Welcome to our Ann Arbor home.
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      We&apos;re proud to expand into Southeast Michigan,
                      bringing strategic healthcare growth, marketing, and brand
                      expertise closer to the partners and communities we serve.
                      Stop by South State Commons or drop us a line anytime.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <Link
                        href="mailto:hello@innovarehp.com"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Email our team
                      </Link>
                      <Link
                        href="https://maps.google.com/?q=2723+S+State+St+Suite+150+Ann+Arbor+MI+48104"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-700 font-semibold rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Get directions
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>

      <div className="border-t border-gray-200 bg-gray-50 mt-8">
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
