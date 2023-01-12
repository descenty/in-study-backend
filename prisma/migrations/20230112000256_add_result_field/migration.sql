/*
  Warnings:

  - Added the required column `result` to the `TestResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TestResult" ADD COLUMN     "result" TEXT NOT NULL;
