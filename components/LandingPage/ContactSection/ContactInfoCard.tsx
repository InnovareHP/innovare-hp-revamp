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
import Image from "next/image";

const contactDetails = [
  { label: "Phone", value: "(269) 501-4496", icon: Phone },
  { label: "Email", value: "hello@innovarehp.com", icon: Mail },
  {
    label: "Address",
    value: (
      <>
        4221 Bud Drive NE
        <br />
        Comstock Park, MI 49321
      </>
    ),
    icon: MapPin,
  },
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
<<<<<<< HEAD
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white rounded-lg overflow-hidden lg:shadow-lg border"
    >
      <div className="relative h-64 w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="w-full h-full"
        >
          <Image
            src="/images/contact-form.jpg"
            alt="Team collaboration"
            fill
            className="object-cover rounded-t-lg"
          />
        </motion.div>
      </div>

      <div className="p-6 flex items-start gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Image
            src="/images/logo.png"
            alt="Innovare HP"
            width={100}
            height={100}
          />
        </motion.div>
=======
    <div className="bg-white rounded-lg overflow-hidden lg:shadow-lg border">
      <div className="relative h-64 w-full">
        <Image
          src="/images/contact-form.jpg"
          alt="Team collaboration"
          fill
          title="Team collaboration"
          className="object-cover rounded-t-lg"
        />
      </div>

      <div className="p-6 flex items-start gap-6">
        <Image
          src="/images/logo.png"
          alt="Innovare HP"
          width={100}
          height={100}
          title="Innovare HP"
        />
>>>>>>> 0c6d8c53094b41da72a0942d4feab7b0aa25c75e

        <div className="space-y-6">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {contactDetails.map(({ label, value, icon: Icon }) => (
              <motion.div
                key={label}
                variants={item}
                className="flex items-start gap-3"
              >
                <Icon className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-700">{label}</p>
                  <p className="text-sm text-gray-500">{value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-700">Social Media</p>
            <div className="flex gap-3">
<<<<<<< HEAD
              {socialLinks.map(({ icon: Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  whileHover={{ scale: 1.1, backgroundColor: "#1d4ed8" }}
                  whileTap={{ scale: 0.9 }}
                  className="text-white bg-blue-600 p-2 rounded-full transition-colors"
=======
              {socialLinks.map(({ icon: Icon, href, title }, index) => (
                <a
                  key={index}
                  href={href}
                  className="text-white transition bg-blue-600 p-2 rounded-full"
                  title={title}
>>>>>>> 0c6d8c53094b41da72a0942d4feab7b0aa25c75e
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactInfoCard;
