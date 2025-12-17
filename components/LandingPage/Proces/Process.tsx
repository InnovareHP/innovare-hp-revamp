"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Process = () => {
  return (
    <section
      id="process"
      className="relative w-full h-[110vw] sm:h-[100vw] overflow-hidden bg-[#f8f9fa]" // Added a background color to prevent flicker
    >
      <motion.div
        className="absolute bottom-0 left-0 w-full select-none pointer-events-none"
        initial={{ opacity: 0, y: 100, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }} // Triggers when 20% of the image is visible
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for a smooth "boutique" feel
        }}
      >
        <Image
          src="/images/services/Services.png"
          alt="Services Process"
          width={1920}
          height={1080}
          sizes="100vw"
          className="w-full h-auto object-cover"
          priority
        />
      </motion.div>
    </section>
  );
};

export default Process;
