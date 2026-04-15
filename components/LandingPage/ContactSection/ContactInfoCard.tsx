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
};

const ContactInfoCard = ({
  office = grandRapidsOffice,
  showSocial = true,
}: ContactInfoCardProps) => {
  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
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
    <div className="bg-white rounded-lg overflow-hidden lg:shadow-lg border">
      <div className="relative h-64 w-full">
        <Image
          src="/images/contact-form.jpg"
          alt="Innovare HP team members collaborating on healthcare marketing projects"
          title="Innovare HP team members collaborating on healthcare marketing projects"
          className="object-cover rounded-t-lg"
          fill
          sizes="(max-width: 1024px) 100vw, 1024px"
          priority
        />
      </div>

      <div className="p-6 flex flex-col xl:flex-row items-start gap-6">
        <Image
          src="/images/logo.png"
          alt="Innovare HP logo"
          title="Innovare HP logo"
          width={100}
          height={100}
        />

        <div className="space-y-6">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {details.map(
              ({ label, value, displayValue, icon: Icon, href, type }) => (
                <motion.div
                  key={label}
                  variants={item}
                  className="flex items-start gap-3"
                >
                  <Icon
                    className="w-5 h-5 text-blue-600 mt-0.5 shrink-0"
                    role="presentation"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      {label}
                    </p>
                    <Link
                      href={href}
                      className="text-sm text-gray-700 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded transition-colors"
                      aria-label={
                        type === "email"
                          ? `Send an email to ${value} (opens email application)`
                          : type === "phone"
                            ? `Call ${value} (opens phone app)`
                            : undefined
                      }
                    >
                      {displayValue || value}
                      {type === "email" && (
                        <span className="sr-only">
                          {" "}
                          (opens email application)
                        </span>
                      )}
                      {type === "phone" && (
                        <span className="sr-only">
                          {" "}
                          (initiates a phone call)
                        </span>
                      )}
                      {type === "address" && (
                        <span className="sr-only"> (opens in new tab)</span>
                      )}
                    </Link>
                  </div>
                </motion.div>
              )
            )}
          </motion.div>

          {showSocial && (
            <fieldset className="space-y-3 border-0 p-0 m-0 min-w-0">
              <legend className="text-sm font-semibold text-gray-700">
                Social Media
              </legend>
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, href, title }) => (
                  <Link
                    key={title}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${title} page (opens in new tab)`}
                    className="text-white transition bg-blue-600 p-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
    </div>
  );
};

export default ContactInfoCard;
