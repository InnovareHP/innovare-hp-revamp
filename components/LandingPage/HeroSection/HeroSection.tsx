"use client";

import WorkWithUsButton from "@/components/ui/work-with-us-button";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

const HeroSection = () => {
  // Container variant: Smoothly brings in the text elements
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

  // Item variant: Slide and fade without causing flashes
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

  // Static/Scale variant: We remove the Opacity 0 to prevent the flash
  const bgVariants: Variants = {
    hidden: { scale: 1.05 },
    visible: {
      scale: 1,
      transition: {
        duration: 2, // Slow, elegant zoom out
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative w-full min-h-[80vh] flex items-end overflow-hidden bg-gray-900">
      {/* Background remains dark (bg-gray-900) immediately. 
         Only the scale effect is applied to the image. 
      */}
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
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>

      <div className="relative z-10 w-full px-8 sm:px-6 md:px-12 lg:px-20 py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl space-y-4"
        >
          <motion.h1
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tightest font-bold"
          >
            Marketing that empowers healthcare brands to stand apart and stay
            ahead.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-gray-200 max-w-xl tracking-wide"
          >
            Innovare HP delivers full-service healthcare marketing for
            organizations that want to lead—not follow.
          </motion.p>

          <motion.div variants={itemVariants} className="pt-4">
            <WorkWithUsButton variant="hero" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
