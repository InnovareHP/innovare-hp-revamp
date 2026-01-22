"use client";

import { motion, Variants } from "framer-motion";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";

const contactDetails = [
  {
    label: "Phone",
    value: "(269) 501-4496",
    icon: Phone,
    href: "tel:+12695014496",
    type: "phone",
  },
  {
    label: "Email",
    value: "hello@innovarehp.com",
    icon: Mail,
    href: "mailto:hello@innovarehp.com",
    type: "email",
  },
  {
    label: "Address",
    value: "4221 Bud Drive NE, Comstock Park, MI 49321",
    displayValue: (
      <>
        4221 Bud Drive NE
        <br />
        Comstock Park, MI 49321
      </>
    ),
    icon: MapPin,
    href: "https://maps.google.com/?q=4221+Bud+Drive+NE+Comstock+Park+MI+49321",
    type: "address",
  },
  // {
  //   label: "Policy",
  //   value: (
  //     <Link href="/privacy-policy" className="text-blue-600">
  //       Privacy Policy
  //     </Link>
  //   ),
  //   icon: File,
  // },
];

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

const ContactInfoCard = () => {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden lg:shadow-lg border">
      <div className="relative h-64 w-full">
        <img
          src="/images/contact-form.jpg"
          alt="Innovare HP team members collaborating on healthcare marketing projects"
          title="Innovare HP team members collaborating on healthcare marketing projects"
          className="object-cover rounded-t-lg"
          width={1000}
          height={1000}
        />
      </div>

      <div className="p-6 flex items-start gap-6">
        <img
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
            {contactDetails.map(
              ({ label, value, displayValue, icon: Icon, href, type }) => (
                <motion.div
                  key={label}
                  variants={item}
                  className="flex items-start gap-3"
                >
                  <Icon
                    className="w-5 h-5 text-blue-600 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      {label}
                    </p>
                    {href ? (
                      <Link
                        href={href}
                        className="text-sm text-gray-700 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                        aria-label={`${label}: ${value}${type === "phone" ? ". Call us" : type === "email" ? ". Email us" : ". View on map"}`}
                      >
                        {displayValue || value}
                      </Link>
                    ) : (
                      <p className="text-sm text-gray-700">
                        {displayValue || value}
                      </p>
                    )}
                  </div>
                </motion.div>
              )
            )}
          </motion.div>

          <div className="space-y-3">
            <p
              className="text-sm font-semibold text-gray-700"
              id="social-media-heading"
            >
              Social Media
            </p>
            <nav
              className="flex gap-3"
              aria-labelledby="social-media-heading"
              aria-label="Social media links"
            >
              {socialLinks.map(({ icon: Icon, href, title }, index) => (
                <Link
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${title} page (opens in new tab)`}
                  className="text-white transition bg-blue-600 p-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  title={title}
                >
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoCard;
