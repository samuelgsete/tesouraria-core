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
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Repository_1 = require("typeorm/repository/Repository");
const treasury_entity_1 = require("../shared/models/treasury.entity");
const recipe_entity_1 = require("../shared/models/recipe.entity");
const expense_entity_1 = require("../shared/models/expense.entity");
const transactions_filter_entity_1 = require("../shared/models/transactions-filter.entity");
const transaction_type_enum_1 = require("../shared/models/enums/transaction-type.enum");
const Id_invalid_exception_1 = require("../shared/exceptions/models/Id-invalid.exception");
const treasury_not_foud_exception_1 = require("../shared/exceptions/models/treasury-not-foud.exception");
const permission_denied_excepton_1 = require("../shared/exceptions/models/permission-denied.excepton");
let TransactionsService = (() => {
    let TransactionsService = class TransactionsService {
        constructor(repositoryTreasury, repositoryRecipe, repositoryExpense) {
            this.repositoryTreasury = repositoryTreasury;
            this.repositoryRecipe = repositoryRecipe;
            this.repositoryExpense = repositoryExpense;
        }
        async findAll(treasuryId, userId, transactionsFilter) {
            const treasury = await this.validateUser(treasuryId, userId);
            const { filteredRecipes, filteredExpenses } = this.filterTransactions(transactionsFilter, treasury.recipes, treasury.expenses);
            const recipes = filteredRecipes;
            const expenses = filteredExpenses;
            return { recipes, expenses };
        }
        async createRecipe(treasuryId, userId, recipe) {
            const treasury = await this.validateUser(treasuryId, userId);
            treasury.recipes.push(recipe);
            treasury.currentBalance += recipe.value;
            treasury.incomeRecipes += recipe.value;
            await this.repositoryTreasury.save(treasury);
        }
        async updateRecipe(treasuryId, userId, recipeUpdated) {
            const treasury = await this.validateUser(treasuryId, userId);
            const currentRecipe = treasury.recipes.filter(recipe => {
                return recipe.id == recipeUpdated.id;
            })[0];
            const index = treasury.recipes.indexOf(currentRecipe);
            treasury.incomeRecipes += recipeUpdated.value - currentRecipe.value;
            treasury.currentBalance += recipeUpdated.value - currentRecipe.value;
            treasury.recipes[index] = recipeUpdated;
            await this.repositoryTreasury.save(treasury);
        }
        async deleteRecipe(treasuryId, userId, recipeId) {
            const treasury = await this.validateUser(treasuryId, userId);
            const currentRecipe = treasury.recipes.filter(recipe => {
                return recipe.id == recipeId;
            })[0];
            if (!currentRecipe) {
                return { message: 'Receita inexistente' };
            }
            const index = treasury.recipes.indexOf(currentRecipe);
            treasury.recipes.splice(index, 1);
            treasury.incomeRecipes -= currentRecipe.value;
            treasury.currentBalance -= currentRecipe.value;
            await this.repositoryTreasury.save(treasury);
            await this.repositoryRecipe.delete(recipeId);
        }
        async createExpense(treasuryId, userId, expense) {
            const treasury = await this.validateUser(treasuryId, userId);
            treasury.expenses.push(expense);
            treasury.currentBalance -= expense.value;
            treasury.incomeExpenses += expense.value;
            await this.repositoryTreasury.save(treasury);
        }
        async updateExpense(treasuryId, userId, expenseUpdated) {
            const treasury = await this.validateUser(treasuryId, userId);
            const currentExpense = treasury.expenses.filter(expense => {
                return expense.id == expenseUpdated.id;
            })[0];
            const index = treasury.expenses.indexOf(currentExpense);
            treasury.incomeExpenses += expenseUpdated.value - currentExpense.value;
            treasury.currentBalance -= expenseUpdated.value - currentExpense.value;
            treasury.expenses[index] = expenseUpdated;
            await this.repositoryTreasury.save(treasury);
        }
        async deleteExpense(treasuryId, userId, expenseId) {
            const treasury = await this.validateUser(treasuryId, userId);
            const currentExpense = treasury.expenses.filter(recipe => {
                return recipe.id == expenseId;
            })[0];
            if (!currentExpense) {
                return null;
            }
            const index = treasury.expenses.indexOf(currentExpense);
            treasury.expenses.splice(index, 1);
            treasury.incomeExpenses -= currentExpense.value;
            treasury.currentBalance += currentExpense.value;
            await this.repositoryTreasury.save(treasury);
            await this.repositoryExpense.delete(expenseId);
        }
        async validateUser(treasuryId, userId) {
            if (treasuryId <= 0 || userId <= 0) {
                throw new Id_invalid_exception_1.IdInvalidException("O id informado é invalído");
            }
            const treasury = await this.repositoryTreasury.findOne(treasuryId, { relations: ["expenses", "recipes"] });
            if (!treasury) {
                throw new treasury_not_foud_exception_1.TreasuryNotFoundException("Tesouraria inexistente");
            }
            if (treasury.userId != userId) {
                throw new permission_denied_excepton_1.PermissionDeniedException('Permissão negada');
            }
            return treasury;
        }
        filterTransactions(transactionsFilter, recipes, expenses) {
            let filteredRecipes = [];
            let filteredExpenses = [];
            const ALL_MONTHS = 12;
            if (transactionsFilter.type == transaction_type_enum_1.TransactionType.RECIPE) {
                filteredRecipes = recipes.filter(recipe => {
                    return recipe.registeredIn.getFullYear() == transactionsFilter.year && recipe.registeredIn.getMonth() == transactionsFilter.month;
                });
                if (transactionsFilter.month == ALL_MONTHS) {
                    filteredRecipes = recipes.filter(recipe => {
                        return recipe.registeredIn.getFullYear() == transactionsFilter.year;
                    });
                }
            }
            else if (transactionsFilter.type == transaction_type_enum_1.TransactionType.EXPENSE) {
                filteredExpenses = expenses.filter(expense => {
                    return expense.registeredIn.getFullYear() == transactionsFilter.year && expense.registeredIn.getMonth() == transactionsFilter.month;
                });
                if (transactionsFilter.month == ALL_MONTHS) {
                    filteredExpenses = expenses.filter(expense => {
                        return expense.registeredIn.getFullYear() == transactionsFilter.year;
                    });
                }
            }
            else {
                if (transactionsFilter.month == ALL_MONTHS) {
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
        __param(0, typeorm_1.InjectRepository(treasury_entity_1.Treasury)),
        __param(1, typeorm_1.InjectRepository(recipe_entity_1.Recipe)),
        __param(2, typeorm_1.InjectRepository(expense_entity_1.Expense)),
        __metadata("design:paramtypes", [Repository_1.Repository,
            Repository_1.Repository,
            Repository_1.Repository])
    ], TransactionsService);
    return TransactionsService;
})();
exports.TransactionsService = TransactionsService;
//# sourceMappingURL=transactions.service.js.map