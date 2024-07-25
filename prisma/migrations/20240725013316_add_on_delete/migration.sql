-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_positionId_fkey";

-- DropForeignKey
ALTER TABLE "Leave" DROP CONSTRAINT "Leave_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "License" DROP CONSTRAINT "License_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Payroll" DROP CONSTRAINT "Payroll_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Performance" DROP CONSTRAINT "Performance_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Performance" DROP CONSTRAINT "Performance_reviewerId_fkey";

-- DropForeignKey
ALTER TABLE "Position" DROP CONSTRAINT "Position_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "Reviewer" DROP CONSTRAINT "Reviewer_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "Reviewer" DROP CONSTRAINT "Reviewer_employeeId_fkey";

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payroll" ADD CONSTRAINT "Payroll_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "Reviewer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviewer" ADD CONSTRAINT "Reviewer_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviewer" ADD CONSTRAINT "Reviewer_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leave" ADD CONSTRAINT "Leave_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "License" ADD CONSTRAINT "License_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
