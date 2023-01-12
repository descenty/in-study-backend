/*
  Warnings:

  - You are about to drop the column `code` on the `Test` table. All the data in the column will be lost.
  - Added the required column `input` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `output` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CodeTask" ADD COLUMN     "functionName" TEXT,
ADD COLUMN     "testCode" TEXT;

-- AlterTable
ALTER TABLE "Test" DROP COLUMN "code",
ADD COLUMN     "input" TEXT NOT NULL,
ADD COLUMN     "output" TEXT NOT NULL;
