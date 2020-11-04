"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const report_controller_1 = require("./report.controller");
const report_service_1 = require("./report.service");
const treasury_entity_1 = require("../shared/models/treasury.entity");
const expense_entity_1 = require("../shared/models/expense.entity");
const recipe_entity_1 = require("../shared/models/recipe.entity");
let ReportModule = (() => {
    let ReportModule = class ReportModule {
    };
    ReportModule = __decorate([
        common_1.Module({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([
                    treasury_entity_1.Treasury,
                    expense_entity_1.Expense,
                    recipe_entity_1.Recipe
                ])
            ],
            controllers: [report_controller_1.ReportController],
            providers: [report_service_1.ReportService]
        })
    ], ReportModule);
    return ReportModule;
})();
exports.ReportModule = ReportModule;
//# sourceMappingURL=report.module.js.map