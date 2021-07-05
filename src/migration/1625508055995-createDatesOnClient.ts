import {MigrationInterface, QueryRunner} from "typeorm";

export class createDatesOnClient1625508055995 implements MigrationInterface {
    name = 'createDatesOnClient1625508055995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `client` ADD `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `client` ADD `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `client` DROP COLUMN `updatedAt`");
        await queryRunner.query("ALTER TABLE `client` DROP COLUMN `createdAt`");
    }

}
