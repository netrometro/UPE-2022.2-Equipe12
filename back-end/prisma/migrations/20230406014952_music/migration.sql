/*
  Warnings:

  - You are about to drop the column `format` on the `Music` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Music` table. All the data in the column will be lost.
  - Added the required column `assetId` to the `Music` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filename` to the `Music` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Music` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Music" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "filename" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Music_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Music" ("id", "publicId", "userId") SELECT "id", "publicId", "userId" FROM "Music";
DROP TABLE "Music";
ALTER TABLE "new_Music" RENAME TO "Music";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
