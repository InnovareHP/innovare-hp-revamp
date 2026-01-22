"use server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  forcePathStyle: true,
  region: process.env.AWS_REGION_LOC!,
  endpoint: process.env.AWS_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_ID!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});
export const uploadFile = async (file: File) => {
  const fileBuffer = await file.arrayBuffer();

  const key = `events/${crypto.randomUUID()}-${file.name}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
      Body: new Uint8Array(fileBuffer),
      ContentType: file.type,
      ACL: "public-read", // 👈 REQUIRED for public access
    })
  );

  const url = `https://xxldcsnneqmdwebkxgnl.supabase.co/storage/v1/object/public/media/${key}`;

  return {
    key,
    url,
  };
};
