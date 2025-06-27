-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(256) NOT NULL,
    `username` VARCHAR(16) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(256) NOT NULL,
    `cpf` VARCHAR(11) NOT NULL,
    `registerDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `user_username_key`(`username`),
    UNIQUE INDEX `user_email_key`(`email`),
    UNIQUE INDEX `user_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(256) NOT NULL,
    `value` DECIMAL(65, 30) NOT NULL,
    `description` TINYTEXT NOT NULL,
    `indicativeRating` ENUM('rL', 'r10', 'r12', 'r14', 'r16', 'r18') NOT NULL DEFAULT 'rL',
    `rating` DOUBLE NOT NULL,
    `releaseDate` DATETIME(3) NOT NULL,
    `file` VARCHAR(191) NOT NULL,
    `fileSize` DOUBLE NOT NULL,
    `discount` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `photos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `photo` VARCHAR(191) NOT NULL,
    `type` ENUM('banner', 'thumbnail', 'photos', 'descriptionPhoto') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productLanguage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `language` VARCHAR(10) NOT NULL,
    `audio` BOOLEAN NOT NULL,
    `text` BOOLEAN NOT NULL,
    `productId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `goodies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(191) NOT NULL,
    `productId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gameFeature` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `productId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `timeToBeat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `value` DOUBLE NOT NULL,
    `productId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productRequirements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `windowsId` INTEGER NOT NULL,
    `macId` INTEGER NOT NULL,
    `linuxId` INTEGER NOT NULL,

    UNIQUE INDEX `productRequirements_productId_key`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `requirement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `OS` VARCHAR(32) NOT NULL,
    `processor` VARCHAR(32) NOT NULL,
    `memory` INTEGER NOT NULL,
    `graphics` VARCHAR(32) NOT NULL,
    `directX` INTEGER NOT NULL,
    `storage` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `productName` VARCHAR(256) NOT NULL,
    `productValue` DECIMAL(65, 30) NOT NULL,
    `discount` INTEGER NULL,
    `finalPrice` DECIMAL(65, 30) NOT NULL,
    `paymentType` ENUM('credit_card', 'debit_card', 'pix') NOT NULL,
    `transactionDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `photos` ADD CONSTRAINT `photos_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productLanguage` ADD CONSTRAINT `productLanguage_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `goodies` ADD CONSTRAINT `goodies_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `gameFeature` ADD CONSTRAINT `gameFeature_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `timeToBeat` ADD CONSTRAINT `timeToBeat_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productRequirements` ADD CONSTRAINT `productRequirements_windowsId_fkey` FOREIGN KEY (`windowsId`) REFERENCES `requirement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productRequirements` ADD CONSTRAINT `productRequirements_macId_fkey` FOREIGN KEY (`macId`) REFERENCES `requirement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productRequirements` ADD CONSTRAINT `productRequirements_linuxId_fkey` FOREIGN KEY (`linuxId`) REFERENCES `requirement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productRequirements` ADD CONSTRAINT `productRequirements_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
