// import Link from "next/link";
// import Navigation from "../LandingPage/Navigation/Navigation";

// const PrivacyPolicy = () => {
//   const lastUpdated = "December 19, 2025";

//   const navLinks = [
//     { id: "collection", title: "1. Information We Collect" },
//     { id: "usage", title: "2. How We Use Information" },
//     { id: "sharing", title: "3. Data Sharing" },
//     { id: "security", title: "4. Security & Retention" },
//     { id: "rights", title: "6. Your Rights" },
//     { id: "contact", title: "10. Contact Us" },
//   ];

//   return (
//     <div className="text-slate-900 selection:bg-blue-100 selection:text-blue-900 py-20">
//       {/* --- HERO SECTION --- */}
//       <Navigation isFieldNotes={true} />
//       <header className="py-20 border-b border-slate-100">
//         <div className="max-w-6xl mx-auto px-6 lg:px-12">
//           <div className="flex items-center gap-2 mb-6">
//             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
//               Legal Document
//             </span>
//           </div>
//           <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
//             Privacy Policy
//           </h1>
//           <div className="flex flex-col md:flex-row md:items-center gap-4 text-slate-500 font-medium">
//             <p className="text-lg">Innovare HP</p>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-6xl mx-auto px-6 lg:px-12 py-20 flex flex-col lg:flex-row gap-16">
//         {/* --- STICKY SIDE NAVIGATION --- */}
//         <aside className="lg:w-64 flex-shrink-0">
//           <div className="sticky top-12">
//             <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">
//               Section Index
//             </h4>
//             <nav className="flex flex-col gap-4">
//               {navLinks.map((link) => (
//                 <a
//                   key={link.id}
//                   href={`#${link.id}`}
//                   className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors duration-200"
//                 >
//                   {link.title}
//                 </a>
//               ))}
//             </nav>
//           </div>
//         </aside>

//         {/* --- MAIN LEGAL CONTENT --- */}
//         <article className="flex-1 space-y-24 max-w-3xl">
//           <section className="prose prose-slate prose-lg max-w-none">
//             <p className="text-xl leading-relaxed text-slate-600 italic border-l-4 border-blue-600 pl-6">
//               Innovare HP (“we,” “our,” or “us”) values your privacy and is
//               committed to protecting the personal information you share with us
//               through our website and services (collectively, the “Services”).
//               This policy explains our practices when you visit{" "}
//               <a
//                 href="https://innovarehp.com"
//                 className="text-blue-600 no-underline font-bold"
//               >
//                 innovarehp.com
//               </a>
//               .
//             </p>
//           </section>

//           {/* 1. Information Collection */}
//           <section id="collection" className="scroll-mt-12">
//             <h2 className="text-3xl font-bold mb-8 tracking-tight">
//               1. Information We Collect
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
//                 <span className="text-blue-600 text-xs font-black uppercase tracking-widest block mb-4">
//                   A. Personal Data
//                 </span>
//                 <p className="text-sm text-slate-600 leading-relaxed">
//                   We collect information only when you voluntarily provide it.
//                   This may include your{" "}
//                   <strong className="text-slate-900">
//                     Name, Email address
//                   </strong>
//                   , and any communication sent via contact forms.
//                 </p>
//               </div>
//               <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
//                 <span className="text-blue-600 text-xs font-black uppercase tracking-widest block mb-4">
//                   B. Technical Data
//                 </span>
//                 <p className="text-sm text-slate-600 leading-relaxed">
//                   Our hosting infrastructure may collect basic technical
//                   information such as{" "}
//                   <strong className="text-slate-900">
//                     IP address, browser type, and OS
//                   </strong>{" "}
//                   for security and diagnostics.
//                 </p>
//               </div>
//             </div>
//             <div className="mt-4 p-6 bg-blue-50 rounded-2xl border border-blue-100">
//               <p className="text-sm text-blue-900 font-medium">
//                 <strong className="uppercase">Zero Tracking:</strong> We do not
//                 use cookies, tracking pixels, or similar behavioral tracking
//                 technologies.
//               </p>
//             </div>
//           </section>

//           {/* 2. Usage */}
//           <section id="usage" className="scroll-mt-12">
//             <h2 className="text-3xl font-bold mb-8 tracking-tight">
//               2. How We Use Your Information
//             </h2>
//             <p className="text-slate-600 mb-8">
//               We use your information solely to:
//             </p>
//             <div className="grid gap-3">
//               {[
//                 "Respond to inquiries and communicate with you",
//                 "Provide and improve our services",
//                 "Ensure website security and reliability",
//                 "Comply with legal obligations",
//               ].map((item, i) => (
//                 <div
//                   key={i}
//                   className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-xl hover:border-blue-200 transition-colors"
//                 >
//                   <div className="h-2 w-2 rounded-full bg-blue-600" />
//                   <span className="text-slate-700 font-semibold text-sm">
//                     {item}
//                   </span>
//                 </div>
//               ))}
//             </div>
//             <p className="mt-8 text-sm text-slate-500 italic">
//               * We do not use your information for advertising, profiling, or
//               behavioral tracking.
//             </p>
//           </section>

