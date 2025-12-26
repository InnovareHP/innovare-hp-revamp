"use client";

import WorkWithUsButton from "@/components/ui/work-with-us-button";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

const HeroSection = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const bgVariants: Variants = {
    hidden: { scale: 1.05 },
    visible: {
      scale: 1,
      transition: {
        duration: 2,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative w-full min-h-[100vh] flex items-end overflow-hidden bg-gray-900">
      <motion.div
        variants={bgVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src="/images/hero-section.jpg"
          alt="Hero Section"
          title="Hero Section"
          fill
          priority
          // 1. SHIFT IMAGE POSITION:
          // 'object-top' or '50% 20%' ensures the subjects are pushed
          // toward the top of the screen on mobile, away from the bottom-aligned text.
          className="object-cover object-[50%_20%] sm:object-center"
        />
        {/* 2. BETTER OVERLAY:
            Added a gradient that is darker at the bottom to ensure text 
            readability while keeping the top clearer for the image subjects. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent sm:bg-black/60" />
      </motion.div>

      <div className="relative z-10 w-full px-8 sm:px-6 md:px-12 lg:px-20 pb-12 pt-4 sm:py-24 sm:pb-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          // 3. TEXT SPACING:
          // Reduced font size slightly for mobile and added a larger bottom margin (mb-6)
          // to keep the text block compact at the very bottom.
          className="max-w-4xl space-y-3 sm:space-y-4 mb-6 sm:mb-0"
        >
          <motion.h1
            variants={itemVariants}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight font-bold"
          >
            Marketing that empowers healthcare brands to stand apart and stay
            ahead.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-2xl md:text-3xl text-gray-200 max-w-xl tracking-wide"
          >
            <strong>Innovare HP</strong> delivers full-service healthcare
            marketing for organizations that want to lead—not follow.
          </motion.p>

          <motion.div variants={itemVariants} className="pt-2 sm:pt-4">
            <WorkWithUsButton variant="hero" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
