import { prisma } from "@/lib/prisma";
import { LinkedInPost } from "@/lib/types";
import LandingPage from "../components/LandingPage/LandingPage";

const BATCH_SIZE = 15;

export default async function Home() {
  const now = new Date();
  let allPosts: any[] = [];
  let skip = 0;

  while (true) {
    const batch = await prisma.linkedInPost.findMany({
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
      take: BATCH_SIZE,
      skip,
    });

    if (batch.length === 0) break;

    allPosts.push(...batch);
    skip += BATCH_SIZE;
  }

  const postsWithRelativeTime = allPosts.map((post) => {
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
      timeAgo,
    };
  });

  return <LandingPage posts={postsWithRelativeTime as LinkedInPost[]} />;
}
