"use client";

import { motion, Variants } from "framer-motion"; // Import Variants type
import Image from "next/image";

const AboutSection = () => {
  // Explicitly typing variants fixes the "ease" string error
  const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      id="about"
      className="flex flex-col lg:flex-row min-h-[70vh] overflow-hidden"
    >
      {/* Left side - Image */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInLeft}
        className="w-full lg:w-1/2 bg-gray-200 flex items-center justify-center relative min-h-[400px] lg:min-h-[70vh]"
      >
        <Image
          src="/images/about/about-img.png"
          alt="Innovare HP Team"
          fill
          className="object-cover"
          priority
          quality={100}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </motion.div>

      {/* Right side - Content */}
      <div className="w-full lg:w-1/2 bg-[#ded8d3] flex items-center justify-center p-8 lg:p-12 xl:p-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          // We can also type inline objects to prevent errors
          variants={
            {
              visible: { transition: { staggerChildren: 0.2 } },
            } as Variants
          }
          className="w-full max-w-2xl space-y-8"
        >
          <motion.h1
            variants={fadeInRight}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-relaxed sm:leading-tight"
          >
            We are community resource educators who use creative and thoughtful
            communication methods and technology to help our healthcare partners
            grow in a meaningful way.
          </motion.h1>

          <motion.p
            variants={fadeInRight}
            className="text-base sm:text-lg lg:text-2xl leading-relaxed sm:leading-normal text-gray-600 font-sans font-normal max-w-lg"
          >
            The landscape of healthcare marketing underwent a significant
            transformation with the rise in patient choice and autonomy. This
            shift led numerous healthcare facilities to adopt new strategies,
            utilizing multiple platforms to promote their services combining
            creative conscious communication efforts and impact-driven community
            development projects. The demand for fresh and innovative approaches
            in healthcare marketing is greater than ever before. We are leading
            these advancements - constantly seeking better ways to provide
            high-quality outreach initiatives.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
