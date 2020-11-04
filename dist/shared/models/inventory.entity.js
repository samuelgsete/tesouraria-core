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
exports.Inventory = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const entity_base_entity_1 = require("./entity-base.entity");
const treasury_entity_1 = require("./treasury.entity");
const inventory_messages_1 = require("../validation/inventory.messages");
let Inventory = (() => {
    let Inventory = class Inventory extends entity_base_entity_1.EntityBase {
        constructor(values = {}) {
            super();
            Object.assign(this, values);
        }
    };
    __decorate([
        class_validator_1.IsNotEmpty({ message: `${inventory_messages_1.inventory.actualBalanceNotNul}` }),
        class_validator_1.IsNumber({}, { message: `${inventory_messages_1.inventory.actualBalanceValid}` }),
        typeorm_1.Column({ type: 'float', unique: false, nullable: false }),
        __metadata("design:type", Number)
    ], Inventory.prototype, "actualBalance", void 0);
    __decorate([
        class_validator_1.IsNotEmpty({ message: `${inventory_messages_1.inventory.currentBalanceNotNul}` }),
        class_validator_1.IsNumber({}, { message: `${inventory_messages_1.inventory.currentBalanceValid}` }),
        typeorm_1.Column({ type: 'float', unique: false, nullable: true }),
        __metadata("design:type", Number)
    ], Inventory.prototype, "currentBalance", void 0);
    __decorate([
        typeorm_1.Column({ type: 'float', unique: false, nullable: true }),
        __metadata("design:type", Number)
    ], Inventory.prototype, "discrepancy", void 0);
    __decorate([
        class_validator_1.IsNotEmpty({ message: `${inventory_messages_1.inventory.dateNotNul}` }),
        class_validator_1.IsDateString({ message: `${inventory_messages_1.inventory.dateValid}` }),
        typeorm_1.Column({ type: 'timestamp', nullable: false, default: new Date() }),
        __metadata("design:type", Date)
    ], Inventory.prototype, "registeredIn", void 0);
    __decorate([
        typeorm_1.ManyToOne(type => treasury_entity_1.Treasury, treasury => treasury.inventories, { onDelete: "CASCADE" }),
        __metadata("design:type", treasury_entity_1.Treasury)
    ], Inventory.prototype, "treasury", void 0);
    Inventory = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [Object])
    ], Inventory);
    return Inventory;
})();
exports.Inventory = Inventory;
//# sourceMappingURL=inventory.entity.js.map