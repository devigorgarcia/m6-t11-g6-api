/*
  Warnings:

  - You are about to drop the `GalleryImg` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GalleryImg" DROP CONSTRAINT "GalleryImg_vehicleId_fkey";

-- DropTable
DROP TABLE "GalleryImg";

-- CreateTable
CREATE TABLE "gallery" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,

    CONSTRAINT "gallery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "gallery_id_key" ON "gallery"("id");

-- AddForeignKey
ALTER TABLE "gallery" ADD CONSTRAINT "gallery_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
