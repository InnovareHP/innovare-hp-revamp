import SectionBadge from "@/components/LandingPage/shared/SectionBadge";
import Image from "next/image";

import SectionSeam from "@/components/LandingPage/shared/SectionSeam";
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
    name: "Mark Ivor Glorioso",
    role: "Software Engineer/CIO",
    image: "/images/team/team-3.png",
  },
  {
    name: "Abcdef Cresencio",
    role: "Software Engineer/IT & Web Systems Manager",
    image: "/images/team/team-7.png",
  },
  {
    name: "Kristin Ann Artillaga",
    role: "Creative Director",
    image: "/images/team/team-9.png",
  },
  {
    name: "Llewilyn Janda",
    role: "Social Media Specialist",
    image: "/images/team/team-10.png",
  },
  {
    name: "Gerald Ponteras, CPA",
    role: "Accounting & Billing Manager",
    image: "/images/team/Team-11.png",
  },
  {
    name: "Arzenio Victor Duque",
    role: "Graphic Designer",
    image: "/images/team/Team-12.png",
  },
];

const TeamSection = () => (
  <section
    id="team"
    aria-label="Meet the team"
    className="relative bg-surface-2 py-16 sm:py-20 lg:py-[72px]"
  >
    <SectionSeam from="from-surface-1" />

    <div className="hp-container">
      <SectionBadge number="06" className="w-fit">
        Meet the team
      </SectionBadge>

      <div
        data-anim="stagger"
        className="mt-8 grid gap-6 lg:mt-[74px] lg:grid-cols-2 lg:gap-16"
      >
        <h2
          data-anim="lines"
          className="max-w-[455px] text-[clamp(1.75rem,4.5vw,2.5rem)] leading-[1.2] font-semibold text-ink"
        >
          Our Healthcare Marketing Team
        </h2>
        <p className="max-w-[602px] self-center text-base leading-[25px] text-ink sm:text-lg">
          Over the course of our journey, we have forged meaningful partnerships
          with a diverse range of healthcare and health-related organizations.
        </p>
      </div>

      <ul
        data-anim="stagger"
        data-anim-from="lift"
        className="mt-8 grid grid-cols-2 items-start gap-x-4 gap-y-8 sm:mt-10 sm:gap-x-[29px] sm:gap-y-10 lg:mt-[68px] lg:grid-cols-4"
      >
        {team.map((member, index) => (
          <li
            key={member.name}
            /* Second-row shorter portraits sit higher, as in the Figma
               stagger. Only from `lg`, where the grid is four across — the
               two-column layout below that stays flush. */
            className={`group ${
              index >= 4 && index % 2 === 1 ? "lg:-mt-[51px]" : ""
            }`}
          >
            {/* The frame holds still; only the portrait inside scales, so the
                grid rhythm never shifts on hover. */}
            <div className="overflow-hidden">
              <Image
                src={member.image}
                alt={member.name}
                width={250}
                height={index % 2 === 0 ? 335 : 276}
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 45vw, 250px"
                className={`aspect-[5/6] w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] ${
                  index % 2 === 0
                    ? "lg:aspect-[250/335]"
                    : "lg:aspect-[250/276]"
                }`}
              />
            </div>
            <span
              aria-hidden
              className="hp-hover-rule mt-3 block h-[2px] w-full bg-brand sm:mt-4"
            />
            <h3 className="mt-3 text-[15px] leading-tight font-medium text-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 sm:text-lg lg:text-xl">
              {member.name}
            </h3>
            <p className="mt-1 text-[13px] leading-snug text-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 sm:text-sm lg:text-[15px]">
              {member.role}
            </p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default TeamSection;
