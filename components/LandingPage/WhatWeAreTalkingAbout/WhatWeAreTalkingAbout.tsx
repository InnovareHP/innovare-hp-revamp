"use client";

import { LinkedInPost } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";

const WhatWeAreTalkingAbout = ({
  initialPosts,
}: {
  initialPosts: Promise<LinkedInPost[]>;
}) => {
  const data = use(initialPosts);
  const [posts, setPosts] = useState<LinkedInPost[]>(data);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // ✅ set initial cursor from last post
  useEffect(() => {
    if (data.length > 0) {
      setCursor(data[data.length - 1].id);
    }
  }, [data]);

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
    
    // Announce loading state to screen readers
    const announcement = document.getElementById("posts-loading-announcement");
    if (announcement) {
      announcement.textContent = "Loading more posts...";
    }

    const res = await fetch(`/api/posts?cursor=${cursor}`);
    const data = await res.json();

    if (!data.posts || data.posts.length === 0) {
      setHasMore(false);
      setLoading(false);
      if (announcement) {
        announcement.textContent = "No more posts available.";
      }
      return;
    }

    const previousPostCount = posts.length;
    setPosts((prev) => [...prev, ...data.posts]);
    setCursor(data.nextCursor);
    setHasMore(Boolean(data.nextCursor));
    setLoading(false);
    
    // Announce loaded posts to screen readers
    if (announcement) {
      announcement.textContent = `Loaded ${data.posts.length} more post${data.posts.length === 1 ? '' : 's'}.`;
    }
    
    // Focus management: Move focus to first new post for keyboard users
    setTimeout(() => {
      const allPosts = document.querySelectorAll('[role="article"]');
      if (allPosts.length > previousPostCount) {
        const firstNewPost = allPosts[previousPostCount] as HTMLElement;
        const firstLink = firstNewPost?.querySelector('a[href]') as HTMLElement;
        if (firstLink) {
          firstLink.focus();
        }
      }
    }, 100);
  };

  return (
    <section
      id="what-we-are-talking-about"
      className="max-w-7xl mx-auto px-6 lg:px-12 py-20 bg-white"
      aria-label="What we're talking about section"
    >
      <div className="mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900">
          What we&apos;re talking about
        </h2>
      </div>
      
      {/* Screen reader announcements for dynamic content */}
      <div
        id="posts-loading-announcement"
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      />

      <div
        className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
        role="feed"
        aria-label="LinkedIn posts feed"
        aria-live="polite"
        aria-busy={loading}
      >
        {posts.map((post, index) => (
          <article
            key={post.id}
            aria-posinset={index + 1}
            aria-setsize={posts.length}
            className="break-inside-avoid"
          >
            <Link
              href={`https://www.linkedin.com/embed/feed/update/${post.id}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View LinkedIn post ${index + 1} by Innovare HP: ${cleanText(post.text).substring(0, 50)}... (opens in new tab)`}
              className="block group bg-slate-50 rounded-2xl border-2 border-slate-200 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {post.images?.[0]?.imageUrl && (
                <div className="relative aspect-square w-full">
                  <Image
                    src={post.images[0].imageUrl}
                    alt="Post content"
                    title="Post content"
                    width={1000}
                    height={1000}
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
                    <div className="text-xs text-slate-600">{post.timeAgo}</div>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center shadow">
                    <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                  </div>
                </div>
              </div>
          </Link>
          </article>
        ))}
      </div>

      {/* ✅ Load More */}
      {hasMore && (
        <div className="mt-14 flex justify-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label={
              loading ? "Loading more posts" : "Load more LinkedIn posts"
            }
            aria-busy={loading}
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </section>
  );
};

export default WhatWeAreTalkingAbout;
