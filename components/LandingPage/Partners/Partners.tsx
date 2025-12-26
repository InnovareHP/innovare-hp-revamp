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

const chunkSize = Math.ceil(logos.length / 4);
const rows = Array.from({ length: 4 }, (_, i) =>
  logos.slice(i * chunkSize, (i + 1) * chunkSize)
);

const Partners = () => {
  return (
    <section
      id="partners"
      className="bg-muted/30 py-16 md:py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center md:text-left"
        >
          Brands We Have Worked With
        </motion.p>
      </div>

      <div className="relative flex flex-col gap-8 md:gap-12 [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
        {rows.map((row, index) => (
          <LogoMarquee
            key={index}
            items={row}
            direction={index % 2 === 0 ? "left" : "right"}
            speed={50 + index * 5} // Slightly slower speed to account for larger size
          />
        ))}
      </div>
    </section>
  );
};

const LogoMarquee = ({
  items,
  direction = "left",
  speed = 40,
}: {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
}) => {
  const isLeft = direction === "left";

  return (
    <div className="flex w-full overflow-hidden">
      <motion.div
        className="flex flex-nowrap gap-12 md:gap-24 items-center"
        initial={{ x: isLeft ? "0%" : "-50%" }}
        animate={{ x: isLeft ? "-50%" : "0%" }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...items, ...items, ...items].map((n, index) => (
          <div
            key={`${n}-${index}`}
            className="flex-shrink-0 flex items-center justify-center grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300
                       w-[180px] h-[90px] 
                       sm:w-[240px] sm:h-[120px] 
                       md:w-[320px] md:h-[160px]"
          >
            <div className="relative w-full h-full scale-110">
              {" "}
              {/* Extra 10% scale for impact */}
              <Image
                src={`/images/testimonials/${n}.png`}
                alt="Partner Logo"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 180px, 320px"
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Partners;
