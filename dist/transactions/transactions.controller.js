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
exports.TransactionsController = void 0;
const common_1 = require("@nestjs/common");
const transactions_service_1 = require("./transactions.service");
const recipe_entity_1 = require("../shared/models/recipe.entity");
const expense_entity_1 = require("../shared/models/expense.entity");
const transactions_filter_entity_1 = require("../shared/models/transactions-filter.entity");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let TransactionsController = (() => {
    let TransactionsController = class TransactionsController {
        constructor(transactionsService) {
            this.transactionsService = transactionsService;
        }
        findPaginate(treasuryId, request, year, month, type, page) {
            const userId = parseInt(request.headers['userid'].toString());
            const transactonsFilter = new transactions_filter_entity_1.TransactionsFilter({ year: year, month: month, type: type });
            return this.transactionsService.findPaginate(treasuryId, userId, transactonsFilter, page);
        }
        saveRecipe(treasuryId, request, recipe) {
            const userId = parseInt(request.headers['userid'].toString());
            return this.transactionsService.createRecipe(treasuryId, userId, recipe);
        }
        updateRecipe(treasuryId, request, recipe) {
            const userId = parseInt(request.headers['userid'].toString());
            return this.transactionsService.updateRecipe(treasuryId, userId, recipe);
        }
        deleteRecipe(treasuryId, request, id) {
            const userId = parseInt(request.headers['userid'].toString());
            return this.transactionsService.deleteRecipe(treasuryId, userId, id);
        }
        saveExpense(treasuryId, request, expense) {
            const userId = parseInt(request.headers['userid'].toString());
            return this.transactionsService.createExpense(treasuryId, userId, expense);
        }
        updateExpense(treasuryId, request, expense) {
            const userId = parseInt(request.headers['userid'].toString());
            return this.transactionsService.updateExpense(treasuryId, userId, expense);
        }
        deleteExpense(treasuryId, request, id) {
            const userId = parseInt(request.headers['userid'].toString());
            return this.transactionsService.deleteExpense(treasuryId, userId, id);
        }
    };
    __decorate([
        common_1.Get(':id/transactions'),
        __param(0, common_1.Param('id')),
        __param(1, common_1.Req()),
        __param(2, common_1.Query('year')),
        __param(3, common_1.Query('month')),
        __param(4, common_1.Query('type')),
        __param(5, common_1.Query('page')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object, Number, Number, String, Number]),
        __metadata("design:returntype", void 0)
    ], TransactionsController.prototype, "findPaginate", null);
    __decorate([
        common_1.Post(':id/recipe'),
        __param(0, common_1.Param('id')),
        __param(1, common_1.Req()),
        __param(2, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object, recipe_entity_1.Recipe]),
        __metadata("design:returntype", void 0)
    ], TransactionsController.prototype, "saveRecipe", null);
    __decorate([
        common_1.Put(':id/recipe'),
        __param(0, common_1.Param('id')),
        __param(1, common_1.Req()),
        __param(2, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object, recipe_entity_1.Recipe]),
        __metadata("design:returntype", void 0)
    ], TransactionsController.prototype, "updateRecipe", null);
    __decorate([
        common_1.Delete(':id/recipe'),
        __param(0, common_1.Param('id')),
        __param(1, common_1.Req()),
        __param(2, common_1.Body('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object, Number]),
        __metadata("design:returntype", void 0)
    ], TransactionsController.prototype, "deleteRecipe", null);
    __decorate([
        common_1.Post(':id/expense'),
        __param(0, common_1.Param('id')),
        __param(1, common_1.Req()),
        __param(2, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object, expense_entity_1.Expense]),
        __metadata("design:returntype", void 0)
    ], TransactionsController.prototype, "saveExpense", null);
    __decorate([
        common_1.Put(':id/expense'),
        __param(0, common_1.Param('id')),
        __param(1, common_1.Req()),
        __param(2, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object, expense_entity_1.Expense]),
        __metadata("design:returntype", void 0)
    ], TransactionsController.prototype, "updateExpense", null);
    __decorate([
        common_1.Delete(':id/expense'),
        __param(0, common_1.Param('id')),
        __param(1, common_1.Req()),
        __param(2, common_1.Body('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object, Number]),
        __metadata("design:returntype", void 0)
    ], TransactionsController.prototype, "deleteExpense", null);
    TransactionsController = __decorate([
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        common_1.Controller('treasury'),
        __metadata("design:paramtypes", [transactions_service_1.TransactionsService])
    ], TransactionsController);
    return TransactionsController;
})();
exports.TransactionsController = TransactionsController;
//# sourceMappingURL=transactions.controller.js.map