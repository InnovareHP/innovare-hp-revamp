"use client";
import { LinkedInPost } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const WhatWeAreTalkingAbout = ({
  initialPosts,
}: {
  initialPosts: LinkedInPost[];
}) => {
  const [posts, setPosts] = useState<LinkedInPost[]>(initialPosts);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // ✅ set initial cursor from last post
  useEffect(() => {
    if (initialPosts.length > 0) {
      setCursor(initialPosts[initialPosts.length - 1].id);
    }
  }, [initialPosts]);

  const cleanText = (text: string | null) => {
    if (!text) return "";
    return text
      .replace(/@\[([^\]]+)\]\(urn:li:[^)]+\)/g, "$1")
      .replace(/\{hashtag\|.*?\|(.*?)\}/g, "$1")
      .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, "")
      .replace(/#\w+/g, "")
      .replace(/[\\|{}]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  const loadMore = async () => {
    if (!cursor || loading) return;

    setLoading(true);

    const res = await fetch(`/api/posts?cursor=${cursor}`);
    const data = await res.json();

    if (!data.posts || data.posts.length === 0) {
      setHasMore(false);
      setLoading(false);
      return;
    }

    setPosts((prev) => [...prev, ...data.posts]);
    setCursor(data.nextCursor);
    setHasMore(Boolean(data.nextCursor));
    setLoading(false);
  };

  return (
    <section
      id="what-we-are-talking-about"
      className="max-w-7xl mx-auto px-6 lg:px-12 py-20 bg-white"
    >
      <div className="mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900">
          What we&apos;re talking about
        </h2>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {posts.map((post) => (
          <Link
            href={`https://www.linkedin.com/embed/feed/update/${post.id}`}
            target="_blank"
            key={post.id}
          >
            <div className="break-inside-avoid group bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all">
              {post.images?.[0]?.imageUrl && (
                <div className="relative aspect-square w-full">
                  <Image
                    src={post.images[0].imageUrl}
                    alt="Post content"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              )}

              <div className="p-8">
                <p className="text-slate-800 text-lg font-medium">
                  &ldquo;{cleanText(post.text)}&rdquo;
                </p>

                <div className="mt-8 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-blue-600">
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <div className="text-xs text-slate-400">{post.timeAgo}</div>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center shadow">
                    <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* ✅ Load More */}
      {hasMore && (
        <div className="mt-14 flex justify-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </section>
  );
};

export default WhatWeAreTalkingAbout;
