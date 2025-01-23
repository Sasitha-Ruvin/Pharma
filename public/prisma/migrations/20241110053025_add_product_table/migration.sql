-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `expiration` DATETIME(3) NOT NULL,
    `supplierId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `storetemp` VARCHAR(191) NOT NULL,
    `shelf` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `directions` VARCHAR(191) NOT NULL,
    `sideEffect` VARCHAR(191) NOT NULL,
    `productImg` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `Supplier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
