import Image from "next/image";

const MissionSection = () => {
  return (
    <section
      id="mission"
      className="bg-[#414141] text-white py-16 px-8 lg:px-12 xl:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
          {/* Logo Placeholder */}
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo-white-2.png"
              alt="Innovare HP"
              width={50}
              height={50}
            />

            <h2 className="uppercase font-light text-lg font-signika tracking-[0.55em] block">
              Innovare HP
            </h2>
          </div>

          <div className="md:max-w-3xl space-y-6">
            <p className="text-lg lg:text-2xl font-normal leading-relaxed sm:leading-normal">
              We are dedicated to enhancing the reach and influence of
              healthcare brands, touching lives with compassionate and
              innovative marketing approaches driven by valuable insights.
            </p>
            <p className="text-lg lg:text-2xl font-normal leading-relaxed sm:leading-normal">
              We aspire to lead a transformative growth in healthcare marketing,
              empowering brands to inspire positive change and drive meaningful
              impact.
            </p>
          </div>
        </div>

        <div className="w-full aspect-[21/9] bg-gray-300 relative overflow-hidden rounded-sm">
          <Image
            src="/images/mission.jpg"
            alt="Mission Section"
            fill
            className="object-cover"
            priority
          />
          {/* Once you have your image, replace the div above with:
          <img
            src="/path-to-your-image.jpg"
            alt="Team working in office"
            className="w-full h-full object-cover"
          />
          */}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
