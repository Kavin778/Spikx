/*
  Warnings:

  - Made the column `jellyfinItemId` on table `Movies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `currentMovieId` on table `Room` required. This step will fail if there are existing NULL values in that column.
  - Made the column `refreshToken` on table `Sessions` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Room" DROP CONSTRAINT "Room_currentMovieId_fkey";

-- AlterTable
ALTER TABLE "public"."Movies" ALTER COLUMN "jellyfinItemId" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."Room" ALTER COLUMN "currentMovieId" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."Sessions" ALTER COLUMN "refreshToken" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Room" ADD CONSTRAINT "Room_currentMovieId_fkey" FOREIGN KEY ("currentMovieId") REFERENCES "public"."Movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
