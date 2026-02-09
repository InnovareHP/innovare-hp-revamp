"use client";

import { motion, useScroll, useSpring, Variants } from "framer-motion";
import Link from "next/link";
import Navigation from "../LandingPage/Navigation/Navigation";

interface NavLink {
  id: string;
  title: string;
}

const TermsAndConditions = () => {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const navLinks: NavLink[] = [
    { id: "acceptance", title: "Acceptance of Terms" },
    { id: "use", title: "Use of Website" },
    { id: "services", title: "Services" },
    { id: "responsibilities", title: "User Responsibilities" },
    { id: "intellectual", title: "Intellectual Property" },
    { id: "third-party", title: "Third-Party Links" },
    { id: "liability", title: "Limitation of Liability" },
    { id: "indemnification", title: "Indemnification" },
    { id: "termination", title: "Termination" },
    { id: "privacy", title: "Privacy Policy" },
    { id: "governing", title: "Governing Law" },
    { id: "changes", title: "Changes to Terms" },
    { id: "contact", title: "Contact Information" },
  ];

  const fadeInUp: Variants = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
  };

  const staggerContainer: Variants = {
    initial: { opacity: 0 },
    whileInView: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const transitionBase = {
    duration: 0.6,
    ease: "easeOut",
  } as const;

  return (
    <div className="text-slate-900 selection:bg-blue-100 selection:text-blue-900 py-20 relative">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50"
        style={{ scaleX }}
      />

      <Navigation isFieldNotes={true} />

      <main id="main-content" className="relative" tabIndex={-1}>
        {/* HERO */}
        <header className="py-20 border-b border-slate-100">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto px-6 lg:px-12"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
                Legal Document
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Terms & Conditions
            </h1>

            <p className="text-lg text-slate-700 font-medium">
              Innovare HP — Healthcare Digital Marketing & Growth Solutions
            </p>

            <p className="text-sm text-slate-500 mt-4">
              Effective Date: January 1, 2026
            </p>
          </motion.div>
        </header>

        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-20 flex flex-col lg:flex-row gap-16">
          {/* SIDEBAR */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-12">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-6">
                Section Index
              </h4>

              <nav className="flex flex-col gap-4">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.id}
                    href={`#${link.id}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx }}
                    whileHover={{ x: 5, color: "#2563eb" }}
                    className="text-sm font-bold text-slate-700"
                  >
                    {link.title}
                  </motion.a>
                ))}
              </nav>
            </div>
          </aside>

          {/* CONTENT */}
          <article className="flex-1 space-y-24 max-w-3xl">
            {/* Intro */}
            <motion.section
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              transition={transitionBase}
              className="prose prose-slate prose-lg max-w-none"
            >
              <p className="text-xl leading-relaxed text-slate-600 italic border-l-4 border-blue-600 pl-6">
                These Terms & Conditions ("Terms") govern your access to and use
                of Innovare HP Healthcare Digital Marketing's ("Innovare HP,"
                "we," "our," or "us") website, services, and digital platforms
                (collectively, the "Service").
              </p>

              <p className="text-lg text-slate-600 mt-6">
                By accessing or using this website, you ("User," "you," or
                "your") agree to comply with and be bound by these Terms. If you
                do not agree with any part of these Terms, you must discontinue
                use of the Service immediately.
              </p>

              <p className="text-lg text-slate-600 mt-4 font-semibold">
                Please read these Terms carefully before using our Service.
              </p>
            </motion.section>

            {/* 1. Acceptance */}
            <motion.section
              id="acceptance"
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
                Acceptance of Terms
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                transition={transitionBase}
                className="text-slate-600 leading-relaxed mb-4"
              >
                By accessing Innovare HP's website, you confirm that you have
                read, understood, and agreed to be bound by these Terms and all
                applicable laws and regulations. These Terms apply to all
                visitors, users, and others who access or use the Service.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                transition={transitionBase}
                className="text-slate-600 leading-relaxed mb-4"
              >
                You represent that you are at least 18 years of age, or the age
                of legal majority in your jurisdiction, and have the legal
                capacity to enter into these Terms. If you are accessing the
                Service on behalf of an organization, you represent and warrant
                that you have the authority to bind that organization to these
                Terms.
              </motion.p>
              <motion.div
                variants={fadeInUp}
                transition={transitionBase}
                className="p-6 bg-blue-50 rounded-2xl border border-blue-100 text-sm text-blue-900 font-medium leading-relaxed"
              >
                <strong>NOTE:</strong> Your continued use of the Service
                following the posting of any changes to these Terms constitutes
                acceptance of those changes.
              </motion.div>
            </motion.section>

            {/* 2. Use */}
            <motion.section
              id="use"
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
                Use of Website
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                transition={transitionBase}
                className="text-slate-600 leading-relaxed mb-6"
              >
                You agree to use this website for lawful purposes only. You may
                not use the Service in any way that could damage, disable,
                overburden, or impair the website or interfere with any other
                party's use of the Service.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                transition={transitionBase}
                className="text-slate-600 leading-relaxed mb-6"
              >
                The following activities are strictly prohibited:
              </motion.p>
              <div className="grid gap-3">
                {[
                  "Using the website for any fraudulent, harmful, or misleading purpose",
                  "Attempting to gain unauthorized access to any part of the Service or its systems",
                  "Scraping, data mining, or using automated tools to extract content",
                  "Reverse engineering, decompiling, or disassembling any part of the website",
                  "Uploading or transmitting viruses, malware, or other harmful code",
                  "Impersonating any person or entity, or misrepresenting your affiliation",
                  "Interfering with the proper functioning of the website or its infrastructure",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    transition={transitionBase}
                    className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-xl shadow-sm"
                  >
                    <div className="h-2 w-2 rounded-full bg-blue-600 shrink-0" />
                    <span className="text-slate-700 font-semibold text-sm">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* 3. Services */}
            <motion.section
              id="services"
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
                Services
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                transition={transitionBase}
                className="text-slate-600 leading-relaxed mb-4"
              >
                Innovare HP provides healthcare-focused digital marketing,
                consulting, and growth strategy solutions. Our services include,
                but are not limited to, marketing strategy development, digital
                advertising, branding, content creation, event management, and
                growth consulting for healthcare organizations.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                transition={transitionBase}
                className="text-slate-600 leading-relaxed mb-6"
              >
                All content on this website, including service descriptions,
                case studies, and educational materials, is provided for
                informational purposes only and does not constitute a binding
                agreement, professional advice, or guarantee of results.
              </motion.p>
              <motion.div
                variants={fadeInUp}
                transition={transitionBase}
                className="p-6 bg-blue-50 rounded-2xl border border-blue-100 text-sm text-blue-900 font-medium leading-relaxed"
              >
                <strong>IMPORTANT:</strong> Nothing on this website constitutes
                medical, legal, or professional healthcare advice. Innovare HP
                provides marketing and business growth services only. Always
                consult qualified professionals for medical or legal decisions.
              </motion.div>
            </motion.section>

            {/* 5. Responsibilities */}
            <motion.section
              id="responsibilities"
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
                User Responsibilities
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                transition={transitionBase}
                className="text-slate-600 leading-relaxed mb-6"
              >
                As a user of our Service, you are responsible for the following:
              </motion.p>
              <div className="grid gap-3">
                {[
                  "Providing accurate, current, and complete information when submitting forms or registering for events",
                  "Maintaining the confidentiality of any account credentials or login information",
                  "Ensuring that your use of the Service complies with all applicable local, state, national, and international laws and regulations",
                  "Not using the Service to transmit spam, unsolicited communications, or promotional material",
                  "Promptly notifying Innovare HP of any unauthorized use of your account or any other security breach",
                  "Taking responsibility for all activity that occurs under your account or through your use of the Service",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    transition={transitionBase}
                    className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-xl shadow-sm"
                  >
                    <div className="h-2 w-2 rounded-full bg-blue-600 shrink-0" />
                    <span className="text-slate-700 font-semibold text-sm">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* 6. IP */}
            <motion.section
              id="intellectual"
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
                Intellectual Property
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                transition={transitionBase}
                className="text-slate-600 leading-relaxed mb-4"
              >
                All content, features, and functionality of this website —
                including but not limited to text, graphics, logos, icons,
                images, audio, video, software, designs, and the overall
                arrangement thereof — are the exclusive property of Innovare HP
                or its licensors and are protected by United States and
                international copyright, trademark, patent, trade secret, and
                other intellectual property or proprietary rights laws.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                transition={transitionBase}
                className="text-slate-600 leading-relaxed mb-4"
              >
                The Innovare HP name, logo, and all related names, logos,
                product and service names, designs, and slogans are trademarks
                of Innovare HP. You may not use such marks without the prior
                written permission of Innovare HP.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                transition={transitionBase}
                className="text-slate-600 leading-relaxed"
              >
                You are granted a limited, non-exclusive, non-transferable, and
                revocable license to access and use the website for personal,
                non-commercial purposes. Any reproduction, distribution,
                modification, or creation of derivative works from website
                content without express written consent is strictly prohibited.
              </motion.p>
            </motion.section>

            {/* 7. Third-Party Links */}
            <motion.section
              id="third-party"
              className="scroll-mt-12"
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={transitionBase}
            >
              <h2 className="text-3xl font-bold mb-8 tracking-tight">
                Third-Party Links
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Our website may contain links to third-party websites, services,
                or content that are not owned or controlled by Innovare HP. We
                have no control over, and assume no responsibility for, the
                content, privacy policies, or practices of any third-party
                websites or services.
              </p>
              <p className="text-slate-600 leading-relaxed">
                The inclusion of any link does not imply endorsement,
                affiliation, or sponsorship by Innovare HP. You acknowledge and
                agree that Innovare HP shall not be responsible or liable,
                directly or indirectly, for any damage or loss caused or alleged
                to be caused by or in connection with the use of or reliance on
                any such third-party content, goods, or services.
              </p>
            </motion.section>

            {/* 9. Liability */}
            <motion.section
              id="liability"
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
                Limitation of Liability
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                transition={transitionBase}
                className="text-slate-600 leading-relaxed mb-4"
              >
                To the maximum extent permitted by applicable law, Innovare HP,
                its directors, employees, partners, agents, suppliers, or
                affiliates shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages, including but not
                limited to:
              </motion.p>
              <div className="grid gap-3 mb-6">
                {[
                  "Loss of profits, data, or business opportunities",
                  "Loss of goodwill or reputation",
                  "Cost of procurement of substitute goods or services",
                  "Any other intangible losses",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    transition={transitionBase}
                    className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-xl shadow-sm"
                  >
                    <div className="h-2 w-2 rounded-full bg-blue-600 shrink-0" />
                    <span className="text-slate-700 font-semibold text-sm">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
              <motion.p
                variants={fadeInUp}
                transition={transitionBase}
                className="text-slate-600 leading-relaxed"
              >
                This limitation applies regardless of the legal theory under
                which such damages are sought, whether based on warranty,
                contract, tort (including negligence), strict liability, or any
                other legal basis, even if Innovare HP has been advised of the
                possibility of such damages.
              </motion.p>
            </motion.section>

            {/* 10. Indemnification */}
            <motion.section
              id="indemnification"
              className="scroll-mt-12"
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={transitionBase}
            >
              <h2 className="text-3xl font-bold mb-8 tracking-tight">
                Indemnification
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                You agree to defend, indemnify, and hold harmless Innovare HP,
                its officers, directors, employees, agents, licensors, and
                service providers from and against any claims, liabilities,
                damages, judgments, awards, losses, costs, expenses, or fees
                (including reasonable attorneys' fees) arising out of or
                relating to:
              </p>
              <ul className="space-y-3 text-slate-600 text-sm list-disc list-inside ml-2">
                <li>Your violation of these Terms</li>
                <li>Your use of the Service</li>
                <li>Your violation of any rights of a third party</li>
                <li>Any content you submit or transmit through the Service</li>
              </ul>
            </motion.section>

            {/* 11. Termination */}
            <motion.section
              id="termination"
              className="scroll-mt-12"
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={transitionBase}
            >
              <h2 className="text-3xl font-bold mb-8 tracking-tight">
                Termination
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Innovare HP reserves the right to terminate or suspend your
                access to the Service immediately, without prior notice or
                liability, for any reason whatsoever, including without
                limitation if you breach these Terms.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Upon termination, your right to use the Service will immediately
                cease. All provisions of these Terms which by their nature
                should survive termination shall survive, including but not
                limited to ownership provisions, warranty disclaimers,
                indemnification, and limitations of liability.
              </p>
            </motion.section>

            {/* 12. Privacy Policy */}
            <motion.section
              id="privacy"
              className="scroll-mt-12"
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={transitionBase}
            >
              <h2 className="text-3xl font-bold mb-8 tracking-tight">
                Privacy Policy
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Your use of the Service is also governed by our Privacy Policy,
                which describes how we collect, use, store, and disclose your
                personal information. By using the Service, you consent to the
                practices described in our Privacy Policy.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Please review our{" "}
                <Link
                  href="/privacy-policy"
                  className="text-blue-600 font-semibold underline underline-offset-4"
                >
                  Privacy Policy
                </Link>{" "}
                to understand our data handling practices.
              </p>
            </motion.section>

            {/* 13. Law */}
            <motion.section
              id="governing"
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
                Governing Law
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                transition={transitionBase}
                className="text-slate-600 leading-relaxed mb-4"
              >
                These Terms shall be governed by and construed in accordance
                with the laws of the State of Michigan, United States, without
                regard to its conflict of law provisions.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                transition={transitionBase}
                className="text-slate-600 leading-relaxed mb-4"
              >
                Any disputes arising out of or relating to these Terms or the
                Service shall be resolved exclusively in the state or federal
                courts located in the State of Michigan. You consent to the
                personal jurisdiction and venue of such courts and waive any
                objection based on inconvenient forum.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                transition={transitionBase}
                className="text-slate-600 leading-relaxed"
              >
                If any provision of these Terms is held to be unenforceable or
                invalid, such provision will be modified to the minimum extent
                necessary to make it enforceable, and the remaining provisions
                will continue in full force and effect.
              </motion.p>
            </motion.section>

            {/* 14. Changes */}
            <motion.section
              id="changes"
              className="scroll-mt-12"
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={transitionBase}
            >
              <h2 className="text-3xl font-bold mb-8 tracking-tight">
                Changes to Terms
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Innovare HP reserves the right to modify or replace these Terms
                at any time at our sole discretion. When we make material
                changes, we will update the "Effective Date" at the top of this
                page and post the revised Terms on our website.
              </p>
              <p className="text-slate-600 leading-relaxed">
                It is your responsibility to review these Terms periodically for
                changes. Your continued use of the Service following the posting
                of any changes constitutes acceptance of those changes. If you
                do not agree to the new Terms, you must stop using the Service.
              </p>
            </motion.section>

            {/* 15. Contact */}
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
                  <h2 className="text-4xl font-bold mb-4">
                    Contact Information
                  </h2>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    If you have any questions about these Terms & Conditions,
                    please reach out through our official channels.
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

        {/* FOOTER */}
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

export default TermsAndConditions;
