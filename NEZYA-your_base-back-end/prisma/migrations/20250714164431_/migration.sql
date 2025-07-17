/*
  Warnings:

  - You are about to drop the column `topicId` on the `checklist_items` table. All the data in the column will be lost.
  - The primary key for the `note_tags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `noteId` on the `note_tags` table. All the data in the column will be lost.
  - You are about to drop the column `tagId` on the `note_tags` table. All the data in the column will be lost.
  - The primary key for the `notes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `topicId` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `notes` table. All the data in the column will be lost.
  - The primary key for the `tags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `tags` table. All the data in the column will be lost.
  - The primary key for the `topics` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `topics` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `topics` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `topics` table. All the data in the column will be lost.
  - You are about to drop the column `darkMode` on the `user_settings` table. All the data in the column will be lost.
  - You are about to drop the column `showDeadTopics` on the `user_settings` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user_settings` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `user_settings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `topic_id` to the `checklist_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `note_id` to the `note_tags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag_id` to the `note_tags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `notes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `tags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `topics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `topics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `user_settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "checklist_items" DROP CONSTRAINT "checklist_items_topicId_fkey";

-- DropForeignKey
ALTER TABLE "note_tags" DROP CONSTRAINT "note_tags_noteId_fkey";

-- DropForeignKey
ALTER TABLE "note_tags" DROP CONSTRAINT "note_tags_tagId_fkey";

-- DropForeignKey
ALTER TABLE "notes" DROP CONSTRAINT "notes_topicId_fkey";

-- DropForeignKey
ALTER TABLE "notes" DROP CONSTRAINT "notes_userId_fkey";

-- DropForeignKey
ALTER TABLE "tags" DROP CONSTRAINT "tags_userId_fkey";

-- DropForeignKey
ALTER TABLE "topics" DROP CONSTRAINT "topics_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_settings" DROP CONSTRAINT "user_settings_userId_fkey";

-- DropIndex
DROP INDEX "user_settings_userId_key";

-- AlterTable
ALTER TABLE "checklist_items" DROP COLUMN "topicId",
ADD COLUMN     "topic_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "note_tags" DROP CONSTRAINT "note_tags_pkey",
DROP COLUMN "noteId",
DROP COLUMN "tagId",
ADD COLUMN     "note_id" TEXT NOT NULL,
ADD COLUMN     "tag_id" TEXT NOT NULL,
ADD CONSTRAINT "note_tags_pkey" PRIMARY KEY ("note_id", "tag_id");

-- AlterTable
ALTER TABLE "notes" DROP CONSTRAINT "notes_pkey",
DROP COLUMN "topicId",
DROP COLUMN "userId",
ADD COLUMN     "topic_id" TEXT,
ADD COLUMN     "user_id" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "notes_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "notes_id_seq";

-- AlterTable
ALTER TABLE "tags" DROP CONSTRAINT "tags_pkey",
DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "tags_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "tags_id_seq";

-- AlterTable
ALTER TABLE "topics" DROP CONSTRAINT "topics_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "topics_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "topics_id_seq";

-- AlterTable
ALTER TABLE "user_settings" DROP COLUMN "darkMode",
DROP COLUMN "showDeadTopics",
DROP COLUMN "userId",
ADD COLUMN     "dark_mode" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "show_dead_topics" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "user_settings_user_id_key" ON "user_settings"("user_id");

-- AddForeignKey
ALTER TABLE "topics" ADD CONSTRAINT "topics_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checklist_items" ADD CONSTRAINT "checklist_items_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "note_tags" ADD CONSTRAINT "note_tags_note_id_fkey" FOREIGN KEY ("note_id") REFERENCES "notes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "note_tags" ADD CONSTRAINT "note_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
