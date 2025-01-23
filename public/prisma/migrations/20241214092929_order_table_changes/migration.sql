-- DropForeignKey
ALTER TABLE `medication` DROP FOREIGN KEY `Medication_medicationNameId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_clientId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_userId_fkey`;

-- DropForeignKey
ALTER TABLE `ordermedication` DROP FOREIGN KEY `OrderMedication_medicationId_fkey`;

-- DropForeignKey
ALTER TABLE `ordermedication` DROP FOREIGN KEY `OrderMedication_orderId_fkey`;

-- AddForeignKey
ALTER TABLE `medication` ADD CONSTRAINT `medication_medicationNameId_fkey` FOREIGN KEY (`medicationNameId`) REFERENCES `medicationname`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ordermedication` ADD CONSTRAINT `ordermedication_medicationId_fkey` FOREIGN KEY (`medicationId`) REFERENCES `medication`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ordermedication` ADD CONSTRAINT `ordermedication_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
