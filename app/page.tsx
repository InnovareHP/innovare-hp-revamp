import { prisma } from "@/lib/prisma";
import { LinkedInPost } from "@/lib/types";
import LandingPage from "../components/LandingPage/LandingPage";

export default async function Home() {
  const now = new Date();
  const posts = await prisma.linkedInPost.findMany({
    orderBy: {
      publishedAt: "desc",
    },
    select: {
      id: true,
      authorUrn: true,
      text: true,
      publishedAt: true,
      images: {
        select: {
          id: true,
          imageUrn: true,
          imageUrl: true,
          altText: true,
          position: true,
        },
      },
    },
    take: 10,
  });

  const postsWithRelativeTime = posts.map((post) => {
    const publishedDate = new Date(post.publishedAt);
    const diffInMs = now.getTime() - publishedDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    let timeAgo = "";
    if (diffInDays === 0) {
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      timeAgo = diffInHours === 0 ? "Just now" : `${diffInHours}h`;
    } else {
      timeAgo = `${diffInDays}d`;
    }

    return {
      ...post,
      timeAgo, // New property for your card UI
    };
  });

  return (
    <LandingPage posts={postsWithRelativeTime as unknown as LinkedInPost[]} />
  );
}
