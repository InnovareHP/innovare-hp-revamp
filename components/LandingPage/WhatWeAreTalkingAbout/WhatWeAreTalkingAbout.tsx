import { LinkedInPost } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

const WhatWeAreTalkingAbout = ({ posts }: { posts: LinkedInPost[] }) => {
  const cleanText = (text: string | null) => {
    if (!text) return "";
    return (
      text
        // 1. Fix LinkedIn Mentions: @[Tracy Lorenz](urn:li:...) -> Tracy Lorenz
        .replace(/@\[([^\]]+)\]\(urn:li:[^)]+\)/g, "$1")
        // 2. Fix Hashtag Metadata: {hashtag|\\#|Word} -> Word
        .replace(/\{hashtag\|.*?\|(.*?)\}/g, "$1")
        // 3. Remove Email addresses
        .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, "")
        // 4. Remove standard #hashtags at the end
        .replace(/#\w+/g, "")
        // 5. Clean up stray symbols and extra whitespace
        .replace(/[\\|{}]/g, "")
        .replace(/\s+/g, " ")
        .trim()
    );
  };
  return (
    <section
      id="what-we-are-talking-about"
      className="max-w-7xl mx-auto px-6 lg:px-12 py-20 bg-white"
    >
      <div className="mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-left text-blue-900">
          What we&apos;re talking about
        </h2>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="break-inside-avoid group flex flex-col bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            {post.images?.[0]?.imageUrl && (
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={post.images[0].imageUrl}
                  alt="Post content"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            )}

            <div className="p-8">
              <p className="text-slate-800 text-lg md:text-xl font-medium leading-snug">
                &ldquo;{cleanText(post.text)}&rdquo;
              </p>

              <div className="mt-8 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-blue-600">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <span className="text-xs text-slate-400">{post.timeAgo}</span>
                </div>
                <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Link
          href="https://www.linkedin.com/company/innovarehp"
          target="_blank"
          className="text-blue-600 hover:text-blue-700 border px-4 py-2 rounded-md  border-blue-600"
        >
          View all posts
        </Link>
      </div>
    </section>
  );
};

export default WhatWeAreTalkingAbout;
