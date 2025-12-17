import Image from "next/image";

const Process = () => {
  return (
    <section
      id="process"
      className="relative w-full h-[110vw] sm:h-[100vw] overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-full select-none pointer-events-none">
        <Image
          src="/images/services/services.png"
          alt="Services Process"
          width={1920} // Set these to the actual dimensions of your image file
          height={1080}
          sizes="100vw"
          className="w-full h-auto object-cover"
          priority
        />
      </div>
    </section>
  );
};

export default Process;
