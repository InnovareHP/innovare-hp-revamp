"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, ExternalLink, Sparkles } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import {
  portfolioCategories,
  portfolioProjects,
  type PortfolioCategory,
} from "./portfolio-data";

type Filter = "All" | PortfolioCategory;

const cardVariants: Variants = {
  hidden: { y: 24 },
  visible: {
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const Portfolio = () => {
  const [filter, setFilter] = useState<Filter>("All");

  const projects = useMemo(() => {
    if (filter === "All") return portfolioProjects;
    return portfolioProjects.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <section
      id="portfolio"
      className="relative w-full overflow-hidden bg-slate-950 text-white py-20 md:py-28"
      aria-label="Recent website projects portfolio"
    >
      {/* Tech grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />
      {/* Accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[480px] w-[820px] rounded-full blur-3xl opacity-30"
        style={{
          background:
            "radial-gradient(closest-side, rgba(6,182,212,0.55), rgba(59,130,246,0.25), transparent)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl mb-10 md:mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium tracking-widest uppercase text-cyan-300 mb-5">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Selected Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Healthcare websites engineered to{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400 bg-clip-text text-transparent">
              convert
            </span>
            .
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            We build modern, performant, ADA-compliant web platforms for senior
            care, behavioral health, and clinical organizations. Every project
            is measured. Every result is real.
          </p>
        </motion.div>

        {/* Filter chips */}
        <div
          className="flex flex-wrap gap-2 mb-10 md:mb-12"
          role="tablist"
          aria-label="Filter portfolio by category"
        >
          {portfolioCategories.map((cat) => {
            const active = filter === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(cat)}
                className={`group relative px-4 py-2 text-sm font-medium rounded-full border transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 cursor-pointer ${
                  active
                    ? "bg-cyan-400 text-slate-950 border-cyan-300 shadow-[0_0_24px_-4px_rgba(34,211,238,0.6)]"
                    : "bg-white/5 text-slate-200 border-white/10 hover:bg-white/10 hover:border-cyan-400/40"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ staggerChildren: 0.08 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7"
        >
          {projects.map((project) => {
            const isLink = project.url && project.url !== "#";
            const CardTag = isLink ? "a" : "div";
            const cardProps = isLink
              ? {
                  href: project.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "aria-label": `View live site: ${project.name} (opens in new tab)`,
                }
              : { "aria-label": `${project.name} case study` };

            return (
              <motion.li
                key={project.id}
                variants={cardVariants}
                className="list-none"
              >
                <CardTag
                  {...cardProps}
                  className="group relative flex flex-col h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_24px_60px_-20px_rgba(34,211,238,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  {/* Image / gradient placeholder */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <div
                      aria-hidden="true"
                      className={`absolute inset-0 bg-gradient-to-br ${project.accent}`}
                    />
                    {/* Decorative tech pattern when no image */}
                    {!project.image && (
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage:
                            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)",
                          backgroundSize: "24px 24px",
                        }}
                      />
                    )}
                    {!project.image && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-signika text-3xl md:text-4xl font-bold tracking-tight text-white/30 px-6 text-center">
                          {project.name}
                        </span>
                      </div>
                    )}
                    {project.image && (
                      <Image
                        src={project.image}
                        alt={`${project.name} website preview`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"
                    />
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-slate-950/80 backdrop-blur px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-cyan-300 border border-cyan-400/30">
                      {project.category}
                    </div>
                    <div className="absolute top-3 right-3 inline-flex items-center rounded-full bg-slate-950/80 backdrop-blur px-2.5 py-1 text-[10px] font-mono tabular-nums text-slate-300 border border-white/10">
                      {project.year}
                    </div>
                    {isLink && (
                      <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400 text-slate-950 opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 shadow-lg">
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-5 md:p-6">
                    <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors duration-200">
                      {project.name}
                    </h3>
                    <p className="mt-2 text-sm text-slate-400 leading-relaxed line-clamp-3">
                      {project.summary}
                    </p>

                    {/* Results */}
                    <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
                      {project.results.map((r) => (
                        <div key={r.label}>
                          <dt className="text-[10px] font-medium uppercase tracking-widest text-slate-500">
                            {r.label}
                          </dt>
                          <dd className="mt-0.5 font-mono tabular-nums text-base md:text-lg font-bold text-cyan-300">
                            {r.value}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    {/* Tags */}
                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <li
                          key={tag}
                          className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>

                    {isLink && (
                      <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-cyan-300 group-hover:text-cyan-200">
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        View live site
                      </div>
                    )}
                  </div>
                </CardTag>
              </motion.li>
            );
          })}
        </motion.ul>

        {/* CTA */}
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-14 md:mt-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-6 md:p-8"
        >
          <div>
            <h3 className="text-xl md:text-2xl font-bold">
              Have a project in mind?
            </h3>
            <p className="mt-1.5 text-sm md:text-base text-slate-400 max-w-xl">
              We partner with healthcare brands ready to lead. Let&rsquo;s talk
              strategy, build, and measurable outcomes.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold tracking-wide text-slate-950 hover:bg-cyan-300 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 shadow-[0_8px_30px_-6px_rgba(34,211,238,0.5)]"
          >
            Start a project
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
