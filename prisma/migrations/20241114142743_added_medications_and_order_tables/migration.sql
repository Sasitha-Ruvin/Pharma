/*
  Warnings:

  - You are about to drop the column `employeeId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `estimatedDeliveryDate` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `order` table. All the data in the column will be lost.
  - You are about to drop the `orderitem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `estDeliveryDate` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderItems` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_employeeId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `OrderItem_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `OrderItem_productId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_supplierId_fkey`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `employeeId`,
    DROP COLUMN `estimatedDeliveryDate`,
    DROP COLUMN `status`,
    ADD COLUMN `estDeliveryDate` DATETIME(3) NOT NULL,
    ADD COLUMN `notes` VARCHAR(191) NULL,
    ADD COLUMN `orderItems` VARCHAR(191) NOT NULL,
    ADD COLUMN `orderStatus` VARCHAR(191) NOT NULL DEFAULT 'pending',
    ADD COLUMN `userId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `orderitem`;

-- DropTable
DROP TABLE `product`;

-- CreateTable
CREATE TABLE `Medication` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `scientificName` VARCHAR(191) NOT NULL,
    `ingredients` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `warnings` VARCHAR(191) NOT NULL,
    `sideEffects` VARCHAR(191) NOT NULL,
    `batchCode` VARCHAR(191) NOT NULL,
    `arrivalDate` DATETIME(3) NOT NULL,
    `expireDate` DATETIME(3) NOT NULL,
    `supplierId` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL,
    `pricePerUnit` DOUBLE NOT NULL,
    `bestBeforeDate` DATETIME(3) NOT NULL,
    `shelfAddress` VARCHAR(191) NOT NULL,
    `handlingInstructions` VARCHAR(191) NOT NULL,

    INDEX `Medication_supplierId_idx`(`supplierId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderMedication` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderId` INTEGER NOT NULL,
    `medicationId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,

    INDEX `OrderMedication_orderId_idx`(`orderId`),
    INDEX `OrderMedication_medicationId_idx`(`medicationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Order_userId_idx` ON `Order`(`userId`);

-- AddForeignKey
ALTER TABLE `Medication` ADD CONSTRAINT `Medication_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `Supplier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderMedication` ADD CONSTRAINT `OrderMedication_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderMedication` ADD CONSTRAINT `OrderMedication_medicationId_fkey` FOREIGN KEY (`medicationId`) REFERENCES `Medication`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
