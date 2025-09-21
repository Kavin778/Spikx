/*
  Warnings:

  - You are about to drop the column `tmdbId` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `videoId` on the `Room` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."Room_tmdbId_key";

-- DropIndex
DROP INDEX "public"."Room_videoId_key";

-- AlterTable
ALTER TABLE "public"."Room" DROP COLUMN "tmdbId",
DROP COLUMN "videoId",
ADD COLUMN     "currentMovieId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Room" ADD CONSTRAINT "Room_currentMovieId_fkey" FOREIGN KEY ("currentMovieId") REFERENCES "public"."Movies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
