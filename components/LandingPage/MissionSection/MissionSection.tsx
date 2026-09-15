import SectionBadge from "@/components/LandingPage/shared/SectionBadge";
import Image from "next/image";

import SectionSeam from "@/components/LandingPage/shared/SectionSeam";
const stats = [
  { value: 500, suffix: "+", label: "Referrals Generated" },
  { value: 30, suffix: "+", label: "Brands Grown" },
  { value: 10, suffix: "", label: "Years of Experience" },
];

const MissionSection = () => (
  <section
    id="mission"
    aria-label="Our mission"
    className="relative bg-surface-1 pt-16 pb-16 sm:pt-20 lg:pt-[85px] lg:pb-[108px]"
  >
    <SectionSeam from="from-surface-3" />

    <div data-anim="stagger" className="hp-container">
      <SectionBadge number="05" className="w-fit">
        Our mission
      </SectionBadge>

      <h2 className="mt-8 max-w-[546px] text-[clamp(1.75rem,4.5vw,2.5rem)] leading-[1.25] font-semibold text-ink lg:mt-[74px]">
        We build healthcare brands that grow with{" "}
        <span className="hp-mark">purpose.</span>
      </h2>
    </div>

    <div className="relative mt-10 lg:mt-[55px]">
      <div className="overflow-hidden">
        <Image
          data-parallax
          src="/images/redesign/mission.webp"
          alt="Innovare HP strategists leading a workshop with a healthcare team"
          width={2000}
          height={950}
          sizes="100vw"
          className="h-[240px] w-full object-cover sm:h-[420px] lg:h-[640px]"
        />
      </div>

      <div className="hp-container relative lg:absolute lg:inset-x-0 lg:bottom-[-51px]">
        <dl
          data-anim="stagger"
          data-count-scrub
          className="-mt-8 grid grid-cols-3 gap-2 rounded-[10px] bg-surface-3 px-4 py-6 sm:gap-6 sm:px-10 lg:mt-0 lg:ml-auto lg:w-[694px] lg:px-[84px] lg:py-[26px]"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span
                  data-count-to={stat.value}
                  data-count-suffix={stat.suffix}
                  className="block text-[clamp(1.75rem,5vw,4rem)] leading-[1.15] font-bold whitespace-nowrap text-brand"
                >
                  {stat.value}
                  {stat.suffix}
                </span>
                <span
                  aria-hidden
                  className="mt-1 block text-[11px] leading-tight text-ink sm:text-xs"
                >
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>

    <div className="hp-container mt-12 grid gap-8 lg:mt-[110px] lg:grid-cols-[315px_1fr] lg:gap-12">
      {/* Short lead-in that holds while the long-form copy scrolls past it. */}
      <div data-sticky-col data-anim="slide-left" className="hp-sticky-col">
        <p className="max-w-[315px] text-base leading-[25px] text-ink sm:text-lg">
          We turn insight into connection and connection into impact.
        </p>
        <span
          aria-hidden
          className="relative mt-8 hidden h-[96px] w-[2px] bg-hairline lg:block"
        >
          <span
            data-sticky-progress
            className="absolute inset-0 origin-top scale-y-0 bg-brand"
          />
        </span>
      </div>

      <div
        data-anim="stagger"
        data-anim-from="slide-right"
        className="lg:pl-16"
      >
        <p className="max-w-[697px] text-[clamp(1.375rem,3.6vw,2.25rem)] leading-[1.25] font-medium text-ink">
          We aspire to lead a{" "}
          <span className="text-brand">transformative growth</span> in
          healthcare marketing, empowering brands to inspire positive change and
          drive meaningful impact.
        </p>
        <p className="mt-8 max-w-[602px] text-base leading-[25px] text-ink sm:text-lg lg:mt-[60px]">
          We are dedicated to enhancing the reach and influence of healthcare
          brands, touching lives with compassionate and innovative marketing
          approaches driven by valuable insights.
        </p>
      </div>
    </div>
  </section>
);

export default MissionSection;
