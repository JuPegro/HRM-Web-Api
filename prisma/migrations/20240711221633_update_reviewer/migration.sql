/*
  Warnings:

  - You are about to drop the column `name` on the `Reviewer` table. All the data in the column will be lost.
  - You are about to drop the column `performanceId` on the `Reviewer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[employeeId]` on the table `Reviewer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `reviewerId` to the `Performance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeId` to the `Reviewer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reviewer" DROP CONSTRAINT "Reviewer_performanceId_fkey";

-- AlterTable
ALTER TABLE "Performance" ADD COLUMN     "reviewerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Reviewer" DROP COLUMN "name",
DROP COLUMN "performanceId",
ADD COLUMN     "employeeId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Reviewer_employeeId_key" ON "Reviewer"("employeeId");

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "Reviewer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviewer" ADD CONSTRAINT "Reviewer_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
