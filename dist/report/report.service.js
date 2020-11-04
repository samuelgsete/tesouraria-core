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
const moment = require("moment");
const treasury_entity_1 = require("../shared/models/treasury.entity");
const recipe_entity_1 = require("../shared/models/recipe.entity");
const expense_entity_1 = require("../shared/models/expense.entity");
const Id_invalid_exception_1 = require("../shared/exceptions/models/Id-invalid.exception");
const treasury_not_foud_exception_1 = require("../shared/exceptions/models/treasury-not-foud.exception");
const permission_denied_excepton_1 = require("../shared/exceptions/models/permission-denied.excepton");
const ALL_MONTHS = 12;
let ReportService = (() => {
    let ReportService = class ReportService {
        constructor(repositoryTreasury) {
            this.repositoryTreasury = repositoryTreasury;
        }
        async getReport(treasuryId, userId, year, month) {
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
            return report;
        }
        async downloadReport(treasuryId, userId, year, month) {
            const options = { format: 'A4', orientation: 'landscape' };
            let document = '';
            const months = [
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
            if (month == ALL_MONTHS) {
                const annualReport = this.getReportYearly(year, treasury.recipes, treasury.expenses);
                ejs.renderFile('src/report/annual-report-template.ejs', { moment: moment, income: income, annualReport: annualReport, year: year, months: months }, (err, html) => {
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
            const monthSelected = months[month];
            ejs.renderFile('src/report/report-template.ejs', { moment: moment, income: income, report: report, year: year, month: monthSelected }, (err, html) => {
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