"use client";

import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";

const services = [
  {
    title: "DIGITAL STRATEGY & INTELLIGENT MARKETING EXECUTION",
    description:
      "We build digital systems that don't chase clicks — they build credibility, authority, and patient trust. From SEO and precision ad campaigns to content ecosystems and analytic dashboards, we drive growth rooted in insight, not guesswork. Every action is intentional. Every channel is aligned. Every dollar works harder, smarter, and with clinical-grade precision.",
  },
  {
    title: "COMMUNITY-BASED OUTREACH & REFERRAL DEVELOPMENT",
    description:
      "Healthcare is local, personal, and relational — so our work is too. We cultivate meaningful partnerships with physicians, senior living communities, hospitals, and service providers, ensuring your mission is known, felt, and trusted in the places decisions are made. We are boots-on-the-ground advocates building referral pipelines through relationships that last, not handshakes that fade.",
  },
  {
    title: "PUBLIC RELATIONS, THOUGHT LEADERSHIP & STORY CRAFTING",
    description:
      "Your story deserves more than a post — it deserves positioning. We transform your mission, voice, and expertise into consistent, influential communications that elevate your brand in the eyes of patients, families, and referral partners. From media features and reputation building to executive visibility and narrative strategy, we shape how the market sees you — with honesty, heart, and authority.",
  },
  {
    title: "EVENT PLANNING, PARTNERSHIPS & ACTIVATION",
    description:
      'We don\'t "host events" — we create connection environments. From community workshops and appreciation experiences to collaborative luncheons and professional roundtables, we make your organization a presence, not a billboard. Every event becomes a touchpoint for trust, strengthening relationships, sparking referrals, and planting communities of support.',
  },
  {
    title: "BESPOKE CAMPAIGNS DESIGNED FOR YOUR MARKET & METRICS",
    description:
      "No templates. No recycled ideas. Every campaign is purpose-built for your goals, your audience, your region, and your growth stage. We blend strategy, creativity, and market intelligence to produce campaigns that move the needle. Your mission is unique. Your marketing should be too.",
  },
  {
    title: "MARKETING TRAINING AND COACHING",
    description:
      "We empower your team with the knowledge and tools to sustain and scale your marketing efforts. Through strategic workshops, digital marketing fundamentals, and best practices training, we build internal capabilities and transform your staff into confident marketing champions.",
  },
];

const handleDownloadFile = (url: string, filename?: string) => {
  // ensure spaces work fine
  const href = encodeURI(url);
  const a = document.createElement("a");
  a.href = href;
  if (filename) a.download = filename;
  // if no filename, browser uses last segment of URL
  document.body.appendChild(a);
  a.click();
  a.remove();
};

const WhatWeDo = () => {
  // Fixes the "ease" string type error by using the Variants type
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Delay between each service reveal
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut", // Properly typed via Variants
      },
    },
  };

  return (
    <section
      id="what-we-do"
      className="max-w-7xl mx-auto px-8 lg:px-12 xl:px-16 py-16"
    >
      <div>
        {/* Header Animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-left text-blue-900">
            What we do
          </h2>
        </motion.div>

        {/* Animated Services List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12 lg:space-y-20 mx-0 sm:mx-4 md:mx-6 lg:mx-10"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="space-y-4 group"
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-left text-blue-900 group-hover:text-blue-700 transition-colors duration-300">
                {service.title}
              </h3>

              <p className="text-base sm:text-lg lg:text-4xl leading-relaxed sm:leading-normal text-black font-sans font-normal border-l-2 border-transparent group-hover:border-blue-900 pl-0 group-hover:pl-4 transition-all duration-300">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <Button
        variant="outline"
        onClick={() =>
          handleDownloadFile(
            "/Innovare HP Brochure.pdf",
            "Innovare HP Brochure.pdf"
          )
        }
        className="border-blue-400 my-10 w-full text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-none px-8 py-6 text-sm font-semibold uppercase tracking-widest cursor-pointer"
      >
        Download Brochure
      </Button>
    </section>
  );
};

export default WhatWeDo;
