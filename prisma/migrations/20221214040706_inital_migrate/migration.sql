/*
  Warnings:

  - You are about to drop the column `is_admin` on the `users` table. All the data in the column will be lost.
  - Added the required column `is_buyer` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "is_admin",
ADD COLUMN     "is_buyer" BOOLEAN NOT NULL;
