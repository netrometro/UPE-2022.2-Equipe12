/*
  Warnings:

  - You are about to drop the column `overwritten` on the `Music` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Music" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "asset_id" TEXT NOT NULL,
    "public_id" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "version_id" TEXT NOT NULL,
    "signature" TEXT NOT NULL,
    "resource_type" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    "bytes" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "etag" TEXT NOT NULL,
    "placeholder" BOOLEAN NOT NULL,
    "url" TEXT NOT NULL,
    "secure_url" TEXT NOT NULL,
    "folder" TEXT NOT NULL,
    "original_filename" TEXT NOT NULL,
    "api_key" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Music_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Music" ("api_key", "asset_id", "bytes", "created_at", "etag", "filename", "folder", "id", "original_filename", "placeholder", "public_id", "resource_type", "secure_url", "signature", "type", "url", "userId", "version", "version_id") SELECT "api_key", "asset_id", "bytes", "created_at", "etag", "filename", "folder", "id", "original_filename", "placeholder", "public_id", "resource_type", "secure_url", "signature", "type", "url", "userId", "version", "version_id" FROM "Music";
DROP TABLE "Music";
ALTER TABLE "new_Music" RENAME TO "Music";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
