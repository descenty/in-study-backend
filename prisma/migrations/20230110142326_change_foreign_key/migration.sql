/*
  Warnings:

  - You are about to drop the column `codeTaskId` on the `Step` table. All the data in the column will be lost.
  - You are about to drop the column `multipleChoiceId` on the `Step` table. All the data in the column will be lost.
  - Added the required column `stepId` to the `CodeTask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stepId` to the `MultipleChoice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Step" DROP CONSTRAINT "Step_codeTaskId_fkey";

-- DropForeignKey
ALTER TABLE "Step" DROP CONSTRAINT "Step_multipleChoiceId_fkey";

-- AlterTable
ALTER TABLE "CodeTask" ADD COLUMN     "stepId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "MultipleChoice" ADD COLUMN     "stepId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Step" DROP COLUMN "codeTaskId",
DROP COLUMN "multipleChoiceId";

-- AddForeignKey
ALTER TABLE "MultipleChoice" ADD CONSTRAINT "MultipleChoice_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodeTask" ADD CONSTRAINT "CodeTask_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
