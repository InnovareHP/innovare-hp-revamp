"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

const team = [
  {
    name: "Rich Nollen, BSN, RN",
    role: "Owner/CEO",
    image: "/images/team/team-1.png",
  },
  { name: "Roy Gingrich", role: "CFO", image: "/images/team/team-5.png" },
  {
    name: "Amy Cunningham, MHC, MBA",
    role: "Regional Brand & Relationship Manager",
    image: "/images/team/team-2.png",
  },
  {
    name: "Tracy Lorenz",
    role: "Regional Brand & Relationship Manager",
    image: "/images/team/team-6.png",
  },
  {
    name: "Ivor Glorioso",
    role: "Software Engineer/CIO",
    image: "/images/team/team-3.png",
  },
  {
    name: "Abcdef Cresencio",
    role: "Software Engineer/IT & Web Systems Manager",
    image: "/images/team/team-7.png",
  },
  {
    name: "Shiela Veran",
    role: "Strategic Growth Associate",
    image: "/images/team/team-4.png",
  },
];

const TeamSection = () => {
<<<<<<< HEAD
  // Container variants for the grid
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Each member appears 0.1s after the previous one
      },
    },
  };

  // Individual member variants
  const memberVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
=======
  const team = [
    {
      name: "Rich Nollen, BSN, RN",
      role: "Owner/CEO",
      image: "/images/team/team-1.png",
      imageTitle: "Rich Nollen, BSN, RN",
    },
    {
      name: "Roy Gingrich",
      role: "CFO",
      image: "/images/team/team-5.png",
      imageTitle: "Roy Gingrich",
    },
    {
      name: "Amy Cunningham, MHC, MBA",
      role: "Regional Brand & Relationship Manager",
      image: "/images/team/team-2.png",
      imageTitle: "Amy Cunningham, MHC, MBA",
    },
    {
      name: "Tracy Lorenz",
      role: "Regional Brand & Relationship Manager",
      image: "/images/team/team-6.png",
      imageTitle: "Tracy Lorenz",
    },
    {
      name: "Ivor Glorioso",
      role: "Software Engineer/CIO",
      image: "/images/team/team-3.png",
      imageTitle: "Ivor Glorioso",
    },
    {
      name: "Abcdef Cresencio",
      role: "Software Engineer/IT & Web Systems Manager",
      image: "/images/team/team-7.png",
      imageTitle: "Abcdef Cresencio",
    },
    {
      name: "Shiela Veran",
      role: "Strategic Growth Associate",
      image: "/images/team/team-4.png",
      imageTitle: "Shiela Veran",
    },
  ];
>>>>>>> 0c6d8c53094b41da72a0942d4feab7b0aa25c75e

  return (
    <section
      id="team"
      className="bg-[#E5E1DA] py-8 sm:py-12 md:py-16 px-8 lg:px-12 xl:px-16 text-[#414141] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-700">
            Meet the champions of our proven outreach strategies
          </h2>
          <p className="text-lg lg:text-2xl leading-relaxed sm:leading-normal text-gray-600 font-sans font-normal">
            Over the course of our journey, we have forged meaningful
            partnerships with a diverse range of healthcare and health-related
            organizations.
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10"
        >
          {team.map((member, index) => (
            <motion.div
              key={index}
              variants={memberVariants}
              whileHover={{ x: 5 }} // Slight nudge on hover
              className="flex items-start gap-6 group"
            >
              {/* Profile Image */}
              <div className="w-[121px] h-[145px] bg-gray-400 shrink-0 overflow-hidden shadow-sm relative">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100"
                  sizes="121px"
                  title={member.imageTitle}
                />
              </div>

              {/* Member Details */}
              <div className="flex flex-col pt-2">
                <h3 className="font-bold text-xl md:text-2xl leading-relaxed sm:leading-normal group-hover:text-black transition-colors">
                  {member.name}
                </h3>
                <p className="text-lg lg:text-2xl leading-relaxed sm:leading-normal text-gray-600 font-sans font-normal mt-1">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.8 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 flex justify-end items-center gap-2"
        >
          <Image
            src="/images/logo-black.png"
            alt="Innovare HP"
            width={50}
            height={50}
            title="Innovare HP"
          />
          <h2 className="uppercase font-light text-lg font-signika tracking-[0.55em] block">
            Innovare HP
          </h2>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
