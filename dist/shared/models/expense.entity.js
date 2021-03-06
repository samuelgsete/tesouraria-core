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
exports.Expense = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const treasury_entity_1 = require("./treasury.entity");
const entity_base_entity_1 = require("./entity-base.entity");
const expenses_messages_1 = require("../validation/expenses.messages");
const transaction_type_enum_1 = require("./enums/transaction-type.enum");
let Expense = (() => {
    let Expense = class Expense extends entity_base_entity_1.EntityBase {
        constructor(values = {}) {
            super();
            Object.assign(this, values);
        }
    };
    __decorate([
        class_validator_1.IsNotEmpty({ message: `${expenses_messages_1.expenses.descriptionNotNul}` }),
        class_validator_1.Length(3, 60, { message: `${expenses_messages_1.expenses.descriptionLength}` }),
        class_validator_1.IsString({ message: `${expenses_messages_1.expenses.descriptionValid}` }),
        typeorm_1.Column({ length: 60, unique: false, nullable: false }),
        __metadata("design:type", String)
    ], Expense.prototype, "description", void 0);
    __decorate([
        class_validator_1.Min(0, { message: `${expenses_messages_1.expenses.valueMin}` }),
        class_validator_1.Max(100000, { message: `${expenses_messages_1.expenses.valueMax}` }),
        class_validator_1.IsNotEmpty({ message: `${expenses_messages_1.expenses.valueNotNull}` }),
        class_validator_1.IsNumber({}, { message: `${expenses_messages_1.expenses.valueValid}` }),
        typeorm_1.Column({ type: 'float', unique: false, nullable: false }),
        __metadata("design:type", Number)
    ], Expense.prototype, "value", void 0);
    __decorate([
        class_validator_1.IsNotEmpty({ message: `${expenses_messages_1.expenses.dateNotNull}` }),
        class_validator_1.IsDateString({ message: `${expenses_messages_1.expenses.dateValid}` }),
        typeorm_1.Column({ type: 'timestamp', nullable: false, default: new Date() }),
        __metadata("design:type", Date)
    ], Expense.prototype, "registeredIn", void 0);
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.Length(4, 255, { message: `${expenses_messages_1.expenses.detailsLength}` }),
        class_validator_1.IsString({ message: `${expenses_messages_1.expenses.detailsValid}` }),
        typeorm_1.Column({ length: 255, unique: false, nullable: true }),
        __metadata("design:type", String)
    ], Expense.prototype, "details", void 0);
    __decorate([
        typeorm_1.Column({
            type: "enum",
            enum: ['RECEITA', 'DESPESA'],
            unique: false, nullable: false
        }),
        __metadata("design:type", String)
    ], Expense.prototype, "type", void 0);
    __decorate([
        typeorm_1.ManyToOne(type => treasury_entity_1.Treasury, treasury => treasury.expenses, { onDelete: 'CASCADE' }),
        __metadata("design:type", treasury_entity_1.Treasury)
    ], Expense.prototype, "treasury", void 0);
    Expense = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [Object])
    ], Expense);
    return Expense;
})();
exports.Expense = Expense;
//# sourceMappingURL=expense.entity.js.map