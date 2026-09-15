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
        data-parallax
        data-hero-drift
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
      {/* Brand wash that drifts across the frame, so the banner is never a
          completely still photograph. Decorative and very low contrast. */}
      <div
        aria-hidden
        data-hero-sheen
        className="absolute inset-y-0 -left-1/3 w-2/3 bg-gradient-to-r from-transparent via-brand-bright/20 to-transparent mix-blend-screen"
      />
    </div>

    <div
      data-hero-copy
      className="hp-container relative lg:flex lg:h-full lg:items-center"
    >
      <div
        data-anim="hero"
        className="mx-auto flex max-w-[790px] flex-col items-center text-center"
      >
        {/* <p className="flex items-center gap-3 text-[13px] tracking-[0.05em] text-white uppercase sm:text-base">
          <span
            aria-hidden
            data-hero-pulse
            className="size-2 rounded-full bg-brand-bright"
          />
          Full-service marketing for healthcare
        </p> */}

        {/* Word-by-word mask reveal — each word rises out of its own line box,
            so the headline arrives with a rhythm instead of one block fade. */}
        <h1
          data-anim="words"
          className="mt-6 text-[clamp(1.75rem,6vw,3rem)] leading-[1.15] font-bold text-white"
        >
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

    {/* Scroll cue: a hairline that keeps travelling down its track. Purely
        decorative, hidden where the hero is a short stacked block. */}
    <span
      aria-hidden
      className="absolute bottom-8 left-1/2 hidden h-[54px] w-px -translate-x-1/2 overflow-hidden bg-white/25 lg:block"
    >
      <span data-hero-cue className="block h-1/2 w-px bg-white" />
    </span>
  </section>
);

export default HeroSection;
