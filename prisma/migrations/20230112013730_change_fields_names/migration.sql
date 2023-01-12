/*
  Warnings:

  - You are about to drop the `TestResult` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TestResult" DROP CONSTRAINT "TestResult_codeTaskId_fkey";

-- DropForeignKey
ALTER TABLE "TestResult" DROP CONSTRAINT "TestResult_userId_fkey";

-- DropTable
DROP TABLE "TestResult";

-- CreateTable
CREATE TABLE "TaskAttempt" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "codeTaskId" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "result" TEXT,
    "passed" BOOLEAN,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "TaskAttempt_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TaskAttempt" ADD CONSTRAINT "TaskAttempt_codeTaskId_fkey" FOREIGN KEY ("codeTaskId") REFERENCES "CodeTask"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskAttempt" ADD CONSTRAINT "TaskAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
