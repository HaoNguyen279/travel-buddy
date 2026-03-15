/*
  Warnings:

  - You are about to drop the `places` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "places";

-- CreateTable
CREATE TABLE "Place" (
    "place_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "image_url" TEXT,
    "average_rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("place_id")
);
