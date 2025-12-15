import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="flex flex-col lg:flex-row min-h-screen">
      {/* Left side - Image (50% width) */}
      <div className="w-full lg:w-1/2 bg-gray-200 flex items-center justify-center relative min-h-[400px] lg:min-h-screen">
        <Image
          src="/images/about/about-img.png"
          alt="Innovare HP Team"
          fill
          className="object-cover"
          sizes="(max-width: 1023px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Right side - Text content (50% width) */}
      <div className="w-full lg:w-1/2 bg-[#f5f5f0] flex items-center justify-center p-8 lg:p-12 xl:p-16">
        <div className="w-full max-w-2xl space-y-6">
          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-black leading-[1.3] font-sans">
            We are community resource educators who use creative and thoughtful
            communication methods and technology to help our healthcare partners
            grow in a meaningful way.
          </h2>

          {/* Body text */}
          <p className="text-lg lg:text-xl leading-[1.9] text-gray-600 font-sans font-normal">
            The landscape of healthcare marketing underwent a significant
            transformation with the rise in patient choice and autonomy. This
            shift led numerous healthcare facilities to adopt new strategies,
            utilizing multiple platforms to promote their services combining
            creative conscious communication efforts and impact-driven community
            development projects. The demand for fresh and innovative approaches
            in healthcare marketing is greater than ever before. We are leading
            these advancements - constantly seeking better ways to provide
            high-quality outreach initiatives.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
