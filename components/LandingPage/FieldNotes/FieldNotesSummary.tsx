"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { articles } from "./articles";

const formatDate = (dateString: string) => {
  return new Date(dateString + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const FieldNotesSummary = () => {
  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const itemVariants: Variants = {
    hidden: { y: 30 },
    visible: {
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      id="field-notes"
      className="bg-white w-full overflow-hidden"
      aria-label="Field Notes section"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-8 lg:px-12 xl:px-16 py-16"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-10">
          <h2 className="text-4xl md:text-5xl text-gray-700 tracking-tight mb-4">
            <span className="font-bold">FIELD</span> NOTES
          </h2>
          <p className="text-gray-700 leading-relaxed text-base lg:text-xl font-sans font-normal max-w-2xl">
            Insights and stories from across the healthcare industry — curated
            reads on strategy, marketing, and the people driving change.
          </p>
        </motion.div>

        {/* Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <motion.div key={article.id} variants={itemVariants}>
              <Link
                href={`/field-notes/${article.slug}`}
                className="group block no-underline rounded-lg overflow-hidden border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
              >
                {article.image && (
                  <div className="relative w-full h-52 sm:h-60 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}
                <div className="p-6">
                  <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-1">
                    {article.source}
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    {formatDate(article.publishedDate)}
                  </p>
                  <h3 className="text-lg lg:text-xl font-semibold text-gray-900 group-hover:text-blue-700 transition-colors leading-snug mb-3">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                    {article.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-blue-600 group-hover:text-blue-700 text-sm font-medium">
                    Read article
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div variants={itemVariants} className="mt-10 text-center">
          <Link
            href="/field-notes"
            className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 font-medium text-lg transition-colors"
          >
            View all field notes
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FieldNotesSummary;
