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
exports.Treasury = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const expense_entity_1 = require("./expense.entity");
const recipe_entity_1 = require("./recipe.entity");
const entity_base_entity_1 = require("./entity-base.entity");
const treasuries_messages_1 = require("../validation/treasuries.messages");
let Treasury = (() => {
    let Treasury = class Treasury extends entity_base_entity_1.EntityBase {
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
    ], Treasury.prototype, "name", void 0);
    __decorate([
        class_validator_1.Min(0, { message: `${treasuries_messages_1.treasuries.initialAmountMin}` }),
        class_validator_1.Max(100000, { message: `${treasuries_messages_1.treasuries.initialAmountMax}` }),
        class_validator_1.IsNotEmpty({ message: `${treasuries_messages_1.treasuries.initialAmountNotNull}` }),
        class_validator_1.IsNumber({}, { message: `${treasuries_messages_1.treasuries.initialAmountValid}` }),
        typeorm_1.Column({ type: 'float', unique: false, nullable: false }),
        __metadata("design:type", Number)
    ], Treasury.prototype, "initialAmount", void 0);
    __decorate([
        typeorm_1.Column({ type: 'float', unique: false, nullable: true, default: 0 }),
        __metadata("design:type", Number)
    ], Treasury.prototype, "currentBalance", void 0);
    __decorate([
        typeorm_1.Column({ type: 'float', unique: false, nullable: true, default: 0 }),
        __metadata("design:type", Number)
    ], Treasury.prototype, "incomeRecipes", void 0);
    __decorate([
        typeorm_1.Column({ type: 'float', unique: false, nullable: true, default: 0 }),
        __metadata("design:type", Number)
    ], Treasury.prototype, "incomeExpenses", void 0);
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.Length(4, 255, { message: `${treasuries_messages_1.treasuries.detailsLength}` }),
        class_validator_1.IsString({ message: `${treasuries_messages_1.treasuries.detailsValid}` }),
        typeorm_1.Column({ length: 255, unique: false, nullable: true }),
        __metadata("design:type", String)
    ], Treasury.prototype, "details", void 0);
    __decorate([
        typeorm_1.Column({ unique: false, nullable: false }),
        __metadata("design:type", Number)
    ], Treasury.prototype, "userId", void 0);
    __decorate([
        class_validator_1.IsOptional(),
        class_transformer_1.Type(() => expense_entity_1.Expense),
        class_validator_1.ValidateNested(),
        typeorm_1.OneToMany(type => expense_entity_1.Expense, expense => expense.treasury, { cascade: true }),
        __metadata("design:type", Array)
    ], Treasury.prototype, "expenses", void 0);
    __decorate([
        class_validator_1.IsOptional(),
        class_transformer_1.Type(() => recipe_entity_1.Recipe),
        class_validator_1.ValidateNested(),
        typeorm_1.OneToMany(type => recipe_entity_1.Recipe, recipe => recipe.treasury, { cascade: true }),
        __metadata("design:type", Array)
    ], Treasury.prototype, "recipes", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Treasury.prototype, "updated", void 0);
    Treasury = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [Object])
    ], Treasury);
    return Treasury;
})();
exports.Treasury = Treasury;
//# sourceMappingURL=treasury.entity.js.map