/*
  Warnings:

  - Added the required column `code` to the `TestResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TestResult" ADD COLUMN     "code" TEXT NOT NULL;
