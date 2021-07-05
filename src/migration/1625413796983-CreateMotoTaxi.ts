import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateMotoTaxi1625413796983 implements MigrationInterface {
    name = 'CreateMotoTaxi1625413796983'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `moto_taxi` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `cpf` varchar(255) NOT NULL, `hashed_password` varchar(255) NOT NULL, `photo` varchar(255) NULL, `phone` varchar(255) NOT NULL, `score` int NOT NULL DEFAULT '3', PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `moto_taxi` ADD `status` int NOT NULL");
        await queryRunner.query("ALTER TABLE `moto_taxi` ADD `registrationNumber` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `moto_taxi` ADD `liscensePlate` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `moto_taxi` DROP COLUMN `liscensePlate`");
        await queryRunner.query("ALTER TABLE `moto_taxi` DROP COLUMN `registrationNumber`");
        await queryRunner.query("ALTER TABLE `moto_taxi` DROP COLUMN `status`");
        await queryRunner.query("DROP TABLE `moto_taxi`");
    }

}
