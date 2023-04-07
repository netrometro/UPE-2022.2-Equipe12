/*
  Warnings:

  - You are about to drop the column `access_control` on the `Music` table. All the data in the column will be lost.
  - You are about to drop the column `access_mode` on the `Music` table. All the data in the column will be lost.
  - You are about to drop the column `backup_bytes` on the `Music` table. All the data in the column will be lost.
  - You are about to drop the column `format` on the `Music` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Music` table. All the data in the column will be lost.
  - You are about to drop the column `uploaded_at` on the `Music` table. All the data in the column will be lost.
  - Added the required column `api_key` to the `Music` table without a default value. This is not possible if the table is not empty.
  - Added the required column `original_filename` to the `Music` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overwritten` to the `Music` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placeholder` to the `Music` table without a default value. This is not possible if the table is not empty.
  - Added the required column `signature` to the `Music` table without a default value. This is not possible if the table is not empty.
  - Added the required column `version_id` to the `Music` table without a default value. This is not possible if the table is not empty.

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
    "tags" TEXT,
    "bytes" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "etag" TEXT NOT NULL,
    "placeholder" BOOLEAN NOT NULL,
    "url" TEXT NOT NULL,
    "secure_url" TEXT NOT NULL,
    "folder" TEXT NOT NULL,
    "overwritten" BOOLEAN NOT NULL,
    "original_filename" TEXT NOT NULL,
    "api_key" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Music_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Music" ("asset_id", "bytes", "created_at", "etag", "filename", "folder", "id", "public_id", "resource_type", "secure_url", "type", "url", "userId", "version") SELECT "asset_id", "bytes", "created_at", "etag", "filename", "folder", "id", "public_id", "resource_type", "secure_url", "type", "url", "userId", "version" FROM "Music";
DROP TABLE "Music";
ALTER TABLE "new_Music" RENAME TO "Music";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
