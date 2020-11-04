"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TesourariaModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tesouraria_controller_1 = require("./tesouraria.controller");
const tesouraria_service_1 = require("./tesouraria.service");
const treasury_entity_1 = require("../shared/models/treasury.entity");
const expense_entity_1 = require("../shared/models/expense.entity");
const recipe_entity_1 = require("../shared/models/recipe.entity");
const credit_entity_1 = require("../shared/models/credit.entity");
const inventory_entity_1 = require("../shared/models/inventory.entity");
const transactions_service_1 = require("./transactions.service");
let TesourariaModule = (() => {
    let TesourariaModule = class TesourariaModule {
    };
    TesourariaModule = __decorate([
        common_1.Module({
            imports: [typeorm_1.TypeOrmModule.forFeature([
                    treasury_entity_1.Tesouraria,
                    expense_entity_1.Saida,
                    recipe_entity_1.Entrada,
                    credit_entity_1.Credito,
                    inventory_entity_1.Contagem
                ])],
            controllers: [tesouraria_controller_1.TesourariaController],
            providers: [tesouraria_service_1.TesourariaService, transactions_service_1.TransactionsService]
        })
    ], TesourariaModule);
    return TesourariaModule;
})();
exports.TesourariaModule = TesourariaModule;
//# sourceMappingURL=tesouraria.module.js.map