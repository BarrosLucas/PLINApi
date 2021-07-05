"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBasicRelations1625415800714 = void 0;
class CreateBasicRelations1625415800714 {
    constructor() {
        this.name = 'CreateBasicRelations1625415800714';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query("ALTER TABLE `moto_taxi` DROP COLUMN `liscensePlate`");
            yield queryRunner.query("ALTER TABLE `moto_taxi` DROP COLUMN `registrationNumber`");
            yield queryRunner.query("ALTER TABLE `moto_taxi` DROP COLUMN `status`");
            yield queryRunner.query("ALTER TABLE `moto_taxi` ADD `status` int NOT NULL");
            yield queryRunner.query("ALTER TABLE `moto_taxi` ADD `registrationNumber` varchar(255) NOT NULL");
            yield queryRunner.query("ALTER TABLE `moto_taxi` ADD `liscensePlate` varchar(255) NOT NULL");
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query("ALTER TABLE `moto_taxi` DROP COLUMN `liscensePlate`");
            yield queryRunner.query("ALTER TABLE `moto_taxi` DROP COLUMN `registrationNumber`");
            yield queryRunner.query("ALTER TABLE `moto_taxi` DROP COLUMN `status`");
            yield queryRunner.query("ALTER TABLE `moto_taxi` ADD `status` int NOT NULL");
            yield queryRunner.query("ALTER TABLE `moto_taxi` ADD `registrationNumber` varchar(255) NOT NULL");
            yield queryRunner.query("ALTER TABLE `moto_taxi` ADD `liscensePlate` varchar(255) NOT NULL");
        });
    }
}
exports.CreateBasicRelations1625415800714 = CreateBasicRelations1625415800714;
//# sourceMappingURL=1625415800714-CreateBasicRelations.js.map