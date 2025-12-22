export function extractImageUrns(posts: any[]) {
  const results: {
    postId: string;
    imageUrn: string;
    altText?: string;
    position: number;
  }[] = [];

  for (const post of posts) {
    const postId = post.id;
    const content = post?.content;

    let images: any[] = [];

    // ✅ Multi-image post
    if (content?.multiImage?.images?.length) {
      images = content.multiImage.images;
    }

    // ✅ Single media (image only, ignore video)
    else if (content?.media?.id?.startsWith("urn:li:image:")) {
      images = [content.media];
    }

    images.forEach((img, index) => {
      const urn = img?.id;

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
