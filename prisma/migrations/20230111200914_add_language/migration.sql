-- CreateEnum
CREATE TYPE "Language" AS ENUM ('PYTHON', 'JAVASCRIPT');

-- AlterTable
ALTER TABLE "CodeTask" ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'PYTHON';
