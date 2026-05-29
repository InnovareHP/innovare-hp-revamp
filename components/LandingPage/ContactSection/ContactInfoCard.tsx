"use client";

import { motion, type Variants } from "framer-motion";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export type OfficeContact = {
  phone?: { value: string; href: string };
  email: { value: string; href: string };
  address: {
    value: string;
    displayValue: ReactNode;
    href: string;
  };
};

const grandRapidsOffice: OfficeContact = {
  phone: { value: "(269) 501-4496", href: "tel:+12695014496" },
  email: { value: "hello@innovarehp.com", href: "mailto:hello@innovarehp.com" },
  address: {
    value: "4221 Bud Drive NE, Comstock Park, MI 49321",
    displayValue: (
      <>
        4221 Bud Drive NE
        <br />
        Comstock Park, MI 49321
      </>
    ),
    href: "https://maps.google.com/?q=4221+Bud+Drive+NE+Comstock+Park+MI+49321",
  },
};

const socialLinks = [
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/company/innovarehp",
    title: "LinkedIn",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/innovarehp/",
    title: "Instagram",
  },
  {
    icon: Facebook,
    href: "https://www.facebook.com/innovarehp",
    title: "Facebook",
  },
];

type ContactInfoCardProps = {
  office?: OfficeContact;
  showSocial?: boolean;
  imageSrc?: string;
};

const ContactInfoCard = ({
  office = grandRapidsOffice,
  showSocial = true,
  imageSrc = "/images/contact-form.jpg",
}: ContactInfoCardProps) => {
  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const item: Variants = {
    hidden: { x: -10 },
    show: { x: 0, transition: { duration: 0.4 } },
  };

  const details: Array<{
    label: string;
    value: string;
    displayValue?: ReactNode;
    icon: typeof Phone;
    href: string;
    type: "phone" | "email" | "address";
  }> = [];

  if (office.phone) {
    details.push({
      label: "Phone",
      value: office.phone.value,
      icon: Phone,
      href: office.phone.href,
      type: "phone",
    });
  }

  details.push({
    label: "Email",
    value: office.email.value,
    icon: Mail,
    href: office.email.href,
    type: "email",
  });

  details.push({
    label: "Address",
    value: office.address.value,
    displayValue: office.address.displayValue,
    icon: MapPin,
    href: office.address.href,
    type: "address",
  });

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-[0_10px_40px_-15px_rgba(37,99,235,0.15)] hover:shadow-[0_20px_60px_-20px_rgba(37,99,235,0.25)] transition-shadow duration-500">
      {/* Hero image with gradient + logo overlay */}
      <div className="relative h-56 md:h-64 w-full">
        <Image
          src={imageSrc}
          alt="Innovare HP team members collaborating on healthcare marketing projects"
          title="Innovare HP team members collaborating on healthcare marketing projects"
          className="object-cover"
          fill
          sizes="(max-width: 1024px) 100vw, 1024px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/70 via-blue-900/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-white/80 text-[11px] font-semibold uppercase tracking-[0.2em] mb-1">
              Let&apos;s connect
            </p>
            <h3 className="text-white text-xl md:text-2xl font-bold leading-tight tracking-tight">
              Reach out anytime
            </h3>
          </div>
          <div className="bg-white rounded-2xl p-2.5 shadow-xl shrink-0">
            <Image
              src="/images/logo.png"
              alt="Innovare HP logo"
              title="Innovare HP logo"
              width={56}
              height={56}
            />
          </div>
        </div>
      </div>

      <div className="p-6 md:p-7 space-y-6">
        <motion.ul
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-3"
        >
          {details.map(
            ({ label, value, displayValue, icon: Icon, href, type }) => (
              <motion.li key={label} variants={item}>
                <Link
                  href={href}
                  target={type === "address" ? "_blank" : undefined}
                  rel={type === "address" ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-4 rounded-2xl p-4 -mx-2 hover:bg-blue-50/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all"
                  aria-label={
                    type === "email"
                      ? `Send an email to ${value} (opens email application)`
                      : type === "phone"
                        ? `Call ${value} (opens phone app)`
                        : undefined
                  }
                >
                  <span className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 group-hover:from-blue-600 group-hover:to-blue-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all shrink-0">
                    <Icon
                      className="w-6 h-6 md:w-7 md:h-7"
                      role="presentation"
                    />
                  </span>
                  <span className="flex flex-col min-w-0 flex-1">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-blue-600 mb-0.5">
                      {label}
                    </span>
                    <span className="text-base md:text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors leading-tight">
                      {displayValue || value}
                    </span>
                  </span>
                  <span className="sr-only">
                    {type === "email"
                      ? " (opens email application)"
                      : type === "phone"
                        ? " (initiates a phone call)"
                        : " (opens in new tab)"}
                  </span>
                </Link>
              </motion.li>
            )
          )}
        </motion.ul>

        {showSocial && (
          <fieldset className="border-0 p-0 m-0 min-w-0 pt-5 border-t border-gray-100">
            <legend className="text-[11px] font-semibold uppercase tracking-[0.15em] text-blue-600 mt-5 mb-3">
              Follow us
            </legend>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, title }) => (
                <Link
                  key={title}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${title} page (opens in new tab)`}
                  className="group flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 hover:from-blue-600 hover:to-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all hover:-translate-y-0.5"
                  title={title}
                >
                  <Icon className="w-6 h-6" role="presentation" />
                </Link>
              ))}
            </div>
          </fieldset>
        )}
      </div>
    </div>
  );
};

export default ContactInfoCard;
