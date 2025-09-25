-- DropForeignKey
ALTER TABLE "public"."Room" DROP CONSTRAINT "Room_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Room" DROP CONSTRAINT "Room_currentMovieId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Room" ADD CONSTRAINT "Room_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Room" ADD CONSTRAINT "Room_currentMovieId_fkey" FOREIGN KEY ("currentMovieId") REFERENCES "public"."Movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
