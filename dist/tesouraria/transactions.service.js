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
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const recipe_entity_1 = require("../shared/models/recipe.entity");
const expense_entity_1 = require("../shared/models/expense.entity");
let TransactionsService = (() => {
    let TransactionsService = class TransactionsService {
        constructor() { }
        updateBalance(recipes, expenses, openingBalance) {
            let balance = 0;
            recipes.forEach(recipe => {
                recipe = this.updateRecipe(recipe);
                balance += recipe.valor;
            });
            expenses.forEach(expense => {
                balance -= expense.valor;
            });
            return balance + openingBalance;
        }
        updateRecipe(recipe) {
            let value = 0;
            recipe.creditos.forEach(credit => {
                if (credit.situacao === 'QUITADO') {
                    value += credit.valor;
                    credit.situacao = 'ENCERRADO';
                }
            });
            recipe.valor += value;
            return recipe;
        }
        getTransactionsByMonth(year, month, recipes, expenses) {
            recipes = recipes.filter(recipe => {
                return recipe.registradoEm.getFullYear() == year && recipe.registradoEm.getMonth() == month;
            });
            expenses = expenses.filter(expense => {
                return expense.registradoEm.getFullYear() == year && expense.registradoEm.getMonth() == month;
            });
            return { recipes, expenses };
        }
        getIncome(recipes, expenses) {
            let incomeRecipes = 0;
            recipes.forEach(recipe => {
                incomeRecipes += recipe.valor;
            });
            let incomeExpenses = 0;
            expenses.forEach(expense => {
                incomeExpenses += expense.valor;
            });
            return { incomeRecipes, incomeExpenses };
        }
        getRecipeGeneral(recipes, expenses, openingBalance, currentBalance) {
            let { incomeRecipes, incomeExpenses } = this.getIncome(recipes, expenses);
            return {
                openingBalance,
                currentBalance,
                incomeRecipes,
                incomeExpenses
            };
        }
        getHistoryYearly(year, openingBalance, recipes, expenses) {
            const historyYearly = [];
            let cumulativeBilling = openingBalance;
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
        getIncomeYearly(year, recipes, expenses) {
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
        getReportMonthly(year, month, recipes, expenses) {
            const transactions = this.getTransactionsByMonth(year, month, recipes, expenses);
            const incomeMontly = this.getIncome(transactions.recipes, transactions.expenses);
            const incomeRecipesMonthly = incomeMontly.incomeRecipes;
            const incomeExpensesMonthly = incomeMontly.incomeExpenses;
            const balanceMonthly = incomeRecipesMonthly - incomeExpensesMonthly;
            recipes = transactions.recipes;
            expenses = transactions.expenses;
            return {
                recipes,
                expenses,
                incomeRecipesMonthly,
                incomeExpensesMonthly,
                balanceMonthly
            };
        }
    };
    TransactionsService = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], TransactionsService);
    return TransactionsService;
})();
exports.TransactionsService = TransactionsService;
//# sourceMappingURL=transactions.service.js.map