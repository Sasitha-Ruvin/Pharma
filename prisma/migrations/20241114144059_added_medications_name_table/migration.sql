/*
  Warnings:

  - You are about to drop the column `name` on the `medication` table. All the data in the column will be lost.
  - Added the required column `medicationNameId` to the `Medication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `medication` DROP COLUMN `name`,
    ADD COLUMN `medicationNameId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `MedicationName` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `MedicationName_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Medication_medicationNameId_idx` ON `Medication`(`medicationNameId`);

-- AddForeignKey
ALTER TABLE `Medication` ADD CONSTRAINT `Medication_medicationNameId_fkey` FOREIGN KEY (`medicationNameId`) REFERENCES `MedicationName`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
