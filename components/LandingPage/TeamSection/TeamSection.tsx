"use client";

import { motion, Variants } from "framer-motion";

const TeamSection = () => {
  // Transform-only animation so content is never "visually hidden" (opacity 0) while exposed to AT (rule #10)
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const memberVariants: Variants = {
    hidden: { x: -20 },
    visible: {
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

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
    {
      name: "Dyllan Ermino",
      role: "Sales Manager",
      image: "/images/team/team-8.png",
      imageTitle: "Dyllan Ermino",
    },
    {
      name: "Kristin Ann Artillaga",
      role: "Creative Director",
      image: "/images/team/team-9.png",
      imageTitle: "Kristin Ann Artillaga",
    },
    {
      name: "Llewilyn Janda",
      role: "Social Media Specialist",
      image: "/images/team/team-10.png",
      imageTitle: "Llewilyn Janda",
    },
  ];

  return (
    <section
      id="team"
      className="bg-[#E5E1DA] py-8 sm:py-12 md:py-16 px-8 lg:px-12 xl:px-16 text-[#414141] overflow-hidden"
      aria-label="Team section"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Content - transform only so never visually hidden while in a11y tree */}
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-700">
            Our Healthcare Marketing Team
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
          {team.map((member) => (
            <motion.div
              key={member.name}
              variants={memberVariants}
              whileHover={{ x: 5 }} // Slight nudge on hover
              className="flex items-start gap-6 group"
            >
              {/* Profile Image */}
              <div className="w-[121px] h-[145px] bg-gray-400 shrink-0 overflow-hidden shadow-sm relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover w-full border-2 min-h-[145px] grayscale group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100"
                  title={member.imageTitle}
                  fetchPriority="high"
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

        {/* Footer Logo - transform only so never visually hidden while in a11y tree */}
        <motion.div
          initial={{ translateY: 8 }}
          whileInView={{ translateY: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-20 flex justify-end items-center gap-2 opacity-80"
        >
          <img
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
