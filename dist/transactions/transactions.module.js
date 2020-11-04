"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const transactions_controller_1 = require("./transactions.controller");
const transactions_service_1 = require("./transactions.service");
const treasury_entity_1 = require("../shared/models/treasury.entity");
const expense_entity_1 = require("../shared/models/expense.entity");
const recipe_entity_1 = require("../shared/models/recipe.entity");
let TransactionsModule = (() => {
    let TransactionsModule = class TransactionsModule {
    };
    TransactionsModule = __decorate([
        common_1.Module({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([
                    treasury_entity_1.Treasury,
                    expense_entity_1.Expense,
                    recipe_entity_1.Recipe
                ])
            ],
            controllers: [transactions_controller_1.TransactionsController],
            providers: [transactions_service_1.TransactionsService]
        })
    ], TransactionsModule);
    return TransactionsModule;
})();
exports.TransactionsModule = TransactionsModule;
//# sourceMappingURL=transactions.module.js.map