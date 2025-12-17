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

// Helper to split logos into chunks of exactly 4
const chunkArray = (arr: string[], size: number) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

const Partners = () => {
  const rows = chunkArray(logos, 4); // Fixed at 4 logos per row

  return (
    <section
      id="partners"
      className="bg-muted/30 py-10 md:py-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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

export default Partners;
