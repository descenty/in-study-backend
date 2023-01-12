/*
  Warnings:

  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_codeTaskId_fkey";

-- DropTable
DROP TABLE "Test";

-- CreateTable
CREATE TABLE "TestResult" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "codeTaskId" INTEGER,
    "passed" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "TestResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExampleTest" (
    "id" SERIAL NOT NULL,
    "codeTaskId" INTEGER NOT NULL,
    "input" TEXT NOT NULL,
    "output" TEXT NOT NULL,

    CONSTRAINT "ExampleTest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_codeTaskId_fkey" FOREIGN KEY ("codeTaskId") REFERENCES "CodeTask"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExampleTest" ADD CONSTRAINT "ExampleTest_codeTaskId_fkey" FOREIGN KEY ("codeTaskId") REFERENCES "CodeTask"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
