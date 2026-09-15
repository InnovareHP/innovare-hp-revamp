import SectionBadge from "@/components/LandingPage/shared/SectionBadge";
import Image from "next/image";

import SectionSeam from "@/components/LandingPage/shared/SectionSeam";
const steps = [
  {
    title: "Kickoff Chat",
    lead: "Discuss Goals & Needs:",
    body: "We dive deep into your goals and needs to tailor a perfect marketing strategy for you.",
  },
  {
    title: "Strategy Vibes",
    lead: "Craft a Custom Plan:",
    body: "We design a unique marketing plan that hits all the right notes for your audience.",
  },
  {
    title: "Action Mode",
    lead: "Execute the Plan:",
    body: "We bring the strategy to life with creative content and targeted campaigns.",
  },
  {
    title: "Glow Up",
    lead: "Track & Improve:",
    body: "We monitor results and tweak the strategy for continuous improvement and growth.",
  },
];

const Process = () => (
  <section
    id="process"
    aria-label="Our approach"
    className="relative bg-surface-1 py-16 sm:py-20 lg:py-[200px]"
  >
    <SectionSeam from="from-surface-2" />

    <div className="hp-container grid gap-12 lg:grid-cols-2 lg:gap-16">
      {/* Parks while the four steps scroll by on the right. */}
      <div data-anim="slide-left" data-sticky-col className="hp-sticky-col">
        <SectionBadge number="03" className="w-fit">
          Our approach
        </SectionBadge>

        <h2
          data-anim="lines"
          className="mt-8 max-w-[320px] text-[clamp(1.75rem,4.5vw,2.5rem)] leading-[1.2] font-semibold text-ink lg:mt-[74px]"
        >
          Our <span className="text-brand">4-Point</span> Collab Process
        </h2>

        <p className="mt-4 max-w-[433px] text-base leading-[25px] text-ink sm:text-lg">
          Purpose-built strategies with people at the center.
        </p>

        <div
          data-anim="mask"
          data-sticky-media
          className="mt-8 overflow-hidden rounded-[20px] lg:mt-[97px] lg:max-w-[496px]"
        >
          <Image
            src="/images/redesign/approach.webp"
            alt="Innovare HP consultants in a discovery conversation with a client"
            width={496}
            height={303}
            sizes="(max-width: 1024px) 90vw, 496px"
            className="h-full w-full object-cover"
            style={{ aspectRatio: "496 / 303" }}
          />
        </div>
      </div>

      <ol
        data-timeline
        className="relative flex flex-col gap-16 pl-6 sm:gap-[140px] sm:pl-11 lg:gap-[340px] lg:py-20"
      >
        {/* Rail: a static track with a brand-coloured line drawn over it as
            the section scrolls. */}
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-[2px] bg-[#cfe4f7]"
        />
        <span
          aria-hidden
          data-timeline-progress
          className="absolute inset-y-0 left-0 w-[2px] origin-top bg-brand"
        />

        {steps.map((step) => (
          <li
            key={step.title}
            data-timeline-dot
            data-active="false"
            className="hp-hover-row group relative lg:min-h-[200px]"
            data-hover-row="10"
          >
            <span
              aria-hidden
              className="absolute top-2 -left-[31px] size-5 scale-90 rounded-full bg-[#cfe4f7] transition-[background-color,transform] duration-300 group-data-[active=true]:scale-100 group-data-[active=true]:bg-brand sm:-left-[54px]"
            />
            <div className="overflow-hidden">
              <div data-timeline-detail>
                <h3 className="text-[clamp(1.25rem,2.6vw,1.875rem)] leading-[1.2] font-medium text-ink transition-colors duration-300 group-data-[active=true]:text-brand">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[433px] text-base leading-[25px] text-ink sm:text-lg">
                  <span className="font-medium">{step.lead}</span> {step.body}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default Process;
