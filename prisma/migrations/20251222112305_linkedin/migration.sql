-- CreateTable
CREATE TABLE "LinkedInPost" (
    "id" TEXT NOT NULL,
    "authorUrn" TEXT NOT NULL,
    "text" TEXT,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "lastModifiedAt" TIMESTAMP(3) NOT NULL,
    "raw" JSONB NOT NULL,

    CONSTRAINT "LinkedInPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LinkedInPostImage" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "imageUrn" TEXT NOT NULL,
    "imageUrl" TEXT,
    "altText" TEXT,
    "position" INTEGER,

    CONSTRAINT "LinkedInPostImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LinkedInPostImage_postId_imageUrn_key" ON "LinkedInPostImage"("postId", "imageUrn");

-- AddForeignKey
ALTER TABLE "LinkedInPostImage" ADD CONSTRAINT "LinkedInPostImage_postId_fkey" FOREIGN KEY ("postId") REFERENCES "LinkedInPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
