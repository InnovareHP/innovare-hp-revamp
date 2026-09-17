import FooterBar from "@/components/LandingPage/shared/FooterBar";
import SectionBadge from "@/components/LandingPage/shared/SectionBadge";
import { ArrowUpRight } from "lucide-react";
import ContactSection from "./ContactSection";

const offices = [
  {
    label: "Headquarters",
    name: "Grand Rapids Office",
    meta: "Comstock Park, MI",
    mapsHref:
      "https://maps.google.com/?q=4221+Bud+Drive+NE+Comstock+Park+MI+49321",
  },
  {
    label: "Satellite Office",
    name: "Ann Arbor Office",
    meta: "South State Commons, Ann Arbor, MI",
    mapsHref:
      "https://maps.google.com/?q=2723+S+State+St+Suite+150+Ann+Arbor+MI+48104",
  },
];

const ContactPage = () => (
  <footer id="contact" className="bg-surface-4">
    <div className="hp-container py-16 sm:py-20 lg:py-[60px]">
      <div className="grid gap-12 lg:grid-cols-[1fr_561px] lg:gap-10">
        <div>
          <SectionBadge number="08" className="w-fit">
            Contact us
          </SectionBadge>

          <h2
            data-anim="lines"
            className="mt-8 max-w-[580px] text-[clamp(1.75rem,4.5vw,2.5rem)] leading-[1.2] font-semibold text-ink lg:mt-[68px]"
          >
            Let&apos;s build what healthcare needs{" "}
            <span className="text-brand">next.</span>
          </h2>

          <p className="mt-5 max-w-[470px] text-base leading-[25px] text-ink sm:text-lg lg:mt-[35px]">
            Tell us what you&apos;re looking to build. We&apos;re ready to help.
          </p>

          <ul data-anim="stagger" className="mt-10 max-w-[328px] lg:mt-[62px]">
            {offices.map((office, index) => (
              <li
                key={office.name}
                className={index > 0 ? "border-t border-hairline pt-8" : ""}
              >
                <a
                  href={office.mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover-row="10"
                  className="hp-hover-row group flex items-start justify-between gap-4 pb-8 no-underline"
                >
                  <span>
                    <span className="block text-base leading-[25px] text-brand uppercase">
                      {office.label}
                    </span>
                    <span className="mt-0.5 block text-xl font-semibold text-ink sm:text-2xl">
                      {office.name}
                    </span>
                    <span className="mt-1 block text-sm leading-[25px] text-ink-muted sm:text-base">
                      {office.meta}
                    </span>
                    <span className="sr-only">
                      {" "}
                      (opens Google Maps in a new tab)
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="mt-1 size-4 shrink-0 text-ink transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    strokeWidth={2.4}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div id="contact-form" data-anim="zoom" className="scroll-mt-32">
          <ContactSection />
        </div>
      </div>
    </div>

    <FooterBar />
  </footer>
);

export default ContactPage;
