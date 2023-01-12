/*
  Warnings:

  - Made the column `codeTaskId` on table `TestResult` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "TestResult" DROP CONSTRAINT "TestResult_codeTaskId_fkey";

-- AlterTable
ALTER TABLE "TestResult" ALTER COLUMN "codeTaskId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_codeTaskId_fkey" FOREIGN KEY ("codeTaskId") REFERENCES "CodeTask"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
