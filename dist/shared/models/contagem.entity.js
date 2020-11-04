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
exports.Contagem = void 0;
const typeorm_1 = require("typeorm");
const entidade_base_1 = require("./entidade-base");
const tesouraria_entity_1 = require("./tesouraria.entity");
const class_validator_1 = require("class-validator");
const counts_messages_1 = require("../validation/counts.messages");
let Contagem = (() => {
    let Contagem = class Contagem extends entidade_base_1.EntidadeBase {
        constructor(values = {}) {
            super();
            Object.assign(this, values);
        }
    };
    __decorate([
        class_validator_1.IsNotEmpty({ message: `${counts_messages_1.counts.actualBalanceNotNul}` }),
        class_validator_1.IsNumber({}, { message: `${counts_messages_1.counts.actualBalanceValid}` }),
        typeorm_1.Column({ name: 'saldo_real', type: 'float', unique: false, nullable: false }),
        __metadata("design:type", Number)
    ], Contagem.prototype, "saldoReal", void 0);
    __decorate([
        class_validator_1.IsNotEmpty({ message: `${counts_messages_1.counts.dateNotNul}` }),
        class_validator_1.IsDateString({ message: `${counts_messages_1.counts.dateValid}` }),
        typeorm_1.Column({ type: 'timestamp', nullable: false, default: new Date() }),
        __metadata("design:type", Date)
    ], Contagem.prototype, "registradoEm", void 0);
    __decorate([
        typeorm_1.ManyToOne(type => tesouraria_entity_1.Tesouraria, tesouraria => tesouraria.contagens, { onDelete: "CASCADE" }),
        __metadata("design:type", tesouraria_entity_1.Tesouraria)
    ], Contagem.prototype, "tesouraria", void 0);
    Contagem = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [Object])
    ], Contagem);
    return Contagem;
})();
exports.Contagem = Contagem;
//# sourceMappingURL=contagem.entity.js.map