import PillButton from "@/components/LandingPage/shared/PillButton";
import Image from "next/image";

/**
 * Hero per the Figma redesign: centred copy on a dark halftone field, with a
 * fan of five photographs anchored under it.
 *
 * All five cards are 2x exports that already carry their tilt, white frame and
 * brand glow, so nothing is rotated or framed in CSS — doing so would double
 * the angle and stack a second border on top of the baked one. Displayed
 * widths are half the export, capped in `vw` so the row keeps its proportions
 * on a narrow desktop without ever outgrowing the frame.
 *
 * The fan sits outside the page gutter and is centred with a measured gap
 * rather than spread edge to edge — spread across a wide monitor the cards
 * drift into five islands. Every card is a complete card, so a window wider
 * than the row shows all five whole; a narrower one lets the outer pair run
 * off the sides, which is how the Figma frame treats them. Narrow screens keep
 * the middle of the fan: the outer pair drops below `lg`, and a phone still
 * gets three — the inner pair narrows and its outer edges crop against the
 * section, which reads as a fan rather than a single stranded card.
 *
 * The hero runs under the fixed header, which is transparent until the reader
 * scrolls; the top padding is what keeps the copy clear of the bar.
 *
 * On a phone the section claims `100svh` — the viewport with the browser bars
 * showing, the state the reader lands in — so the next section's white does not
 * sit under the fold. The stack is then centred in that height rather than
 * parked at the top: the copy and the fan are sized by viewport *width*, so on a
 * tall narrow handset they cannot fill the height on their own, and any surplus
 * would otherwise collect as dead space beneath the cards. Centring splits it
 * above and below, and the gap before the fan scales with `svh` so the spread
 * lands in the layout rather than at its edges.
 */
const HeroSection = () => (
  <section
    id="hero-section"
    aria-label="Hero"
    className="relative w-full overflow-hidden bg-[#03102f] pt-[4.5rem] pb-8 max-sm:flex max-sm:min-h-[100svh] max-sm:flex-col max-sm:justify-center sm:pt-[7rem] sm:pb-14 lg:pt-[calc(81px+4rem)] lg:pb-[4.5rem]"
  >
    <div aria-hidden className="absolute inset-0">
      <Image
        data-parallax
        data-hero-drift
        src="/images/redesign/hero-texture.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* The same 45% black the design lays over the texture — it is what keeps
          the headline above AA contrast on the lighter top-right corner. */}
      <div className="absolute inset-0 bg-black/45" />
    </div>

    <div data-hero-copy className="hp-container relative">
      <div
        data-anim="hero"
        className="mx-auto flex max-w-[864px] flex-col items-center text-center"
      >
        <p className="text-xs tracking-[0.05em] text-white uppercase sm:text-base">
          Full-service marketing for healthcare
        </p>

        {/* Word-by-word mask reveal — each word rises out of its own line box,
            so the headline arrives with a rhythm instead of one block fade.
            `text-balance` evens the line lengths: at phone width the headline
            runs to four lines and, left to the normal greedy wrap, the last one
            is a single orphaned word. The size keeps scaling with the viewport
            below `sm` rather than sticking at the clamp floor, so 360px and
            430px screens don't get the same 30px type. */}
        <h1
          data-anim="words"
          className="mt-3 text-[clamp(1.75rem,7.5vw,3rem)] sm:mt-4 leading-[1.2] font-semibold text-balance text-white"
        >
          Marketing that empowers{" "}
          <span className="text-brand-glow font-bold">healthcare brands</span>{" "}
          to stand apart.
        </h1>

        <p className="mt-4 text-[0.9375rem] leading-[1.5] text-pretty text-white sm:mt-6 sm:text-xl">
          We provide{" "}
          <strong className="font-semibold">
            growth strategy, referral development,
          </strong>{" "}
          and{" "}
          <strong className="font-semibold">
            integrated digital marketing solutions
          </strong>{" "}
          designed to expand market presence and accelerate census.
        </p>

        <PillButton
          href="#contact"
          title="Work With Us"
          srHint="(navigate to contact section)"
          className="mt-7 sm:mt-8"
        >
          Work with us
        </PillButton>
      </div>
    </div>

    <div
      data-anim="stagger"
      data-anim-from="lift"
      className="relative mx-auto mt-[clamp(2.5rem,7svh,4.5rem)] flex w-full max-w-[1600px] items-start justify-center gap-2 sm:mt-10 sm:gap-6 lg:mt-[3.25rem] lg:gap-[clamp(14px,1.8vw,34px)]"
    >
      <Image
        src="/images/redesign/hero-fan-side-left.webp"
        quality={90}
        alt="Clinician talking with a patient across a desk"
        width={512}
        height={712}
        sizes="256px"
        className="hidden h-auto w-[min(18.5vw,256px)] shrink-0 lg:block"
      />
      <Image
        src="/images/redesign/hero-fan-inner-left.webp"
        quality={90}
        alt="Two colleagues in conversation in an open office"
        width={552}
        height={770}
        loading="eager"
        sizes="(min-width: 1024px) 276px, (min-width: 640px) 26vw, 36vw"
        className="h-auto w-[min(36vw,276px)] shrink-0 sm:w-[min(26vw,276px)] lg:w-[min(20vw,276px)]"
      />
      <Image
        src="/images/redesign/hero-fan-center.webp"
        quality={90}
        alt="Healthcare marketing team meeting outdoors over coffee"
        width={776}
        height={848}
        priority
        sizes="(min-width: 1024px) 388px, (min-width: 640px) 36vw, 46vw"
        className="h-auto w-[min(46vw,388px)] shrink-0 sm:w-[min(36vw,388px)] lg:w-[min(28vw,388px)]"
      />
      <Image
        src="/images/redesign/hero-fan-inner-right.webp"
        quality={90}
        alt="Two professionals shaking hands outside an office building"
        width={552}
        height={770}
        loading="eager"
        sizes="(min-width: 1024px) 276px, (min-width: 640px) 26vw, 36vw"
        className="h-auto w-[min(36vw,276px)] shrink-0 sm:w-[min(26vw,276px)] lg:w-[min(20vw,276px)]"
      />
      <Image
        src="/images/redesign/hero-fan-side-right.webp"
        quality={90}
        alt="Hospital staff reviewing notes on a tablet together"
        width={512}
        height={712}
        sizes="256px"
        className="hidden h-auto w-[min(18.5vw,256px)] shrink-0 lg:block"
      />
    </div>
  </section>
);

export default HeroSection;
