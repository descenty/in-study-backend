/*
  Warnings:

  - You are about to drop the column `text` on the `CodeTask` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `MultipleChoice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CodeTask" DROP COLUMN "text";

-- AlterTable
ALTER TABLE "MultipleChoice" DROP COLUMN "text";
