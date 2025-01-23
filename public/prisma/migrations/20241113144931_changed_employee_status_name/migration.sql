/*
  Warnings:

  - You are about to drop the column `employeeStatus` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `employeeStatus`,
    ADD COLUMN `status` VARCHAR(191) NULL;
