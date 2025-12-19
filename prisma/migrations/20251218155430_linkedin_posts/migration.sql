-- CreateTable
CREATE TABLE "LinkedInPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "authorUrn" TEXT NOT NULL,
    "text" TEXT,
    "visibility" TEXT,
    "lifecycleState" TEXT,
    "publishedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "lastModifiedAt" DATETIME NOT NULL,
    "raw" JSONB NOT NULL
);
