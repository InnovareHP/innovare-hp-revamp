import { extractImageUrns } from "./function";
import { prisma } from "./prisma";

const LINKEDIN_API = "https://api.linkedin.com/rest/posts";

export async function fetchLinkedInPosts() {
  const token = process.env.LINKEDIN_ACCESS_TOKEN!;
  const orgUrn = "urn:li:organization:98354058";
  const encodedOrgUrn = encodeURIComponent(orgUrn);

  const url =
    `${LINKEDIN_API}` +
    `?author=${encodedOrgUrn}` +
    `&q=author` +
    `&count=20` +
    `&sortBy=LAST_MODIFIED`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "LinkedIn-Version": "202511",
      "X-Restli-Protocol-Version": "2.0.0",
      "X-RestLi-Method": "FINDER",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`LinkedIn API failed: ${text}`);
  }

  const data = await res.json();

  for (const post of data.elements ?? []) {
    await prisma.linkedInPost.upsert({
      where: { id: post.id },
      update: {
        text: post.commentary ?? null,
        lastModifiedAt: new Date(post.lastModifiedAt),
        raw: post,
      },
      create: {
        id: post.id,
        authorUrn: post.author,
        text: post.commentary ?? null,
        publishedAt: new Date(post.publishedAt),
        createdAt: new Date(post.createdAt),
        lastModifiedAt: new Date(post.lastModifiedAt),
        raw: post,
      },
    });
  }

  console.log(`LinkedIn sync complete: ${data.elements?.length ?? 0} posts`);

  const images = extractImageUrns(data.elements ?? []);

  console.log("images", images);
  const uniqueImageUrns = [...new Set(images.map((i) => i.imageUrn))];

  console.log(uniqueImageUrns);

  // 3. Batch fetch images
  const imageMap = await fetchImagesByUrns(uniqueImageUrns);

  // 4. Save images
  for (const img of images) {
    const resolved = imageMap[img.imageUrn];

    await prisma.linkedInPostImage.upsert({
      where: {
        postId_imageUrn: {
          postId: img.postId,
          imageUrn: img.imageUrn,
        },
      },
      update: {
        imageUrl: resolved?.downloadUrl ?? null,
        altText: img.altText ?? null,
        position: img.position ?? null,
      },
      create: {
        postId: img.postId,
        imageUrn: img.imageUrn,
        imageUrl: resolved?.downloadUrl ?? null,
        altText: img.altText ?? null,
        position: img.position ?? null,
      },
    });
  }
}

export async function fetchImagesByUrns(imageUrns: string[]) {
  if (imageUrns.length === 0) return {};

  const token = process.env.LINKEDIN_ACCESS_TOKEN!;
  const encoded = imageUrns.map((u) => encodeURIComponent(u)).join(",");

  console.log("imageUrns", imageUrns);

  const url = `https://api.linkedin.com/rest/images?ids=List(${encoded})`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "LinkedIn-Version": "202511",
      "X-Restli-Protocol-Version": "2.0.0",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Image fetch failed: ${text}`);
  }

  const json = await res.json();

  /*
      Expected shape:
      {
        results: {
          "urn:li:image:XXX": {
            downloadUrl: "https://media.licdn.com/..."
          }
        }
      }
    */

  return json.results ?? {};
}
