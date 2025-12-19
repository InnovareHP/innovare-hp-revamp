type LinkedInPostPayload = any;

export function extractImageUrns(posts: any[]) {
  const results: {
    postId: string;
    imageUrn: string;
    altText?: string;
    position?: number;
  }[] = [];

  for (const post of posts) {
    const postId = post.id;

    const images =
      (post?.content?.multiImage?.images ??
      post?.content?.carousel?.cards ??
      post?.content?.media)
        ? [post.content.media]
        : [];

    images.forEach((img: any, index: number) => {
      const urn = img?.id || img?.media || img?.image?.id;

      if (urn?.startsWith("urn:li:image:")) {
        results.push({
          postId,
          imageUrn: urn,
          altText: img?.altText ?? "",
          position: index,
        });
      }
    });
  }

  return results;
}
