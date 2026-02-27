"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ContactInfoCard from "./ContactInfoCard";
import ContactSection from "./ContactSection";

const ContactPage = () => {
  return (
    <footer id="contact" className="overflow-hidden">
      <div className="container mx-auto p-4 md:p-8 lg:p-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 max-w-6xl mx-auto"
        >
          <div className="lg:sticky lg:top-8 self-start">
            <ContactInfoCard />
          </div>

          <div>
            <ContactSection />
          </div>
        </motion.div>
      </div>

      <div className="border-t border-gray-200 bg-gray-50 mt-8">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl mx-auto text-sm text-gray-600">
            <p>&copy; {new Date().getFullYear()} Innovare HP. All rights reserved.</p>
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
