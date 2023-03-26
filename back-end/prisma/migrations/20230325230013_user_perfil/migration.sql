/*
  Warnings:

  - A unique constraint covering the columns `[followerId]` on the table `Follows` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[followingId]` on the table `Follows` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN "description" TEXT;
ALTER TABLE "users" ADD COLUMN "favorite_artist" TEXT;
ALTER TABLE "users" ADD COLUMN "favorite_genre" TEXT;
ALTER TABLE "users" ADD COLUMN "favorite_music" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Follows_followerId_key" ON "Follows"("followerId");

-- CreateIndex
CREATE UNIQUE INDEX "Follows_followingId_key" ON "Follows"("followingId");
