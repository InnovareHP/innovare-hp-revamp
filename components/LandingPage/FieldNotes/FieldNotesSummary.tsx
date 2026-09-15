import PillButton from "@/components/LandingPage/shared/PillButton";
import SectionBadge from "@/components/LandingPage/shared/SectionBadge";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { articles } from "./articles";

const formatDate = (dateString: string) =>
  new Date(`${dateString}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const FieldNotesSummary = () => {
  const [featured, ...rest] = articles;

  return (
    <section
      id="field-notes"
      aria-label="Field notes"
      className="bg-white py-16 sm:py-20 lg:py-[113px]"
    >
      <div className="hp-container">
        <SectionBadge number="07" className="w-fit">
          Field notes
        </SectionBadge>

        <div
          data-anim="stagger"
          className="mt-8 grid gap-6 lg:mt-[73px] lg:grid-cols-[592px_1fr] lg:gap-16"
        >
          <h2 className="max-w-[592px] text-[clamp(1.75rem,4.5vw,2.5rem)] leading-[1.25] font-semibold text-ink">
            Insights and stories from across the{" "}
            <span className="hp-mark">healthcare industry.</span>
          </h2>
          <p className="max-w-[341px] self-center text-base leading-[25px] text-ink sm:text-lg lg:justify-self-end">
            Fresh perspectives on strategy, marketing, and the people driving
            change.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:mt-[54px] lg:grid-cols-[643px_1fr] lg:gap-[19px]">
          {/* Featured article */}
          <article data-anim="slide-left">
            {featured.image ? (
              <Link
                href={`/field-notes/${featured.slug}`}
                className="block overflow-hidden no-underline"
                tabIndex={-1}
                aria-hidden
              >
                <Image
                  src={featured.image}
                  alt=""
                  width={643}
                  height={307}
                  sizes="(max-width: 1024px) 100vw, 643px"
                  className="w-full object-cover"
                  style={{ aspectRatio: "643 / 307" }}
                />
              </Link>
            ) : null}

            <h3 className="mt-6 text-[clamp(1.375rem,2.6vw,1.875rem)] leading-[1.2] font-semibold lg:mt-[27px]">
              <Link
                href={`/field-notes/${featured.slug}`}
                className="text-brand no-underline hover:text-brand-deep"
              >
                {featured.title}
              </Link>
            </h3>

            <p className="mt-4 max-w-[632px] text-base leading-[25px] text-ink lg:text-lg">
              {featured.description}
            </p>

            <p className="mt-[15px] text-base leading-[25px] text-ink-muted sm:text-lg">
              {featured.source} &bull; {formatDate(featured.publishedDate)}
            </p>

            <PillButton
              href={`/field-notes/${featured.slug}`}
              variant="ghost"
              title={featured.title}
              className="mt-2 -ml-6"
            >
              Read article
            </PillButton>
          </article>

          {/* Secondary list */}
          <ul
            data-anim="stagger"
            data-anim-from="slide-right"
            className="divide-y divide-hairline bg-surface-4 px-6 py-2 sm:px-[29px]"
          >
            {rest.map((article) => (
              <li key={article.id}>
                <Link
                  href={`/field-notes/${article.slug}`}
                  className="group flex items-start gap-4 py-6 no-underline sm:py-[27px]"
                >
                  <span className="flex-1">
                    <span className="block text-xl leading-[1.2] font-semibold text-brand group-hover:text-brand-deep sm:text-2xl">
                      {article.title}
                    </span>
                    <span className="mt-3 block text-sm leading-[25px] text-ink-muted sm:text-base">
                      {article.source} &bull;{" "}
                      {formatDate(article.publishedDate)}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="mt-1 size-4 shrink-0 text-ink transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    strokeWidth={2.4}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default FieldNotesSummary;
