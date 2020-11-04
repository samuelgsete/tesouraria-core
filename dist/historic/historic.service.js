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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoricService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const treasury_entity_1 = require("../shared/models/treasury.entity");
const recipe_entity_1 = require("../shared/models/recipe.entity");
const expense_entity_1 = require("../shared/models/expense.entity");
const Id_invalid_exception_1 = require("../shared/exceptions/models/Id-invalid.exception");
const treasury_not_foud_exception_1 = require("../shared/exceptions/models/treasury-not-foud.exception");
const permission_denied_excepton_1 = require("../shared/exceptions/models/permission-denied.excepton");
const inventory_entity_1 = require("../shared/models/inventory.entity");
const inventory_messages_1 = require("../shared/validation/inventory.messages");
let HistoricService = (() => {
    let HistoricService = class HistoricService {
        constructor(repositoryTreasury) {
            this.repositoryTreasury = repositoryTreasury;
        }
        async getHistoric(treasuryId, userId, year) {
            if (treasuryId <= 0) {
                throw new Id_invalid_exception_1.IdInvalidException("O id informado é invalído");
            }
            const treasury = await this.repositoryTreasury.findOne(treasuryId, { relations: ["expenses", "recipes", "inventories"] });
            if (treasury == null) {
                throw new treasury_not_foud_exception_1.TreasuryNotFoundException("Tesouraria inexistente");
            }
            if (treasury.userId != userId) {
                throw new permission_denied_excepton_1.PermissionDeniedException('Permissão negada');
            }
            const incomeYearly = this.getIncomeTransactions(year, treasury.recipes, treasury.expenses);
            const historyYearly = this.getHistorcBilling(year, treasury.initialAmount, treasury.recipes, treasury.expenses);
            const historicInventoriesYearly = this.getHistoricInventory(year, treasury.inventories);
            return { incomeYearly, historyYearly, historicInventoriesYearly };
        }
        getHistorcBilling(year, initialAmount, recipes, expenses) {
            const historyYearly = [];
            let cumulativeBilling = initialAmount;
            let monthlyBiiling = 0;
            for (let month = 0; month < 12; month++) {
                let transactions = this.getTransactionsByMonth(year, month, recipes, expenses);
                let { incomeRecipes, incomeExpenses } = this.getIncome(transactions.recipes, transactions.expenses);
                cumulativeBilling += (incomeRecipes - incomeExpenses);
                monthlyBiiling = incomeRecipes - incomeExpenses;
                cumulativeBilling = parseInt(cumulativeBilling.toFixed(1));
                monthlyBiiling = parseInt(monthlyBiiling.toFixed(1));
                historyYearly.push({ cumulativeBilling, monthlyBiiling });
            }
            return historyYearly;
        }
        getIncomeTransactions(year, recipes, expenses) {
            const incomeMontly = [];
            for (let month = 0; month < 12; month++) {
                let transactions = this.getTransactionsByMonth(year, month, recipes, expenses);
                let { incomeRecipes, incomeExpenses } = this.getIncome(transactions.recipes, transactions.expenses);
                incomeMontly.push({
                    incomeRecipes,
                    incomeExpenses
                });
            }
            return incomeMontly;
        }
        getHistoricInventory(year, inventories) {
            let historicInventory = [];
            for (let month = 0; month < 12; month++) {
                const inventory = this.getInventoryByMonth(year, month, inventories);
                if (inventory) {
                    historicInventory.push({
                        currentBalance: inventory.currentBalance,
                        actualBalance: inventory.actualBalance,
                        discrepancy: inventory.discrepancy
                    });
                }
                else {
                    historicInventory.push({
                        currentBalance: 0,
                        actualBalance: 0,
                        discrepancy: 0
                    });
                }
            }
            return historicInventory;
        }
        getInventoryByMonth(year, month, inventories) {
            const result = inventories.filter(inventory => {
                return inventory.registeredIn.getFullYear() == year && inventory.registeredIn.getMonth() == month;
            })[0];
            return result;
        }
        getTransactionsByMonth(year, month, recipes, expenses) {
            recipes = recipes.filter(recipe => {
                return recipe.registeredIn.getFullYear() == year && recipe.registeredIn.getMonth() == month;
            });
            expenses = expenses.filter(expense => {
                return expense.registeredIn.getFullYear() == year && expense.registeredIn.getMonth() == month;
            });
            return { recipes, expenses };
        }
        getIncome(recipes, expenses) {
            let incomeRecipes = 0;
            recipes.forEach(recipe => {
                incomeRecipes += recipe.value;
            });
            let incomeExpenses = 0;
            expenses.forEach(expense => {
                incomeExpenses += expense.value;
            });
            return { incomeRecipes, incomeExpenses };
        }
    };
    HistoricService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(treasury_entity_1.Treasury)),
        __metadata("design:paramtypes", [typeorm_2.Repository])
    ], HistoricService);
    return HistoricService;
})();
exports.HistoricService = HistoricService;
//# sourceMappingURL=historic.service.js.map