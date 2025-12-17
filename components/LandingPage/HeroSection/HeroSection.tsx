import WorkWithUsButton from "@/components/ui/work-with-us-button";
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

      <div className="relative z-10 w-full px-8 sm:px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl space-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-relaxed sm:leading-tight">
            Marketing that empowers healthcare brands to stand apart and stay
            ahead.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-xl tracking-wide">
            Innovare HP delivers full-service healthcare marketing for
            organizations that want to lead—not follow.
          </p>

          <div className="pt-4">
            <WorkWithUsButton variant="hero" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
