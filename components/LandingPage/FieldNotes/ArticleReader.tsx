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
      <header className="flex items-center gap-4 px-4 py-3 bg-white border-b border-gray-200 shadow-sm flex-shrink-0 z-10">
        <Link
          href="/field-notes"
          className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition-colors flex-shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline text-sm font-medium">Back</span>
        </Link>

        <div className="h-5 w-px bg-gray-300 flex-shrink-0" />

        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-semibold text-gray-900 truncate">
            {article.title}
          </h1>
          <p className="text-xs text-gray-500 truncate">
            {article.source} &middot; {formatDate(article.publishedDate)}
          </p>
        </div>

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 transition-colors flex-shrink-0 font-medium"
        >
          <span className="hidden sm:inline">Open original</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </header>

      {/* iframe or fallback */}
      {iframeError ? (
        <div className="flex-1 flex items-center justify-center bg-gray-50 px-6">
          <div className="text-center max-w-md">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              This article can&apos;t be displayed here
            </h2>
            <p className="text-gray-600 mb-6">
              The source website doesn&apos;t allow embedding. You can read the
              full article on their site.
            </p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
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
