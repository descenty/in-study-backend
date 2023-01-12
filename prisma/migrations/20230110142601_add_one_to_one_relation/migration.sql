/*
  Warnings:

  - A unique constraint covering the columns `[stepId]` on the table `CodeTask` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stepId]` on the table `MultipleChoice` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CodeTask_stepId_key" ON "CodeTask"("stepId");

-- CreateIndex
CREATE UNIQUE INDEX "MultipleChoice_stepId_key" ON "MultipleChoice"("stepId");
