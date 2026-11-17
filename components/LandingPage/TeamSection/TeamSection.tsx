import SectionBadge from "@/components/LandingPage/shared/SectionBadge";
import Image from "next/image";

import SectionSeam from "@/components/LandingPage/shared/SectionSeam";
const team: {
  name: string;
  role: string;
  image: string;
  zoom?: number;
  /** Horizontal nudge in % of the frame (negative = left). Needs `zoom` so
      the shifted portrait still covers the frame: keep |offsetX| under
      roughly (zoom - 1) / 2 * 100. */
  offsetX?: number;
}[] = [
  {
    name: "Rich Nollen, BSN, RN",
    role: "Owner/CEO",
    image: "/images/team/Rich-6.jpg",
  },
  {
    name: "Roy Gingrich",
    role: "Chief Financial Officer",
    image: "/images/team/Roy-3.jpg",
  },
  {
    name: "Mark Ivor Glorioso",
    role: "Software Engineer/CIO",
    image: "/images/team/Ivor-5.jpg",
  },
  {
    name: "Abcdef Cresencio",
    role: "Software Engineer/IT & Web Systems Manager",
    image: "/images/team/Abcdef-2.jpg",
    zoom: 1.1,
  },
  {
    name: "Kristin Ann Artillaga",
    role: "Creative Director",
    image: "/images/team/Kristin-2.jpg",
  },
  {
    name: "Llewilyn Janda",
    role: "Social Media Specialist",
    image: "/images/team/Llewilyn-3.jpg",
    zoom: 1.1,
    offsetX: -4,
  },
  {
    name: "Gerald Ponteras, CPA",
    role: "Accounting & Billing Manager",
    image: "/images/team/Gerald.jpg",
    // Gerald sits smaller in his frame than the others; crop in to match.
    zoom: 1.22,
  },
  {
    name: "Arzenio Victor Duque",
    role: "Graphic Designer",
    image: "/images/team/Arvie-3.jpg",
  },
  {
    name: "Allynah Beatrice De Castro",
    role: "Marketing & Outreach Specialist",
    image: "/images/team/Allynah.jpg",
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
        className="mt-8 grid grid-cols-2 items-start gap-x-4 gap-y-8 sm:mt-10 sm:grid-cols-3 sm:gap-x-[29px] sm:gap-y-10 lg:mt-[68px] lg:gap-x-12 lg:gap-y-14"
      >
        {team.map((member, index) => {
          /* Three across from `sm`. On `lg` the middle column carries the
             shorter portraits and sits centred in its row, so it floats
             between the taller outer columns — the Figma stagger, without
             negative margins that depend on the row count. */
          const isMiddle = index % 3 === 1;
          return (
            <li
              key={member.name}
              /* Below `sm` the grid is two across, so an odd last card would
               sit alone on the left; centre it instead. */
              className={`group max-sm:last:odd:col-span-2 max-sm:last:odd:w-[calc(50%-0.5rem)] max-sm:last:odd:justify-self-center ${
                isMiddle ? "lg:self-center" : ""
              }`}
            >
              {/* The frame holds still; only the portrait inside scales, so the
                grid rhythm never shifts on hover. */}
              <div className="overflow-hidden">
                <div
                  className="origin-[50%_15%]"
                  style={
                    member.zoom
                      ? {
                          transform: `translateX(${member.offsetX ?? 0}%) scale(${member.zoom})`,
                        }
                      : undefined
                  }
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={250}
                    height={isMiddle ? 276 : 335}
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 340px"
                    className={`aspect-[5/6] w-full object-cover object-top transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] ${
                      isMiddle ? "lg:aspect-[250/276]" : "lg:aspect-[250/335]"
                    }`}
                  />
                </div>
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
          );
        })}
      </ul>
    </div>
  </section>
);

export default TeamSection;
