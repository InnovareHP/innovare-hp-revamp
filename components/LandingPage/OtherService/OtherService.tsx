"use client";

import WorkWithUsButton from "@/components/ui/work-with-us-button";
import { motion, Variants } from "framer-motion";
import { BarChart3, CalendarDays, Target, Users2 } from "lucide-react";

const services = [
  {
    title: "Strategy",
    icon: <Target className="w-10 h-10 text-blue-400" />,
    description:
      "Our expertise lies in guiding you through the process of creating a comprehensive plan or approach to achieve your specific objectives or goals. This includes analyzing your current situation, defining clear objectives, and identifying the most effective and efficient course of action to attain your desired outcomes.",
  },
  {
    title: "Events Management",
    icon: <CalendarDays className="w-10 h-10 text-blue-400" />,
    description:
      "From initial concept development to flawless execution, we meticulously plan and curate each strategic networking mixer, leaving no room for anything less than excellence. Your event will be a seamlessly orchestrated experience, designed to create a lasting impact and enhance your organization's reputation.",
  },
  {
    title: "Sales Operation",
    icon: <BarChart3 className="w-10 h-10 text-blue-400" />,
    description:
      "We take pride in developing customized marketing strategies that cater to your specific needs. Understanding the significance of brand visibility, we work diligently to enhance your market presence. With our expertise and innovative approach, our aim is to drive remarkable growth and successfully reach your target market.",
  },
  {
    title: "Training & Coaching",
    icon: <Users2 className="w-10 h-10 text-blue-400" />,
    description:
      "Our sales training service acts as a catalyst for continuous improvement and growth within your sales team. We are committed to providing your team with the expertise and resources needed to thrive in today's fast-paced sales environment.",
  },
];

const OtherService = () => {
  // Container variants for staggered entrance
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Individual card variants (Slide up + Fade)
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.21, 1.11, 0.81, 0.99], // Slight "springy" custom ease
      },
    },
  };

  return (
    <section
      id="services"
      className="max-w-7xl mx-auto px-8 lg:px-12 xl:px-16 py-16"
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 tracking-tight">
          Our Exciting Service Offerings
        </h2>
        <WorkWithUsButton variant="service" />
      </motion.div>

      {/* Grid of Services */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12"
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ y: -5 }} // Subtle hover lift
            className="space-y-4 p-2"
          >
            <motion.div
              className="mb-4 inline-block"
              initial={{ rotate: -10 }}
              whileInView={{ rotate: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              {service.icon}
            </motion.div>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-900">
              {service.title}
            </h3>
            <p className="text-lg lg:text-2xl leading-relaxed sm:leading-normal text-gray-700 font-sans font-normal">
              {service.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default OtherService;
