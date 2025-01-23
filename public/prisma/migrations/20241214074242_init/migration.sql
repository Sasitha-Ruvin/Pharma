-- DropForeignKey
ALTER TABLE `clientaddress` DROP FOREIGN KEY `ClientAddress_clientId_fkey`;

-- DropForeignKey
ALTER TABLE `medication` DROP FOREIGN KEY `Medication_medicationNameId_fkey`;

-- DropForeignKey
ALTER TABLE `medication` DROP FOREIGN KEY `Medication_supplierId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_clientId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_userId_fkey`;

-- DropForeignKey
ALTER TABLE `ordermedication` DROP FOREIGN KEY `OrderMedication_medicationId_fkey`;

-- DropForeignKey
ALTER TABLE `ordermedication` DROP FOREIGN KEY `OrderMedication_orderId_fkey`;

-- AddForeignKey
ALTER TABLE `clientaddress` ADD CONSTRAINT `ClientAddress_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medication` ADD CONSTRAINT `Medication_medicationNameId_fkey` FOREIGN KEY (`medicationNameId`) REFERENCES `medicationname`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medication` ADD CONSTRAINT `Medication_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `supplier`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `Order_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ordermedication` ADD CONSTRAINT `OrderMedication_medicationId_fkey` FOREIGN KEY (`medicationId`) REFERENCES `medication`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ordermedication` ADD CONSTRAINT `OrderMedication_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
