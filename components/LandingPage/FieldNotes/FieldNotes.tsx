import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Navigation from "../Navigation/Navigation";
import { articles } from "./articles";

const categories = [...new Set(articles.map((a) => a.category))];

const FieldNotes = () => {
  return (
    <>
      <Navigation isFieldNotes={true} />
      <main id="main-content" className="relative" tabIndex={-1}>
        <section id="field-notes" className="pt-20">
          <div className="max-w-4xl mx-auto px-6 py-12 bg-white font-sans text-gray-800">
            {/* Header */}
            <header className="mb-12 border-b pb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Recommended Reading
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                A curated collection of articles from across the healthcare
                industry — covering strategy, marketing, behavioral health,
                senior care, and more. Click any article to read it on the
                original source.
              </p>
            </header>

            {/* Articles by category */}
            <div className="space-y-12">
              {categories.map((category) => (
                <div key={category}>
                  <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-900 mb-4">
                    {category}
                  </h2>
                  <div className="space-y-4">
                    {articles
                      .filter((a) => a.category === category)
                      .map((article) => (
                        <a
                          key={article.id}
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block group border border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 hover:shadow-md transition-all duration-200"
                        >
                          {article.image && (
                            <div className="relative w-full h-48 sm:h-56">
                              <Image
                                src={article.image}
                                alt={article.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 800px"
                              />
                            </div>
                          )}
                          <div className="flex items-start justify-between gap-4 p-5">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                                {article.title}
                              </h3>
                              <p className="text-sm text-blue-600 mt-1">
                                {article.source}
                              </p>
                              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                                {article.description}
                              </p>
                            </div>
                            <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600 flex-shrink-0 mt-1 transition-colors" />
                          </div>
                        </a>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <footer className="mt-16 bg-gray-50 p-8 rounded-xl border border-gray-100 text-center">
              <p className="text-gray-600">
                Have an article to suggest?{" "}
                <a
                  href="/#contact"
                  className="text-blue-700 hover:text-blue-800 underline font-medium"
                >
                  Get in touch
                </a>{" "}
                — we&apos;re always looking for great reads.
              </p>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
};

export default FieldNotes;
