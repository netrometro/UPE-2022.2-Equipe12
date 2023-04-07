/*
  Warnings:

  - You are about to drop the column `assetId` on the `Music` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Music` table. All the data in the column will be lost.
  - You are about to drop the column `publicId` on the `Music` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Music` table. All the data in the column will be lost.
  - Added the required column `access_mode` to the `Music` table without a default value. This is not possible if the table is not empty.
  - Added the required column `asset_id` to the `Music` table without a default value. This is not possible if the table is not empty.
  - Added the required column `backup_bytes` to the `Music` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bytes` to the `Music` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `Music` table without a default value. This is not possible if the table is not empty.
  - Added the required column `etag` to the `Music` table without a default value. This is not possible if the table is not empty.
  - Added the required column `folder` to the `Music` table without a default value. This is not possible if the table is not empty.
  - Added the required column `format` to the `Music` table without a default value. This is not possible if the table is not empty.
  - Added the required column `public_id` to the `Music` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resource_type` to the `Music` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secure_url` to the `Music` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Music` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Music` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uploaded_at` to the `Music` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Music` table without a default value. This is not possible if the table is not empty.
  - Added the required column `version` to the `Music` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Music" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "asset_id" TEXT NOT NULL,
    "public_id" TEXT NOT NULL,
    "folder" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "resource_type" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    "uploaded_at" DATETIME NOT NULL,
    "bytes" INTEGER NOT NULL,
    "backup_bytes" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "secure_url" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "access_mode" TEXT NOT NULL,
    "access_control" TEXT,
    "etag" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Music_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Music" ("filename", "id", "userId") SELECT "filename", "id", "userId" FROM "Music";
DROP TABLE "Music";
ALTER TABLE "new_Music" RENAME TO "Music";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
