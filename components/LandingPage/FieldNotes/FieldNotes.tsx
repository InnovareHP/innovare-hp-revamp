import FooterBar from "@/components/LandingPage/shared/FooterBar";
import SectionBadge from "@/components/LandingPage/shared/SectionBadge";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "../Navigation/Navigation";
import { articles } from "./articles";

const categories = [...new Set(articles.map((a) => a.category))];

const formatDate = (dateString: string) =>
  new Date(`${dateString}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

/**
 * Full Field Notes index. Speaks the landing page's language: `hp-container`
 * gutters, a `SectionBadge` opener, the marker headline, brand-blue link
 * headings and the hover rule that draws under a card — so arriving here from
 * the landing section doesn't read as a different site.
 */
const FieldNotes = () => (
  <>
    <Navigation isFieldNotes={true} />
    <main id="main-content" className="relative bg-white" tabIndex={-1}>
      <section id="field-notes" className="pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="hp-container">
          <header className="border-b border-hairline pb-10">
            <SectionBadge>Field notes</SectionBadge>

            <h1 className="mt-6 max-w-[760px] text-[clamp(1.875rem,5.5vw,3rem)] leading-[1.2] font-semibold text-balance text-ink">
              Insights and stories from across the{" "}
              <span className="hp-mark">healthcare industry.</span>
            </h1>

            <p className="mt-5 max-w-[560px] text-base leading-[1.6] text-pretty text-ink sm:text-lg">
              A curated collection of articles covering strategy, marketing,
              behavioral health, senior care, and more.
            </p>
          </header>

          <div className="mt-12 space-y-14 sm:mt-16">
            {categories.map((category) => (
              <section key={category} aria-label={category}>
                <h2 className="flex items-center gap-3 text-[13px] tracking-[0.18em] text-brand uppercase sm:gap-4 sm:text-sm">
                  {category}
                  <span aria-hidden className="h-px flex-1 bg-brand/25" />
                </h2>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {articles
                    .filter((a) => a.category === category)
                    .map((article) => (
                      <article key={article.id} className="group">
                        {article.image ? (
                          <Link
                            href={`/field-notes/${article.slug}`}
                            className="block overflow-hidden no-underline"
                            tabIndex={-1}
                            aria-hidden
                          >
                            <Image
                              src={article.image}
                              alt=""
                              width={640}
                              height={306}
                              sizes="(max-width: 640px) 100vw, 50vw"
                              className="w-full object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                              style={{ aspectRatio: "640 / 306" }}
                            />
                          </Link>
                        ) : null}

                        {/* The rule draws in under the whole card on hover,
                            same affordance as the landing page's cards. */}
                        <span
                          aria-hidden
                          className="hp-hover-rule mt-5 block h-[2px] w-full bg-brand"
                        />

                        <h3 className="mt-4 flex items-start gap-3 text-xl leading-[1.25] font-semibold transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                          <Link
                            href={`/field-notes/${article.slug}`}
                            className="text-brand no-underline hover:text-brand-deep"
                          >
                            {article.title}
                          </Link>
                          <ArrowUpRight
                            aria-hidden
                            className="mt-1 size-5 shrink-0 text-brand-bright opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          />
                        </h3>

                        <p className="mt-2 text-sm text-ink-muted">
                          {article.source} &middot;{" "}
                          {formatDate(article.publishedDate)}
                        </p>

                        <p className="mt-3 text-sm leading-[1.6] text-ink">
                          {article.description}
                        </p>
                      </article>
                    ))}
                </div>
              </section>
            ))}
          </div>

          <aside className="mt-16 border-t border-hairline bg-surface-3 px-6 py-10 text-center sm:mt-20 sm:px-10">
            <p className="text-base leading-[1.6] text-ink">
              Have an article to suggest?{" "}
              <Link
                href="/#contact"
                className="font-semibold text-brand underline underline-offset-4 hover:text-brand-deep"
              >
                Get in touch
              </Link>{" "}
              — we&apos;re always looking for great reads.
            </p>
          </aside>
        </div>
      </section>
    </main>
    <FooterBar />
  </>
);

export default FieldNotes;
