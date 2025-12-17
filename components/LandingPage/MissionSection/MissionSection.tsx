"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

const MissionSection = () => {
  // Animation variants with strict typing
  const textContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const imageReveal: Variants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] }, // Smooth cinematic ease
    },
  };

  return (
    <section
      id="mission"
      className="bg-[#414141] text-white py-16 px-8 lg:px-12 xl:px-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={textContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12"
        >
          {/* Logo Animation */}
          <motion.div variants={fadeInUp} className="flex items-center gap-3">
            <Image
              src="/images/logo-white-2.png"
              alt="Innovare HP"
              width={50}
              title="Innovare HP"
              height={50}
            />
            <h2 className="uppercase font-light text-lg font-signika tracking-[0.55em] block">
              Innovare HP
            </h2>
          </motion.div>

          {/* Paragraphs Animation */}
          <div className="md:max-w-3xl space-y-6">
            <motion.p
              variants={fadeInUp}
              className="text-lg lg:text-2xl font-normal leading-relaxed sm:leading-normal"
            >
              We are dedicated to enhancing the reach and influence of
              healthcare brands, touching lives with compassionate and
              innovative marketing approaches driven by valuable insights.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-lg lg:text-2xl font-normal leading-relaxed sm:leading-normal"
            >
              We aspire to lead a transformative growth in healthcare marketing,
              empowering brands to inspire positive change and drive meaningful
              impact.
            </motion.p>
          </div>
        </motion.div>

        {/* Cinematic Image Reveal */}
        <motion.div
          variants={imageReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full aspect-[21/9] bg-gray-300 relative overflow-hidden rounded-sm"
        >
          <Image
            src="/images/mission.jpg"
            alt="Mission Section"
            title="Mission Section"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
};

export default MissionSection;
