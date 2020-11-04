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
exports.Tesouraria = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const saida_entity_1 = require("./saida.entity");
const entrada_entity_1 = require("./entrada.entity");
const entidade_base_1 = require("./entidade-base");
const contagem_entity_1 = require("./contagem.entity");
const treasuries_messages_1 = require("../validation/treasuries.messages");
let Tesouraria = (() => {
    let Tesouraria = class Tesouraria extends entidade_base_1.EntidadeBase {
        constructor(values = {}) {
            super();
            Object.assign(this, values);
        }
    };
    __decorate([
        class_validator_1.IsNotEmpty({ message: `${treasuries_messages_1.treasuries.nameNotNull}` }),
        class_validator_1.IsString({ message: `${treasuries_messages_1.treasuries.nameValid}` }),
        class_validator_1.Length(2, 30, { message: `${treasuries_messages_1.treasuries.nameLength}` }),
        typeorm_1.Column({ length: 30, unique: false, nullable: false }),
        __metadata("design:type", String)
    ], Tesouraria.prototype, "nome", void 0);
    __decorate([
        class_validator_1.IsNotEmpty({ message: `${treasuries_messages_1.treasuries.openingBalanceNotNull}` }),
        class_validator_1.IsNumber({}, { message: `${treasuries_messages_1.treasuries.openingBalanceValid}` }),
        typeorm_1.Column({ type: 'float', unique: false, nullable: false }),
        __metadata("design:type", Number)
    ], Tesouraria.prototype, "saldoInicial", void 0);
    __decorate([
        class_validator_1.IsNotEmpty({ message: `${treasuries_messages_1.treasuries.balanceCurrentNotNull}` }),
        class_validator_1.IsNumber({}, { message: `${treasuries_messages_1.treasuries.balanceCurrentValid}` }),
        typeorm_1.Column({ type: 'float', unique: false, nullable: false }),
        __metadata("design:type", Number)
    ], Tesouraria.prototype, "saldoAtual", void 0);
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.Length(3, 255, { message: `${treasuries_messages_1.treasuries.detailsLength}` }),
        class_validator_1.IsString({ message: `${treasuries_messages_1.treasuries.detailsValid}` }),
        typeorm_1.Column({ length: 255, unique: false, nullable: true }),
        __metadata("design:type", String)
    ], Tesouraria.prototype, "detalhes", void 0);
    __decorate([
        class_validator_1.IsNotEmpty({ message: `${treasuries_messages_1.treasuries.userIdNotNull}` }),
        class_validator_1.IsInt({ message: `${treasuries_messages_1.treasuries.userIdValid}` }),
        typeorm_1.Column({ unique: false, nullable: false }),
        __metadata("design:type", Number)
    ], Tesouraria.prototype, "userId", void 0);
    __decorate([
        class_validator_1.IsOptional(),
        class_transformer_1.Type(() => saida_entity_1.Saida),
        class_validator_1.ValidateNested(),
        typeorm_1.OneToMany(type => saida_entity_1.Saida, saida => saida.tesouraria, { cascade: true }),
        __metadata("design:type", Array)
    ], Tesouraria.prototype, "saidas", void 0);
    __decorate([
        class_validator_1.IsOptional(),
        class_transformer_1.Type(() => entrada_entity_1.Entrada),
        class_validator_1.ValidateNested(),
        typeorm_1.OneToMany(type => entrada_entity_1.Entrada, entrada => entrada.tesouraria, { cascade: true }),
        __metadata("design:type", Array)
    ], Tesouraria.prototype, "entradas", void 0);
    __decorate([
        class_validator_1.IsOptional(),
        class_transformer_1.Type(() => contagem_entity_1.Contagem),
        class_validator_1.ValidateNested(),
        typeorm_1.OneToMany(type => contagem_entity_1.Contagem, contagem => contagem.tesouraria, { cascade: true }),
        __metadata("design:type", Array)
    ], Tesouraria.prototype, "contagens", void 0);
    Tesouraria = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [Object])
    ], Tesouraria);
    return Tesouraria;
})();
exports.Tesouraria = Tesouraria;
//# sourceMappingURL=tesouraria.entity.js.map