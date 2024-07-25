/*
  Warnings:

  - The values [CERO,UNO,DOS,TRES,CUATRO,CINCO] on the enum `Score` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Score_new" AS ENUM ('ZERO', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE');
ALTER TABLE "Performance" ALTER COLUMN "score" TYPE "Score_new" USING ("score"::text::"Score_new");
ALTER TYPE "Score" RENAME TO "Score_old";
ALTER TYPE "Score_new" RENAME TO "Score";
DROP TYPE "Score_old";
COMMIT;
