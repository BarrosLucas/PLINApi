import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateBasicRelations1625415800714 implements MigrationInterface {
    name = 'CreateBasicRelations1625415800714'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `moto_taxi` DROP COLUMN `liscensePlate`");
        await queryRunner.query("ALTER TABLE `moto_taxi` DROP COLUMN `registrationNumber`");
        await queryRunner.query("ALTER TABLE `moto_taxi` DROP COLUMN `status`");
        await queryRunner.query("ALTER TABLE `moto_taxi` ADD `status` int NOT NULL");
        await queryRunner.query("ALTER TABLE `moto_taxi` ADD `registrationNumber` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `moto_taxi` ADD `liscensePlate` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `moto_taxi` DROP COLUMN `liscensePlate`");
        await queryRunner.query("ALTER TABLE `moto_taxi` DROP COLUMN `registrationNumber`");
        await queryRunner.query("ALTER TABLE `moto_taxi` DROP COLUMN `status`");
        await queryRunner.query("ALTER TABLE `moto_taxi` ADD `status` int NOT NULL");
        await queryRunner.query("ALTER TABLE `moto_taxi` ADD `registrationNumber` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `moto_taxi` ADD `liscensePlate` varchar(255) NOT NULL");
    }

}