//           {/* 3. Sharing */}
//           <section id="sharing" className="scroll-mt-12">
//             <h2 className="text-3xl font-bold mb-8 tracking-tight">
//               3. Data Sharing and Disclosure
//             </h2>
//             <div className="p-10 bg-slate-900 text-white rounded-[2.5rem]">
//               <p className="text-xl font-medium leading-relaxed opacity-90 mb-6 italic">
//                 "We do not sell, rent, or trade your personal information."
//               </p>
//               <div className="space-y-4 text-sm opacity-80">
//                 <p>
//                   Data shared only with: 1. Trusted service providers
//                   (hosting/email) 2. Legal authorities if required by law.
//                 </p>
//                 <p className="border-t border-white/10 pt-4">
//                   All providers are contractually required to safeguard your
//                   information.
//                 </p>
//               </div>
//             </div>
//           </section>

//           {/* 4 & 5. Security and Retention */}
//           <section id="security" className="scroll-mt-12">
//             <div className="grid md:grid-cols-2 gap-12">
//               <div>
//                 <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
//                 <p className="text-slate-600 text-sm leading-relaxed">
//                   We apply reasonable technical and organizational measures to
//                   protect your personal information. Note that no method of
//                   electronic storage or transmission is completely secure.
//                 </p>
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold mb-4">5. Data Retention</h2>
//                 <p className="text-slate-600 text-sm leading-relaxed">
//                   We retain personal information only for as long as necessary
//                   to fulfill collection purposes or meet legal and contractual
//                   obligations.
//                 </p>
//               </div>
//             </div>
//           </section>

//           {/* 6. Your Rights */}
//           <section id="rights" className="scroll-mt-12">
//             <h2 className="text-3xl font-bold mb-8 tracking-tight">
//               6. Your Rights
//             </h2>
//             <p className="text-slate-600 mb-6">
//               Subject to applicable laws, you may have the right to:
//             </p>
//             <div className="flex flex-wrap gap-2">
//               {[
//                 "Request Access",
//                 "Request Correction",
//                 "Request Deletion",
//                 "Withdraw Consent",
//               ].map((right) => (
//                 <span
//                   key={right}
//                   className="px-5 py-2.5 bg-slate-100 text-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-200"
//                 >
//                   {right}
//                 </span>
//               ))}
//             </div>
//           </section>

//           {/* 7, 8, 9. Additional Clauses */}
//           <section className="space-y-12">
//             <div>
//               <h3 className="text-xl font-bold mb-3">
//                 7. Third-Party Services
//               </h3>
//               <p className="text-slate-600 text-sm">
//                 We are not responsible for the privacy practices of third-party
//                 websites linked on our site.
//               </p>
//             </div>
//             <div>
//               <h3 className="text-xl font-bold mb-3">8. Children’s Privacy</h3>
//               <p className="text-slate-600 text-sm">
//                 Our services are not intended for children under 13. We do not
//                 knowingly collect their data.
//               </p>
//             </div>
//             <div>
//               <h3 className="text-xl font-bold mb-3">
//                 9. Changes to This Policy
//               </h3>
//               <p className="text-slate-600 text-sm">
//                 Updates will be posted on this page with the revised date.
//               </p>
//             </div>
//           </section>

//           {/* 10. Contact Section */}
//           <section id="contact" className="scroll-mt-12 pt-12">
//             <div className="p-12 bg-blue-600 rounded-[3rem] text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
//               <div className="max-w-xs">
//                 <h2 className="text-4xl font-bold mb-4 tracking-tight">
//                   10. Contact Us
//                 </h2>
//                 <p className="text-blue-100 text-sm leading-relaxed">
//                   Have questions about how we handle data? Reach out directly.
//                 </p>
//               </div>
//               <div className="space-y-4">
//                 <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/20">
//                   <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 block mb-2">
//                     Primary Email
//                   </span>
//                   <a
//                     href="mailto:info@innovarehp.com"
//                     className="text-xl font-bold hover:text-blue-200 transition-colors underline underline-offset-8 decoration-white/30"
//                   >
//                     info@innovarehp.com
//                   </a>
//                 </div>
//                 <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/20">
//                   <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 block mb-2">
//                     Official Website
//                   </span>
//                   <a
//                     href="https://innovarehp.com"
//                     target="_blank"
//                     className="text-sm font-bold opacity-90 hover:opacity-100 transition-opacity"
//                   >
//                     innovarehp.com
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </article>
//       </div>

//       {/* --- REFINED FOOTER --- */}
//       <footer className="max-w-6xl mx-auto px-6 lg:px-12 py-16 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
//         <div className="flex items-center gap-4">
//           <div className="h-2 w-2 rounded-full bg-blue-600" />
//           <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
//             © 2025 Innovare HP
//           </span>
//         </div>
//         <div className="flex gap-10">
//           <a
//             href="#"
//             className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors"
//           >
//             Back to top ↑
//           </a>
//           <Link
//             href="/"
//             className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors"
//           >
//             Return Home
//           </Link>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default PrivacyPolicy;
