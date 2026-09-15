import PillButton from "@/components/LandingPage/shared/PillButton";
import Image from "next/image";

/**
 * The banner artwork is 2560x1078 (2.37:1). From `lg` the section adopts that
 * exact ratio, so the whole photograph is on screen rather than a band cropped
 * out of the middle. A portrait phone can't fit that ratio, so there the photo
 * stays behind the copy as one block and is anchored left — that side of the
 * frame holds the two figures, and it keeps the darker area under the text.
 */
const HeroSection = () => (
  <section
    id="hero-section"
    aria-label="Hero"
    className="relative mt-16 flex w-full items-center overflow-hidden bg-[#0c0d08] py-16 lg:mt-[81px] lg:aspect-[2560/1078] lg:max-h-[calc(100dvh-81px)] lg:py-0"
  >
    <div className="absolute inset-0">
      <Image
        src="/images/redesign/hero-banner.webp"
        alt="Innovare HP healthcare marketing professionals collaborating"
        fill
        priority
        sizes="100vw"
        className="object-cover object-left lg:object-center"
      />
      {/* Keeps the headline above AA contrast on the lighter parts of the photo. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-black/45 lg:bg-black/35"
      />
    </div>

    <div className="hp-container relative lg:flex lg:h-full lg:items-center">
      <div
        data-anim="hero"
        className="mx-auto flex max-w-[790px] flex-col items-center text-center"
      >
        <p className="text-[13px] tracking-[0.05em] text-white uppercase sm:text-base">
          Full-service marketing for healthcare
        </p>

        <h1 className="mt-6 text-[clamp(1.75rem,6vw,3rem)] leading-[1.15] font-bold text-white">
          <span className="font-semibold">Marketing that empowers </span>
          <span className="font-bold">healthcare brands </span>
          <span className="font-semibold">to stand apart.</span>
        </h1>

        <p className="mt-6 max-w-[484px] text-left text-base leading-[1.5] text-white sm:text-xl">
          We provide{" "}
          <strong className="font-semibold">
            growth strategy, referral development,
          </strong>{" "}
          and i
          <strong className="font-semibold">
            ntegrated digital marketing solutions
          </strong>{" "}
          designed to expand market presence and accelerate census.
        </p>

        <PillButton
          href="#contact"
          title="Work With Us"
          srHint="(navigate to contact section)"
          className="mt-8"
        >
          Work with us
        </PillButton>
      </div>
    </div>
  </section>
);

export default HeroSection;
