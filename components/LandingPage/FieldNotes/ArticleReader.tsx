"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, AlertTriangle } from "lucide-react";
import type { Article } from "./articles";

const formatDate = (dateString: string) => {
  return new Date(dateString + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const ArticleReader = ({ article }: { article: Article }) => {
  const [iframeError, setIframeError] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      {/* Top bar */}
      {/* Brand bar, same fill as the site header the reader just came from. */}
      <header className="z-10 flex flex-shrink-0 items-center gap-4 bg-brand px-4 py-3 text-white">
        <Link
          href="/field-notes"
          className="flex flex-shrink-0 items-center gap-1.5 text-white/80 no-underline transition-colors hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline text-sm font-medium">Back</span>
        </Link>

        <div className="h-5 w-px flex-shrink-0 bg-white/25" />

        <div className="flex-1 min-w-0">
          <h1 className="truncate text-sm font-semibold text-white">
            {article.title}
          </h1>
          <p className="truncate text-xs text-white/70">
            {article.source} &middot; {formatDate(article.publishedDate)}
          </p>
        </div>

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-glow no-underline transition-colors hover:text-white"
        >
          <span className="hidden sm:inline">Open original</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </header>

      {/* iframe or fallback */}
      {iframeError ? (
        <div className="flex flex-1 items-center justify-center bg-surface-2 px-6">
          <div className="text-center max-w-md">
            <AlertTriangle className="mx-auto mb-4 size-12 text-brand-bright" />
            <h2 className="mb-2 text-lg font-semibold text-ink">
              This article can&apos;t be displayed here
            </h2>
            <p className="mb-6 text-ink-muted">
              The source website doesn&apos;t allow embedding. You can read the
              full article on their site.
            </p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[50px] items-center gap-2.5 rounded-full bg-brand px-6 text-sm font-bold tracking-[0.02em] text-white uppercase no-underline transition-colors duration-300 hover:bg-brand-deep"
            >
              Read on {article.source}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      ) : (
        <iframe
          src={article.url}
          title={article.title}
          className="flex-1 w-full border-0"
          onError={() => setIframeError(true)}
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      )}
    </div>
  );
};

export default ArticleReader;
