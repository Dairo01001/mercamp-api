-- CreateTable
CREATE TABLE `User` (
    `id_user` VARCHAR(191) NOT NULL,
    `username_user` VARCHAR(191) NOT NULL,
    `password_user` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_username_user_key`(`username_user`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
