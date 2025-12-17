import Image from "next/image";

const TeamSection = () => {
  const team = [
    {
      name: "Rich Nollen, BSN, RN",
      role: "Owner/CEO",
      image: "/images/team/team-1.png",
    },
    {
      name: "Roy Gingrich",
      role: "CFO",
      image: "/images/team/team-5.png",
    },
    {
      name: "Amy Cunningham, MHC, MBA",
      role: "Regional Brand & Relationship Manager",
      image: "/images/team/team-2.png",
    },
    {
      name: "Tracy Lorenz",
      role: "Regional Brand & Relationship Manager",
      image: "/images/team/team-6.png",
    },
    {
      name: "Ivor Glorioso",
      role: "Software Engineer/CIO",
      image: "/images/team/team-3.png",
    },
    {
      name: "Abcdef Cresencio",
      role: "Software Engineer/IT & Web Systems Manager",
      image: "/images/team/team-7.png",
    },
    {
      name: "Shiela Veran",
      role: "Strategic Growth Associate",
      image: "/images/team/team-4.png",
    },
  ];

  return (
    <section className="bg-[#E5E1DA] py-16 px-6 md:px-24 text-[#414141]">
      <div className="max-w-6xl mx-auto">
        {/* Header Content */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-700">
            Meet the champions of our proven outreach strategies
          </h2>
          <p className="text-lg lg:text-2xl leading-tight text-gray-600 font-sans font-normal">
            Over the course of our journey, we have forged meaningful
            partnerships with a diverse range of healthcare and health-related
            organizations. From hospitals and staffing company to senior living
            and consultants, we have collaborated with businesses across various
            sectors, harnessing our expertise to drive meaningful growth.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {team.map((member, index) => (
            <div key={index} className="flex items-start gap-6">
              {/* Profile Image */}
              <div className="w-[121px] h-[145px] bg-gray-400 shrink-0 overflow-hidden shadow-sm relative">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover grayscale"
                  sizes="121px"
                />
              </div>

              {/* Member Details */}
              <div className="flex flex-col pt-2">
                <h3 className="font-bold text-xl md:text-2xl leading-tight">
                  {member.name}
                </h3>
                <p className="text-lg lg:text-2xl leading-tight text-gray-600 font-sans font-normal mt-1">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Logo */}
        <div className="mt-20 flex justify-end items-center gap-2 opacity-80">
          <Image
            src="/images/logo-black.png"
            alt="Innovare HP"
            width={50}
            height={50}
          />
          <h2 className="uppercase font-light text-lg font-signika tracking-[0.55em] sm:block hidden">
            Innovare HP
          </h2>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
