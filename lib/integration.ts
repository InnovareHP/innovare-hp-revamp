import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { extractImageUrns } from "./function";
import { prisma } from "./prisma";

const LINKEDIN_API = "https://api.linkedin.com/rest/posts";

const s3 = new S3Client({
  forcePathStyle: true,
  region: process.env.AWS_REGION_LOC!,
  endpoint: process.env.AWS_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_ID!,
    secretAccessKey: process.env.AWS_SECRET!,
  },
});

async function downloadAndUploadImage(
  downloadUrl: string,
  imageUrn: string
): Promise<string | null> {
  try {
    const res = await fetch(downloadUrl);
    if (!res.ok) return null;

    const contentType = res.headers.get("content-type") ?? "image/jpeg";
    const buffer = new Uint8Array(await res.arrayBuffer());

    // Create a safe filename from the URN
    const safeUrn = imageUrn.replace(/[^a-zA-Z0-9]/g, "_");
    const ext = contentType.includes("png") ? "png" : "jpg";
    const key = `linkedin/${safeUrn}.${ext}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: key,
        Body: buffer,
        ContentType: contentType,
        ACL: "public-read",
      })
    );

    return `https://xxldcsnneqmdwebkxgnl.supabase.co/storage/v1/object/public/media/${key}`;
  } catch (err) {
    console.error(`Failed to upload image ${imageUrn}:`, err);
    return null;
  }
}

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

  console.log("data", data);

  for (const post of data.elements ?? []) {
    await prisma.linkedInPost.upsert({
      where: { id: post.id },
      update: {
        text: post.commentary ?? null,
        lastModifiedAt: new Date(post.lastModifiedAt),
        raw: post,
        linkUrl: post.url ?? undefined,
      },
      create: {
        id: post.id,
        authorUrn: post.author,
        text: post.commentary ?? null,
        publishedAt: new Date(post.publishedAt),
        createdAt: new Date(post.createdAt),
        lastModifiedAt: new Date(post.lastModifiedAt),
        linkUrl: post.url ?? undefined,
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

  // 4. Save images — download from LinkedIn and upload to Supabase
  for (const img of images) {
    const resolved = imageMap[img.imageUrn];
    const linkedInUrl = resolved?.downloadUrl ?? null;

    // Check if we already have a stored copy
    const existing = await prisma.linkedInPostImage.findUnique({
      where: {
        postId_imageUrn: {
          postId: img.postId,
          imageUrn: img.imageUrn,
        },
      },
      select: { storedUrl: true },
    });

    // Only upload if we don't already have a stored copy
    let storedUrl = existing?.storedUrl ?? null;
    if (!storedUrl && linkedInUrl) {
      storedUrl = await downloadAndUploadImage(linkedInUrl, img.imageUrn);
    }

    await prisma.linkedInPostImage.upsert({
      where: {
        postId_imageUrn: {
          postId: img.postId,
          imageUrn: img.imageUrn,
        },
      },
      update: {
        imageUrl: linkedInUrl,
        storedUrl: storedUrl ?? undefined,
        altText: img.altText ?? null,
        position: img.position ?? null,
      },
      create: {
        postId: img.postId,
        imageUrn: img.imageUrn,
        imageUrl: linkedInUrl,
        storedUrl,
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
