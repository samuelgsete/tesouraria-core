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
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ejs = require("ejs");
const treasury_entity_1 = require("../shared/models/treasury.entity");
const recipe_entity_1 = require("../shared/models/recipe.entity");
const expense_entity_1 = require("../shared/models/expense.entity");
const Id_invalid_exception_1 = require("../shared/exceptions/models/Id-invalid.exception");
const treasury_not_foud_exception_1 = require("../shared/exceptions/models/treasury-not-foud.exception");
const permission_denied_excepton_1 = require("../shared/exceptions/models/permission-denied.excepton");
const recipe_type_enum_1 = require("../shared/models/enums/recipe-type.enum");
const ALL_MONTHS = 12;
const MONTHS = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outrubo',
    'Novembro',
    'Dezembro'
];
let ReportService = (() => {
    let ReportService = class ReportService {
        constructor(repositoryTreasury) {
            this.repositoryTreasury = repositoryTreasury;
        }
        async getReport(treasuryId, userId, year, month) {
            const reports = [];
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
            if (month == ALL_MONTHS) {
                return this.getReportYearly(year, treasury.recipes, treasury.expenses);
            }
            const report = this.getReportMonthly(year, month, treasury.recipes, treasury.expenses);
            reports.push(report);
            return reports;
        }
        async downloadReport(treasuryId, userId, year, month) {
            const options = { format: 'A4', orientation: 'landscape' };
            let document = '';
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
            const income = {
                initialAmount: treasury.initialAmount,
                currentBalance: treasury.currentBalance,
                incomeRecipes: treasury.incomeRecipes,
                incomeExpenses: treasury.incomeExpenses
            };
            const dateFormat = (date) => {
                const day = date.getDate();
                const month = date.getMonth();
                const year = date.getFullYear();
                return `${day} de ${MONTHS[month]} de ${year}`;
            };
            if (month == ALL_MONTHS) {
                const annualReport = this.getReportYearly(year, treasury.recipes, treasury.expenses);
                ejs.renderFile('src/report/annual-report-template.ejs', { dateFormat: dateFormat, income: income, annualReport: annualReport, year: year, months: MONTHS }, (err, html) => {
                    if (err) {
                        throw new Error('Não foi possivel renderizar o documento');
                    }
                    else {
                        document = html;
                    }
                });
                return document;
            }
            const report = this.getReportMonthly(year, month, treasury.recipes, treasury.expenses);
            const monthSelected = MONTHS[month];
            ejs.renderFile('src/report/report-template.ejs', { dateFormat: dateFormat, income: income, report: report, year: year, month: monthSelected }, (err, html) => {
                if (err) {
                    throw new Error('Não foi possivel renderizar o documento');
                }
                else {
                    document = html;
                }
            });
            return document;
        }
        getReportMonthly(year, month, recipes, expenses) {
            const transactions = this.getTransactionsByMonth(year, month, recipes, expenses);
            const incomeMontly = this.getIncome(transactions.recipes, transactions.expenses);
            const incomeRecipesMonthly = incomeMontly.incomeRecipes;
            const incomeExpensesMonthly = incomeMontly.incomeExpenses;
            const balanceMonthly = incomeRecipesMonthly - incomeExpensesMonthly;
            recipes = this.sortTransactions(transactions.recipes);
            expenses = this.sortTransactions(transactions.expenses);
            const accountants = this.categorizeRecipes(recipes);
            return {
                recipes,
                expenses,
                incomeRecipesMonthly,
                incomeExpensesMonthly,
                balanceMonthly,
                accountants
            };
        }
        categorizeRecipes(recipes) {
            let countSales = 0;
            let countOffers = 0;
            let countContributors = 0;
            let countOthers = 0;
            const sales = recipes.filter(recipe => {
                return recipe.recipeType == recipe_type_enum_1.RecipeType.SALE;
            });
            const offers = recipes.filter(recipe => {
                return recipe.recipeType == recipe_type_enum_1.RecipeType.OFFER;
            });
            const contributors = recipes.filter(recipe => {
                return recipe.recipeType == recipe_type_enum_1.RecipeType.TAXPAYER;
            });
            const others = recipes.filter(recipe => {
                return recipe.recipeType == recipe_type_enum_1.RecipeType.OTHER;
            });
            sales.forEach(recipe => {
                countSales += recipe.value;
            });
            offers.forEach(recipe => {
                countOffers += recipe.value;
            });
            contributors.forEach(recipe => {
                countContributors += recipe.value;
            });
            others.forEach(recipe => {
                countOthers += recipe.value;
            });
            return {
                countSales: countSales,
                countOffers: countOffers,
                countContributors: countContributors,
                countOthers: countOthers
            };
        }
        getReportYearly(year, recipes, expenses) {
            const annualReport = [];
            for (let month = 0; month < ALL_MONTHS; month++) {
                annualReport.push(this.getReportMonthly(year, month, recipes, expenses));
            }
            return annualReport;
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
        sortTransactions(transactions) {
            const sortedTransactions = transactions.sort((t1, t2) => {
                if (t1.registeredIn > t2.registeredIn) {
                    return 1;
                }
                if (t1.registeredIn < t2.registeredIn) {
                    return -1;
                }
                return 0;
            });
            return sortedTransactions;
            ;
        }
    };
    ReportService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(treasury_entity_1.Treasury)),
        __metadata("design:paramtypes", [typeorm_2.Repository])
    ], ReportService);
    return ReportService;
})();
exports.ReportService = ReportService;
//# sourceMappingURL=report.service.js.map