-- CreateTable
CREATE TABLE `jornadas` (
    `id` VARCHAR(191) NOT NULL,
    `ativo` BOOLEAN NOT NULL,
    `dia` VARCHAR(191) NOT NULL,
    `inicio` VARCHAR(191) NOT NULL,
    `fim` VARCHAR(191) NOT NULL,
    `ordem` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `config` (
    `id` VARCHAR(191) NOT NULL,
    `checked` BOOLEAN NOT NULL,
    `selectedOption` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
