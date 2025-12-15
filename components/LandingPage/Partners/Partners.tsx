"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const logos = [
  "25",
  "10",
  "22",
  "9",

  "6",
  "23",
  "11",
  "16",

  "21",
  "13",
  "19",
  "17",

  "18",
  "15",
  "12",
  "18",

  "7",
  "14",
  "24",
  "25",

  "8",
  "6",
];

const Partners = () => {
  //Pending pictures
  return (
    <section className="bg-muted/30 py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-4xl md:text-5xl font-semibold text-left">
            Who we partner with
          </p>
        </motion.div>

        {/* Logos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6"
        >
          {logos.map((n, index) => (
            <div
              key={`${n}-${index}`}
              className="flex items-center justify-center p-4 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all"
            >
              <Image
                src={`/images/testimonials/Innovare-HP-Brochure-(${n}).png`}
                alt="Innovare HP Partner"
                width={220}
                height={220}
                className="object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;
