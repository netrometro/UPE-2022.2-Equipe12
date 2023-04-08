/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Music` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Music_id_key" ON "Music"("id");
