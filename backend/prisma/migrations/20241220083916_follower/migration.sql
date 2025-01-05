/*
  Warnings:

  - Added the required column `fullname` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "fullname" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "follow" (
    "id" TEXT NOT NULL,
    "followerid" TEXT NOT NULL,
    "followingid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "follow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "follow_followerid_followingid_key" ON "follow"("followerid", "followingid");

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_followerid_fkey" FOREIGN KEY ("followerid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_followingid_fkey" FOREIGN KEY ("followingid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
