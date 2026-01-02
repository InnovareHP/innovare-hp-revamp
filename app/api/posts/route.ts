import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cursor = searchParams.get("cursor") ?? undefined;

  const posts = await prisma.linkedInPost.findMany({
    take: 15,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      authorUrn: true,
      text: true,
      publishedAt: true,
      images: true,
    },
  });

  return NextResponse.json({
    posts,
    nextCursor: posts.length ? posts[posts.length - 1].id : null,
  });
}
