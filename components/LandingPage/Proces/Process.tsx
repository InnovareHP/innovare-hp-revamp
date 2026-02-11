"use client";

import { motion } from "framer-motion";

const Process = () => {
  return (
    <section
      id="process"
      className="relative w-full h-[110vw] sm:h-[100vw] overflow-hidden bg-[#f8f9fa]"
      aria-label="Process section"
    >
      <motion.div
        className="absolute bottom-0 left-0 w-full select-none pointer-events-none"
        initial={{ y: 100, scale: 0.95 }}
        whileInView={{ y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <img
          src="/images/services/Services.png"
          alt="Innovare HP service offerings and process workflow diagram"
          width={1920}
          height={1080}
          className="w-full h-auto object-cover"
          title="Innovare HP service offerings and process workflow diagram"
        />
      </motion.div>
    </section>
  );
};

export default Process;
