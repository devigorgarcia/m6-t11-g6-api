/*
  Warnings:

  - You are about to drop the column `galleryImg` on the `vehicles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "vehicles" DROP COLUMN "galleryImg";

-- CreateTable
CREATE TABLE "GalleryImg" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,

    CONSTRAINT "GalleryImg_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GalleryImg_id_key" ON "GalleryImg"("id");

-- AddForeignKey
ALTER TABLE "GalleryImg" ADD CONSTRAINT "GalleryImg_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
