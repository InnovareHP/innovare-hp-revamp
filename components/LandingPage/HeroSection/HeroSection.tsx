import { Button } from "@/components/ui/button";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/hero-section.jpg"
          alt="Hero Section"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="container relative z-10 px-10 sm:px-2 mx-auto">
        <div className="max-w-4xl space-y-2">
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-white leading-tighter">
            Marketing that empowers healthcare brands to stand apart and stay
            ahead.
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-xl tracking-wide">
            Innovare HP delivers full-service healthcare marketing for
            organizations that want to lead—not follow.
          </p>

          <div className="pt-4">
            <Button
              variant="outline"
              className="w-82 underline text-white text-lg py-6"
            >
              Work With Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
