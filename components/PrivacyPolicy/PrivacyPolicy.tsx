"use client";

import { motion, useScroll, useSpring, Variants } from "framer-motion";
import Link from "next/link";
import Navigation from "../LandingPage/Navigation/Navigation";

interface NavLink {
  id: string;
  title: string;
}

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
    { id: "service-providers", title: "Service Providers" },
    { id: "security", title: "Security" },
    { id: "links", title: "Links to Other Websites" },
    { id: "children", title: "Children's Privacy" },
    { id: "changes", title: "Changes to This Privacy Policy" },
    { id: "contact", title: "Contact Us" },
  ];

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

  return (
    <div className="text-slate-900 selection:bg-blue-100 selection:text-blue-900 py-20 relative">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50"
        style={{ scaleX }}
      />

      <Navigation isFieldNotes={true} />

      <main id="main-content" className="relative" tabIndex={-1}>
        {/* --- HERO SECTION --- */}
        <header className="py-20 border-b border-slate-100">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-6xl mx-auto px-6 lg:px-12"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
                Legal Document
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg text-slate-700 font-medium">
              Innovare HP Healthcare Digital Marketing
            </p>
          </motion.div>
        </header>

        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-20 flex flex-col lg:flex-row gap-16">
          {/* --- SIDE NAVIGATION --- */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-12">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-6">
                Section Index
              </h4>
              <nav role="navigation" aria-label="Table of contents" className="flex flex-col gap-4">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.id}
                    href={`#${link.id}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx, ease: "easeOut" }}
                    whileHover={{ x: 5, color: "#2563eb" }}
                    className="text-sm font-bold text-slate-700 transition-colors"
                  >
                    {link.title}
                  </motion.a>
                ))}
              </nav>
            </div>
          </aside>

          {/* --- MAIN CONTENT --- */}
          <article className="flex-1 space-y-24 max-w-3xl">
            <motion.section
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={transitionBase}
              className="prose prose-slate prose-lg max-w-none"
            >
              <p className="text-xl leading-relaxed text-slate-600 italic border-l-4 border-blue-600 pl-6">
                Innovare HP Healthcare Digital Marketing (“Innovare HP,” “we,”
                “our,” or “us”) operates its website, platforms, and digital
                services that provide healthcare-focused digital marketing
                solutions (the “Service”).
              </p>
              <p className="text-lg text-slate-600 mt-6">
                This Privacy Policy explains how we collect, use, store, and
                disclose Personal Information when you use our Service. We value
                privacy and are committed to handling data responsibly,
                transparently, and in accordance with applicable data protection
                laws.
              </p>
              <p className="text-lg text-slate-600 mt-4 font-semibold">
                By using our Service, you agree to the collection and use of
                information as described in this Privacy Policy.
              </p>
            </motion.section>

            {/* 1. Collection */}
            <motion.section
              id="collection"
              className="scroll-mt-12"
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2
                variants={fadeInUp}
                transition={transitionBase}
                className="text-3xl font-bold mb-8 tracking-tight"
              >
                Information Collection and Use
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                transition={transitionBase}
                className="text-slate-600 mb-6 leading-relaxed"
              >
                We actively collect and use user data to operate, improve, and
                deliver our services effectively.
              </motion.p>
              <div className="grid gap-3">
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
                    className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-xl shadow-sm"
                  >
                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                    <span className="text-slate-700 font-semibold text-sm">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* 2. Usage */}
            <motion.section
              id="usage"
              className="scroll-mt-12"
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2
                variants={fadeInUp}
                transition={transitionBase}
                className="text-3xl font-bold mb-8 tracking-tight"
              >
                How We Use Your Information
              </motion.h2>
              <div className="grid gap-3 mb-6">
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
                    className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-xl shadow-sm"
                  >
                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                    <span className="text-slate-700 font-semibold text-sm">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
              <motion.div
                variants={fadeInUp}
                transition={transitionBase}
                className="p-6 bg-blue-50 rounded-2xl border border-blue-100 text-sm text-blue-900 font-medium leading-relaxed"
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
              className="scroll-mt-12"
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={transitionBase}
            >
              <h2 className="text-3xl font-bold mb-8 tracking-tight">
                Log Data
              </h2>
              <p className="text-slate-600 leading-relaxed">
                We may automatically collect Log Data sent by your browser,
                including IP addresses, browser version, pages visited, and time
                spent on pages. This helps us improve functionality and
                security.
              </p>
            </motion.section>

            {/* 4. Cookies */}
            <motion.section
              id="cookies"
              className="scroll-mt-12"
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={transitionBase}
            >
              <h2 className="text-3xl font-bold mb-8 tracking-tight">
                Cookies
              </h2>
              <p className="text-slate-600 mb-6">
                We use cookies to understand site traffic, improve content, and
                optimize marketing efforts.
              </p>
              <p className="text-slate-600 text-sm italic">
                You may refuse cookies via browser settings, though some
                features may be affected.
              </p>
            </motion.section>

            {/* 5. Use and Sharing */}
            <motion.section
              id="sharing"
              className="scroll-mt-12"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={transitionBase}
            >
              <div className="p-10 bg-slate-900 text-white rounded-[2.5rem] shadow-xl">
                <h2 className="text-3xl font-bold mb-8">
                  Use and Sharing of Personal Information
                </h2>
                <p className="text-xl font-medium mb-6 italic opacity-90">
                  We do not sell personal data.
                </p>
                <ul className="space-y-4 opacity-80 text-sm list-disc list-inside">
                  <li>With trusted service providers</li>
                  <li>To communicate with healthcare organizations/partners</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect the safety of Innovare HP and its users</li>
                </ul>
              </div>
            </motion.section>

            {/* 6. Service Providers */}
            <motion.section
              id="service-providers"
              className="scroll-mt-12"
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={transitionBase}
            >
              <h2 className="text-3xl font-bold mb-8 tracking-tight">
                Service Providers
              </h2>
              <p className="text-slate-600 mb-6">
                We engage third parties to host platforms, provide analytics/CRM
                tools, and assist in business operations.
              </p>
              <p className="text-slate-600 text-sm">
                Providers are contractually obligated to protect your data and
                access it only for assigned tasks.
              </p>
            </motion.section>

            {/* 7. Security */}
            <motion.section
              id="security"
              className="scroll-mt-12"
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={transitionBase}
            >
              <h2 className="text-3xl font-bold mb-8 tracking-tight">
                Security
              </h2>
              <p className="text-slate-600">
                We use commercially reasonable measures to safeguard your
                information. Note that no method of online transmission is 100%
                secure.
              </p>
            </motion.section>

            {/* 8. Links, 9. Children, 10. Changes */}
            <motion.section
              id="links"
              className="scroll-mt-12"
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={transitionBase}
            >
              <h2 className="text-2xl font-bold mb-4">
                Links to Other Websites
              </h2>
              <p className="text-slate-600 text-sm">
                We are not responsible for the data practices of external sites
                linked from our Service.
              </p>
            </motion.section>

            <motion.section
              id="children"
              className="scroll-mt-12"
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={transitionBase}
            >
              <h2 className="text-2xl font-bold mb-4">Children’s Privacy</h2>
              <p className="text-slate-600 text-sm">
                Our service is not intended for individuals who are below the
                legal age in their jurisdiction. We do not knowingly collect
                their personal data.
              </p>
            </motion.section>

            <motion.section
              id="changes"
              className="scroll-mt-12"
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={transitionBase}
            >
              <h2 className="text-2xl font-bold mb-4">
                Changes to This Privacy Policy
              </h2>
              <p className="text-slate-600 text-sm">
                Updates will be posted here and become effective immediately.
                Please review periodically.
              </p>
            </motion.section>

            {/* 11. Contact Us */}
            <motion.section
              id="contact"
              className="scroll-mt-12 pt-12"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="p-12 bg-blue-600 rounded-[3rem] text-white flex flex-col md:flex-row justify-between items-center gap-10 shadow-2xl">
                <div className="max-w-xs text-center md:text-left">
                  <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    Questions about your data? Reach out through our official
                    channels.
                  </p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/20"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-60 block mb-2">
                    Primary Email
                  </span>
                  <Link
                    href="mailto:info@innovarehp.com"
                    className="text-xl font-bold underline underline-offset-8 decoration-white/30"
                  >
                    info@innovarehp.com
                  </Link>
                </motion.div>
              </div>
            </motion.section>
          </article>
        </div>

        <footer className="max-w-6xl mx-auto px-6 lg:px-12 py-16 border-t border-slate-100 flex justify-between items-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
            © 2026 Innovare HP
          </span>
          <Link
            href="/"
            className="text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-blue-600 transition-colors"
          >
            Return Home
          </Link>
        </footer>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
