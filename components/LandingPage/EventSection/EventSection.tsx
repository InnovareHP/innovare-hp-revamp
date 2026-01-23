"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function EventSection() {
  return (
    <section
      className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden"
      aria-label="Events section"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/events/events.png"
          alt="Healthcare professionals networking at events"
          fill
          className="object-cover"
          priority
        />
        {/* Black Overlay with 50% opacity */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-8 sm:px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight font-bold">
            Curated gatherings designed to connect healthcare professionals,
            spark ideas, and strengthen community partnerships.
          </h1>

          <div className="pt-2 sm:pt-4 flex justify-center">
            <Link
              href="#events"
              title="Explore our Event Calendar"
              aria-label="Explore our Event Calendar"
            >
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10 hover:text-white rounded-none px-6 py-5 sm:px-8 sm:py-6 md:px-10 md:py-7 text-lg font-semibold uppercase tracking-widest cursor-pointer"
              >
                Explore our Event Calendar
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
