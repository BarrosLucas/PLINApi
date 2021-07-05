"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunStatus = exports.RunType = exports.Run = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Client_1 = require("./Client");
const MotoTaxi_1 = require("./MotoTaxi");
let Run = class Run extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Run.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Run.prototype, "acceptedAt", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Float),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Run.prototype, "price", void 0);
__decorate([
    type_graphql_1.Field(() => RunType),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Run.prototype, "runType", void 0);
__decorate([
    type_graphql_1.Field(() => RunStatus),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Run.prototype, "runStatus", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Client_1.Client, client => client.runs, { onDelete: 'SET NULL', onUpdate: 'CASCADE', cascade: true }),
    __metadata("design:type", Client_1.Client)
], Run.prototype, "client", void 0);
__decorate([
    typeorm_1.ManyToOne(() => MotoTaxi_1.MotoTaxi, motoTaxi => motoTaxi.runs, { onDelete: 'SET NULL', onUpdate: 'CASCADE', cascade: false }),
    __metadata("design:type", MotoTaxi_1.MotoTaxi)
], Run.prototype, "motoTaxi", void 0);
Run = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Run);
exports.Run = Run;
var RunType;
(function (RunType) {
    RunType[RunType["DELIVERY"] = 0] = "DELIVERY";
    RunType[RunType["TAXI"] = 1] = "TAXI";
})(RunType = exports.RunType || (exports.RunType = {}));
var RunStatus;
(function (RunStatus) {
    RunStatus[RunStatus["OPEN"] = 0] = "OPEN";
    RunStatus[RunStatus["CLOSED"] = 1] = "CLOSED";
})(RunStatus = exports.RunStatus || (exports.RunStatus = {}));
type_graphql_1.registerEnumType(RunType, {
    name: 'Run Type',
    description: 'If the run is a deliery or a passenger'
});
type_graphql_1.registerEnumType(RunStatus, {
    name: 'Run Status',
    description: 'If a run has ended or not'
});
//# sourceMappingURL=Run.js.map