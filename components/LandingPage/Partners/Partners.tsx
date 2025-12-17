"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const logos = [
  "25",
  "10",
  "22",
  "9",
  "6",
  "23",
  "11",
  "16",
  "21",
  "13",
  "19",
  "28",
  "30",
  "15",
  "12",
  "26",
  "7",
  "14",
  "29",
  "27",
  "8",
  "31",
];

// Split logos into two rows for a more dynamic look
const firstRow = logos.slice(0, Math.ceil(logos.length / 2));
const secondRow = logos.slice(Math.ceil(logos.length / 2));

const Partners = () => {
  return (
    <section
      id="partners"
      className="bg-muted/30 py-10 md:py-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold"
        >
          Who we partner with
        </motion.p>
      </div>

      {/* Container with a fade effect on edges */}
      <div className="flex flex-col gap-6 relative [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
        {rows.map((rowLogos, rowIndex) => (
          <div key={rowIndex} className="flex overflow-hidden">
            <motion.div
              className="flex flex-nowrap gap-12"
              initial={{ x: rowIndex % 2 === 0 ? "0%" : "-50%" }}
              animate={{ x: rowIndex % 2 === 0 ? "-50%" : "0%" }}
              transition={{
                duration: 20, // Lower duration = faster speed
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {/* Render the 4 logos twice to create a seamless loop */}
              {[...rowLogos, ...rowLogos].map((n, index) => (
                <div
                  key={`${n}-${index}`}
                  className="flex-shrink-0 w-[200px] sm:w-[250px] md:w-[300px] flex items-center justify-center p-4 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all"
                >
                  <Image
                    src={`/images/testimonials/Innovare-HP-Brochure-(${n}).png`}
                    alt="Partner Logo"
                    width={220}
                    title={`Partner Logo ${n}`}
                    height={220}
                    className="object-contain"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Sub-component for the Marquee Logic
const LogoMarquee = ({
  items,
  direction = "left",
  speed = 30,
}: {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
}) => {
  const isLeft = direction === "left";

  return (
    <div className="flex w-full overflow-hidden">
      <motion.div
        className="flex flex-nowrap gap-12 items-center"
        initial={{ x: isLeft ? "0%" : "-50%" }}
        animate={{ x: isLeft ? "-50%" : "0%" }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        // Pause animation on hover
        whileHover={{ animationPlayState: "paused" }}
      >
        {/* We map the array twice to ensure the gap-less loop */}
        {[...items, ...items].map((n, index) => (
          <div
            key={`${n}-${index}`}
            className="flex-shrink-0 w-[150px] sm:w-[200px] md:w-[250px] flex items-center justify-center p-4 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
          >
            <Image
              src={`/images/testimonials/Innovare-HP-Brochure-(${n}).png`}
              alt="Partner Logo"
              width={200}
              height={100}
              className="object-contain"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Partners;
