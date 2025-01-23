-- DropForeignKey
ALTER TABLE `ordermedication` DROP FOREIGN KEY `ordermedication_medicationId_fkey`;

-- AddForeignKey
ALTER TABLE `ordermedication` ADD CONSTRAINT `ordermedication_medicationId_fkey` FOREIGN KEY (`medicationId`) REFERENCES `medication`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
