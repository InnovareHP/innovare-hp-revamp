import PillButton from "@/components/LandingPage/shared/PillButton";
import Image from "next/image";

import SectionSeam from "@/components/LandingPage/shared/SectionSeam";
const EventSection = () => (
  <section
    id="events"
    aria-label="Events"
    className="relative bg-surface-3 py-16 sm:py-20 lg:py-[86px]"
  >
    <SectionSeam from="from-surface-2" />

    <div className="hp-container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="relative flex items-start">
        <div
          data-anim="mask"
          data-float="20"
          className="w-[62%] overflow-hidden rounded-[20px] shadow-[0_0_20px_0_rgba(35,35,35,0.1)] lg:w-[345px]"
        >
          <Image
            src="/images/redesign/event-1.webp"
            alt="Healthcare professionals connecting at an Innovare HP community event"
            width={345}
            height={316}
            sizes="(max-width: 1024px) 60vw, 345px"
            className="h-full w-full object-cover"
            style={{ aspectRatio: "345 / 316" }}
          />
        </div>

        <div
          data-anim="mask"
          data-float="-24"
          className="-ml-[10%] mt-[36%] w-[50%] overflow-hidden rounded-[20px] shadow-[0_0_20px_0_rgba(35,35,35,0.1)] lg:-ml-[35px] lg:mt-[114px] lg:w-[276px]"
        >
          <Image
            src="/images/redesign/event-2.webp"
            alt="Attendees in conversation during an Innovare HP roundtable"
            width={276}
            height={252}
            sizes="(max-width: 1024px) 50vw, 276px"
            className="h-full w-full object-cover"
            style={{ aspectRatio: "276 / 252" }}
          />
        </div>
      </div>

      <div data-anim="stagger" data-anim-from="slide-right">
        <h2
          data-anim="lines"
          className="max-w-[415px] text-[clamp(1.75rem,4.5vw,2.5rem)] leading-[1.2] font-semibold text-ink"
        >
          We&rsquo;re bringing healthcare communities{" "}
          <span className="text-brand">together.</span>
        </h2>

        <p className="mt-5 max-w-[416px] text-base leading-[25px] text-ink sm:text-lg">
          Curated gatherings designed to connect healthcare professionals, spark
          ideas, and strengthen community partnerships.
        </p>

        <PillButton
          href="/events"
          title="Explore our event calendar"
          srHint="(go to events page)"
          className="mt-8 lg:mt-[86px]"
        >
          Join the conversation
        </PillButton>
      </div>
    </div>
  </section>
);

export default EventSection;
