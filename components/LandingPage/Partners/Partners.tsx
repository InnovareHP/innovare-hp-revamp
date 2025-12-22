"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const logos = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
];

// Split logos into 4 rows
const chunkSize = Math.ceil(logos.length / 4);
const rows = Array.from({ length: 4 }, (_, i) =>
  logos.slice(i * chunkSize, (i + 1) * chunkSize)
);

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

      {/* Marquee Container */}
      <div className="relative flex flex-col gap-8 [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
        {rows.map((row, index) => (
          <LogoMarquee
            key={index}
            items={row}
            direction={index % 2 === 0 ? "left" : "right"}
            speed={30 + index * 3}
          />
        ))}
      </div>
    </section>
  );
};

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
        whileHover={{ animationPlayState: "paused" }}
      >
        {[...items, ...items].map((n, index) => (
          <div
            key={`${n}-${index}`}
            className="flex-shrink-0 w-[150px] sm:w-[200px] md:w-[250px] flex items-center justify-center p-4 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
          >
            <Image
              src={`/images/testimonials/${n}.png`}
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
