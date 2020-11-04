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
const status_type_enum_1 = require("../shared/models/enums/status-type.enum");
const transaction_type_enum_1 = require("../shared/models/enums/transaction-type.enum");
const transactions_filter_entity_1 = require("../shared/models/transactions-filter.entity");
let TransactionsService = (() => {
    let TransactionsService = class TransactionsService {
        constructor() { }
        updateBalance(recipes, expenses, initialAmount) {
            let balance = 0;
            recipes.forEach(recipe => {
                recipe = this.updateRecipe(recipe);
                balance += recipe.value;
            });
            expenses.forEach(expense => {
                balance -= expense.value;
            });
            return balance + initialAmount;
        }
        updateRecipe(recipe) {
            let value = 0;
            recipe.credits.forEach(credit => {
                if (credit.status === status_type_enum_1.StatusType.SETTLED) {
                    value += credit.value;
                    credit.status = status_type_enum_1.StatusType.FINISHED;
                }
            });
            recipe.value += value;
            return recipe;
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
        getHistoryYearly(year, initialAmount, recipes, expenses) {
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
        filterTransactions(transactionsFilter, recipes, expenses) {
            let filteredRecipes = [];
            let filteredExpenses = [];
            if (transactionsFilter.type == transaction_type_enum_1.TransactionType.RECIPE) {
                filteredRecipes = recipes.filter(recipe => {
                    return recipe.registeredIn.getFullYear() == transactionsFilter.year && recipe.registeredIn.getMonth() == transactionsFilter.month;
                });
                if (transactionsFilter.month == 12) {
                    filteredRecipes = recipes.filter(recipe => {
                        return recipe.registeredIn.getFullYear() == transactionsFilter.year;
                    });
                }
            }
            else if (transactionsFilter.type == transaction_type_enum_1.TransactionType.EXPENSE) {
                filteredExpenses = expenses.filter(expense => {
                    return expense.registeredIn.getFullYear() == transactionsFilter.year && expense.registeredIn.getMonth() == transactionsFilter.month;
                });
                if (transactionsFilter.month == 12) {
                    filteredExpenses = expenses.filter(expense => {
                        return expense.registeredIn.getFullYear() == transactionsFilter.year;
                    });
                }
            }
            else {
                if (transactionsFilter.month == 12) {
                    filteredRecipes = recipes.filter(recipe => {
                        return recipe.registeredIn.getFullYear() == transactionsFilter.year;
                    });
                    filteredExpenses = expenses.filter(expense => {
                        return expense.registeredIn.getFullYear() == transactionsFilter.year;
                    });
                }
                else {
                    filteredRecipes = recipes.filter(recipe => {
                        return recipe.registeredIn.getFullYear() == transactionsFilter.year && recipe.registeredIn.getMonth() == transactionsFilter.month;
                    });
                    filteredExpenses = expenses.filter(expense => {
                        return expense.registeredIn.getFullYear() == transactionsFilter.year && expense.registeredIn.getMonth() == transactionsFilter.month;
                    });
                }
            }
            return { filteredRecipes, filteredExpenses };
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