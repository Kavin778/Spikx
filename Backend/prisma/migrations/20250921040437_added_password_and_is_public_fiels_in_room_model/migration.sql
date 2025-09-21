-- AlterTable
ALTER TABLE "public"."Room" ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "password" TEXT;
