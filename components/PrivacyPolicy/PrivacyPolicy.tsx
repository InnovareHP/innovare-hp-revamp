"use client";

import FooterBar from "@/components/LandingPage/shared/FooterBar";
import SectionBadge from "@/components/LandingPage/shared/SectionBadge";
import { motion, useScroll, useSpring, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navigation from "../LandingPage/Navigation/Navigation";
import { NOTICE_EMAIL } from "../LandingPage/shared/noticeCopy";

interface NavLink {
  id: string;
  title: string;
}

/**
 * Privacy policy in the landing page's visual language: a brand-deep hero over
 * the shared halftone, `hp-container` gutters, numbered `SectionBadge` openers
 * that echo the service rows, square editorial blocks rather than floating
 * rounded cards, and the site `FooterBar` closing the page.
 *
 * Legal copy is unchanged — only the presentation moved.
 */
const PrivacyPolicy = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const navLinks: NavLink[] = [
    { id: "collection", title: "Information Collection and Use" },
    { id: "usage", title: "How We Use Your Information" },
    { id: "log-data", title: "Log Data" },
    { id: "cookies", title: "Cookies" },
    { id: "sharing", title: "Use and Sharing of Personal Information" },
    { id: "sms-policy", title: "SMS/Mobile Messaging Policy" },
    { id: "service-providers", title: "Service Providers" },
    { id: "security", title: "Security" },
    { id: "links", title: "Links to Other Websites" },
    { id: "children", title: "Children's Privacy" },
    { id: "changes", title: "Changes to This Privacy Policy" },
    { id: "contact", title: "Contact Us" },
  ];

  /** Section index as the badge prints it, e.g. "05". */
  const badgeNumber = (id: string) =>
    String(navLinks.findIndex((link) => link.id === id) + 1).padStart(2, "0");

  const fadeInUp: Variants = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
  };

  const transitionBase = {
    duration: 0.6,
    ease: "easeOut",
  } as const;

  const staggerContainer: Variants = {
    initial: { opacity: 0 },
    whileInView: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  /** Hairline row for the bullet lists — square, no card chrome. */
  const listRow =
    "flex items-center gap-4 border-b border-hairline py-3 first:border-t";

  const heading =
    "text-[clamp(1.5rem,3.5vw,2rem)] leading-[1.25] font-semibold text-ink";

  return (
    <div className="relative bg-white text-ink selection:bg-brand selection:text-white">
      <motion.div
        className="fixed top-0 right-0 left-0 z-50 h-1 origin-left bg-brand-bright"
        style={{ scaleX }}
      />

      <Navigation isFieldNotes={true} />

      <main id="main-content" className="relative" tabIndex={-1}>
        {/* --- HERO --- */}
        <header className="relative overflow-hidden bg-brand-deep pt-28 pb-16 text-white sm:pt-32 sm:pb-20">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <Image
              src="/images/redesign/hero-texture.webp"
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-40"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hp-container relative"
          >
            <span className="flex items-center gap-4 text-[11px] tracking-[0.18em] text-white/60 uppercase">
              <span aria-hidden className="h-px w-8 bg-white/30" />
              Legal Document
            </span>

            <h1 className="mt-6 max-w-[760px] text-[clamp(1.875rem,6vw,3.5rem)] leading-[1.15] font-semibold text-balance">
              Privacy <span className="font-bold text-brand-glow">Policy</span>
            </h1>

            <p className="mt-5 text-base leading-[1.6] text-white/70 sm:text-lg">
              Innovare HP Healthcare Digital Marketing
            </p>
          </motion.div>
        </header>

        <div className="hp-container flex flex-col gap-16 py-16 sm:py-20 lg:flex-row lg:gap-20">
          {/* --- SECTION INDEX --- */}
          <aside className="shrink-0 lg:w-72">
            <div className="lg:sticky lg:top-28">
              <SectionBadge>Section index</SectionBadge>

              <nav aria-label="Table of contents" className="mt-6 flex flex-col">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.id}
                    href={`#${link.id}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx, ease: "easeOut" }}
                    whileHover={{ x: 4 }}
                    className="flex items-baseline gap-4 border-b border-hairline py-3 text-sm font-semibold text-ink no-underline transition-colors first:border-t hover:text-brand"
                  >
                    <span
                      aria-hidden
                      className="text-[11px] text-brand tabular-nums"
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    {link.title}
                  </motion.a>
                ))}
              </nav>
            </div>
          </aside>

          {/* --- POLICY --- */}
          <article className="max-w-3xl flex-1 space-y-20">
            <motion.section
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={transitionBase}
            >
              <p className="border-l-4 border-brand pl-6 text-xl leading-[1.5] text-ink italic">
                Innovare HP Healthcare Digital Marketing (&ldquo;Innovare
                HP,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or
                &ldquo;us&rdquo;) operates its website, platforms, and digital
                services that provide healthcare-focused digital marketing
                solutions (the &ldquo;Service&rdquo;).
              </p>
              <p className="mt-6 text-lg leading-[1.6] text-ink-muted">
                This Privacy Policy explains how we collect, use, store, and
                disclose Personal Information when you use our Service. We value
                privacy and are committed to handling data responsibly,
                transparently, and in accordance with applicable data protection
                laws.
              </p>
              <p className="mt-4 text-lg leading-[1.6] font-semibold text-ink">
                By using our Service, you agree to the collection and use of
                information as described in this Privacy Policy.
              </p>
            </motion.section>

            {/* 1. Collection */}
            <motion.section
              id="collection"
              className="scroll-mt-28"
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <SectionBadge number={badgeNumber("collection")}>
                Collection
              </SectionBadge>
              <motion.h2
                variants={fadeInUp}
                transition={transitionBase}
                className={`mt-5 mb-6 ${heading}`}
              >
                Information Collection and Use
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                transition={transitionBase}
                className="mb-6 leading-[1.6] text-ink-muted"
              >
                We actively collect and use user data to operate, improve, and
                deliver our services effectively.
              </motion.p>
              <div>
                {[
                  "Full name",
                  "Email address",
                  "Phone number",
                  "Company or organization name",
                  "Business or mailing address",
                  "Other information provided voluntarily",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    transition={transitionBase}
                    className={listRow}
                  >
                    <span
                      aria-hidden
                      className="size-1.5 shrink-0 rounded-full bg-brand-bright"
                    />
                    <span className="text-sm font-semibold text-ink">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* 2. Usage */}
            <motion.section
              id="usage"
              className="scroll-mt-28"
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <SectionBadge number={badgeNumber("usage")}>Usage</SectionBadge>
              <motion.h2
                variants={fadeInUp}
                transition={transitionBase}
                className={`mt-5 mb-6 ${heading}`}
              >
                How We Use Your Information
              </motion.h2>
              <div className="mb-8">
                {[
                  "Provide, operate, and improve services",
                  "Respond to support requests",
                  "Communicate updates or proposals",
                  "Communicate with providers on your behalf",
                  "Analyze usage trends",
                  "Comply with legal obligations",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    transition={transitionBase}
                    className={listRow}
                  >
                    <span
                      aria-hidden
                      className="size-1.5 shrink-0 rounded-full bg-brand-bright"
                    />
                    <span className="text-sm font-semibold text-ink">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
              <motion.div
                variants={fadeInUp}
                transition={transitionBase}
                className="border-l-4 border-brand bg-surface-3 p-6 text-sm leading-[1.6] text-brand-deep"
              >
                <strong>IMPORTANT:</strong> We do not intentionally collect
                Protected Health Information (PHI) from patients. Client data is
                handled with appropriate safeguards for business/marketing
                purposes only.
              </motion.div>
            </motion.section>

            {/* 3. Log Data */}
            <motion.section
              id="log-data"
              className="scroll-mt-28"
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={transitionBase}
            >
              <SectionBadge number={badgeNumber("log-data")}>
                Log data
              </SectionBadge>
              <h2 className={`mt-5 mb-6 ${heading}`}>Log Data</h2>
              <p className="leading-[1.6] text-ink-muted">
                We may automatically collect Log Data sent by your browser,
                including IP addresses, browser version, pages visited, and time
                spent on pages. This helps us improve functionality and
                security.
              </p>
            </motion.section>

            {/* 4. Cookies */}
            <motion.section
              id="cookies"
              className="scroll-mt-28"
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={transitionBase}
            >
              <SectionBadge number={badgeNumber("cookies")}>
                Cookies
              </SectionBadge>
              <h2 className={`mt-5 mb-6 ${heading}`}>Cookies</h2>
              <p className="mb-6 leading-[1.6] text-ink-muted">
                We use cookies to understand site traffic, improve content, and
                optimize marketing efforts.
              </p>
              <p className="text-sm text-ink-muted italic">
                You may refuse cookies via browser settings, though some
                features may be affected.
              </p>
            </motion.section>

            {/* 5. Use and Sharing */}
            <motion.section
              id="sharing"
              className="scroll-mt-28"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={transitionBase}
            >
              <div className="relative overflow-hidden bg-brand-deep p-8 text-white sm:p-10">
                <div aria-hidden className="pointer-events-none absolute inset-0">
                  <Image
                    src="/images/redesign/hero-texture.webp"
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 768px"
                    className="object-cover opacity-30"
                  />
                </div>

                <div className="relative">
                  <span className="flex items-center gap-4 text-[11px] tracking-[0.18em] text-white/60 uppercase">
                    <span aria-hidden className="h-px w-8 bg-white/30" />
                    {badgeNumber("sharing")} Sharing
                  </span>

                  <h2 className="mt-5 mb-6 text-[clamp(1.5rem,3.5vw,2rem)] leading-[1.25] font-semibold">
                    Use and Sharing of Personal Information
                  </h2>
                  <p className="mb-6 text-xl leading-[1.4] font-medium text-brand-glow">
                    We do not sell personal data.
                  </p>
                  <div className="space-y-6">
                    <ul className="list-inside list-disc space-y-4 text-sm text-white/80">
                      <li>
                        With trusted service providers for business operations
                      </li>
                      <li>
                        To communicate with healthcare organizations/partners
                      </li>
                      <li>To comply with legal obligations</li>
                    </ul>

                    {/* COMPLIANCE BLOCK ADDED BELOW */}
                    <div className="border-t border-brand-bright/30 pt-4">
                      <p className="text-sm leading-[1.6] font-bold text-brand-glow">
                        &quot;We do not share mobile contact information with
                        third parties or affiliates for marketing or promotional
                        purposes. Information may be shared with subcontractors
                        in support services, such as customer service. All other
                        categories exclude text messaging originator opt-in data
                        and consent; this information will not be shared with
                        any third parties.&quot;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* SMS/Mobile Messaging Policy */}
            <motion.section
              id="sms-policy"
              className="scroll-mt-28"
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={transitionBase}
            >
              <SectionBadge number={badgeNumber("sms-policy")}>
                Messaging
              </SectionBadge>
              <h2 className={`mt-5 mb-6 ${heading}`}>
                SMS/Mobile Messaging Policy
              </h2>
              <div className="space-y-6 leading-[1.6] text-ink-muted">
                <p>
                  By providing your phone number and opting in to receive SMS
                  from
                  <strong> Innovare HP</strong>, you agree to the following
                  terms:
                </p>
                <ul className="list-inside list-disc space-y-3">
                  <li>
                    <strong className="text-ink">Consent:</strong> Consent is
                    obtained through verbal agreement or email confirmation. By
                    agreeing, you authorize Innovare HP to send outbound text
                    messages.
                  </li>
                  <li>
                    <strong className="text-ink">Types of Messages:</strong> We
                    send messages related to business proposals, account updates,
                    and service reminders.
                  </li>
                  <li>
                    <strong className="text-ink">Frequency:</strong> Message
                    frequency varies based on your needs and interactions.
                  </li>
                  <li>
                    <strong className="text-ink">Rates:</strong> Message and data
                    rates may apply.
                  </li>
                  <li>
                    <strong className="text-ink">Opt-Out:</strong> You can cancel
                    the SMS service at any time. Just text{" "}
                    <strong className="text-ink">&quot;STOP&quot;</strong> to
                    stop. After you send the SMS message &quot;STOP&quot; to us,
                    we will send you an SMS message to confirm that you have been
                    unsubscribed.
                  </li>
                  <li>
                    <strong className="text-ink">Help:</strong> For help, text{" "}
                    <strong className="text-ink">&quot;HELP&quot;</strong> to our
                    number or contact us at {NOTICE_EMAIL}.
                  </li>
                </ul>
              </div>
            </motion.section>

            {/* 6. Service Providers */}
            <motion.section
              id="service-providers"
              className="scroll-mt-28"
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={transitionBase}
            >
              <SectionBadge number={badgeNumber("service-providers")}>
                Providers
              </SectionBadge>
              <h2 className={`mt-5 mb-6 ${heading}`}>Service Providers</h2>
              <p className="mb-6 leading-[1.6] text-ink-muted">
                We engage third parties to host platforms, provide analytics/CRM
                tools, and assist in business operations.
              </p>
              <p className="text-sm text-ink-muted">
                Providers are contractually obligated to protect your data and
                access it only for assigned tasks.
              </p>
            </motion.section>

            {/* 7. Security */}
            <motion.section
              id="security"
              className="scroll-mt-28"
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={transitionBase}
            >
              <SectionBadge number={badgeNumber("security")}>
                Security
              </SectionBadge>
              <h2 className={`mt-5 mb-6 ${heading}`}>Security</h2>
              <p className="leading-[1.6] text-ink-muted">
                We use commercially reasonable measures to safeguard your
                information. Note that no method of online transmission is 100%
                secure.
              </p>
            </motion.section>

            {/* 8, 9, 10 sections remain same but grouped for brevity */}
            <div className="space-y-12">
              <motion.section
                id="links"
                className="scroll-mt-28"
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={transitionBase}
              >
                <SectionBadge number={badgeNumber("links")}>
                  External links
                </SectionBadge>
                <h2 className="mt-5 mb-4 text-2xl leading-[1.25] font-semibold text-ink">
                  Links to Other Websites
                </h2>
                <p className="text-sm text-ink-muted">
                  We are not responsible for the data practices of external
                  sites.
                </p>
              </motion.section>

              <motion.section
                id="children"
                className="scroll-mt-28"
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={transitionBase}
              >
                <SectionBadge number={badgeNumber("children")}>
                  Children
                </SectionBadge>
                <h2 className="mt-5 mb-4 text-2xl leading-[1.25] font-semibold text-ink">
                  Children&rsquo;s Privacy
                </h2>
                <p className="text-sm text-ink-muted">
                  Our service is not intended for individuals below the legal
                  age.
                </p>
              </motion.section>

              <motion.section
                id="changes"
                className="scroll-mt-28"
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={transitionBase}
              >
                <SectionBadge number={badgeNumber("changes")}>
                  Changes
                </SectionBadge>
                <h2 className="mt-5 mb-4 text-2xl leading-[1.25] font-semibold text-ink">
                  Changes to This Privacy Policy
                </h2>
                <p className="text-sm text-ink-muted">
                  Updates become effective immediately upon posting. Please
                  review periodically.
                </p>
              </motion.section>
            </div>

            {/* 11. Contact Us */}
            <motion.section
              id="contact"
              className="scroll-mt-28"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex flex-col justify-between gap-8 bg-brand p-8 text-white sm:p-10 md:flex-row md:items-center">
                <div className="max-w-sm">
                  <span className="flex items-center gap-4 text-[11px] tracking-[0.18em] text-white/60 uppercase">
                    <span aria-hidden className="h-px w-8 bg-white/30" />
                    {badgeNumber("contact")} Contact
                  </span>
                  <h2 className="mt-5 text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.2] font-semibold">
                    Contact Us
                  </h2>
                  <p className="mt-4 text-sm leading-[1.6] text-white/80">
                    Questions about your data? Reach out through our official
                    channels.
                  </p>
                </div>

                <div className="border border-white/20 bg-white/10 p-6">
                  <span className="mb-2 block text-[11px] tracking-[0.18em] text-white/70 uppercase">
                    Primary Email
                  </span>
                  <Link
                    href={`mailto:${NOTICE_EMAIL}`}
                    className="text-xl font-bold text-white underline decoration-white/40 underline-offset-8 hover:decoration-white"
                  >
                    {NOTICE_EMAIL}
                  </Link>
                </div>
              </div>
            </motion.section>
          </article>
        </div>

        <div className="hp-container flex items-center justify-between border-t border-hairline py-10">
          <span className="text-[11px] tracking-[0.18em] text-ink-muted uppercase">
            &copy; {new Date().getFullYear()} Innovare HP
          </span>
          <Link
            href="/"
            className="text-[11px] tracking-[0.18em] text-ink-muted no-underline uppercase transition-colors hover:text-brand"
          >
            Return Home
          </Link>
        </div>
      </main>

      <FooterBar />
    </div>
  );
};

export default PrivacyPolicy;
