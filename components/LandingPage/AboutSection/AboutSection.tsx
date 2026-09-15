import PillButton from "@/components/LandingPage/shared/PillButton";
import SectionBadge from "@/components/LandingPage/shared/SectionBadge";
import Image from "next/image";

const AboutSection = () => (
  <section
    id="about"
    aria-label="About us"
    className="bg-surface-1 py-16 sm:py-20 lg:py-[126px]"
  >
    <div className="hp-container">
      <div
        data-anim="stagger"
        className="grid gap-8 lg:grid-cols-[250px_1fr] lg:gap-10"
      >
        <SectionBadge number="01" className="w-fit">
          About us
        </SectionBadge>

        <h2 className="text-[clamp(1.5rem,3.6vw,2.25rem)] leading-[1.25] font-medium text-ink">
          We are community resource educators who use creative and thoughtful
          communication methods and technology to help our healthcare partners
          grow in a <span className="hp-mark">meaningful way.</span>
        </h2>
      </div>

      <div className="mt-10 grid items-end gap-8 lg:mt-[54px] lg:grid-cols-2 lg:gap-12">
        <div
          data-anim="stagger"
          data-anim-from="slide-left"
          className="flex items-end gap-4 sm:gap-[22px]"
        >
          <div className="relative min-w-0 flex-1 overflow-hidden rounded-[20px] lg:w-[290px] lg:flex-none">
            <Image
              src="/images/redesign/about-1.webp"
              alt="Innovare HP strategist presenting to a healthcare client"
              width={290}
              height={323}
              sizes="(max-width: 1024px) 45vw, 290px"
              className="h-full w-full object-cover"
              style={{ aspectRatio: "290 / 323" }}
            />
          </div>
          <div className="relative min-w-0 flex-1 overflow-hidden rounded-[20px] lg:w-[290px] lg:flex-none">
            <Image
              src="/images/redesign/about-2.webp"
              alt="Healthcare marketing team laughing together during a workshop"
              width={290}
              height={274}
              sizes="(max-width: 1024px) 45vw, 290px"
              className="h-full w-full object-cover"
              style={{ aspectRatio: "290 / 274" }}
            />
          </div>
        </div>

        <div data-anim="slide-right" className="lg:pl-6">
          <p className="max-w-[433px] text-base leading-[25px] text-ink sm:text-lg">
            The rise of patient choice and autonomy has transformed healthcare
            marketing, pushing facilities to adopt new, multi-platform
            strategies that combine conscious communication with impact-driven
            community development. The demand for fresh, innovative approaches
            has never been greater — and we&apos;re leading that advancement,
            constantly seeking better ways to deliver high-quality outreach.
          </p>

          <PillButton
            href="#process"
            variant="ghost"
            title="How we work"
            className="mt-6 -ml-6"
          >
            How we work
          </PillButton>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
