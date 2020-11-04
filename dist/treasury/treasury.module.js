"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreasuryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const treasury_controller_1 = require("./treasury.controller");
const treasury_service_1 = require("./treasury.service");
const treasury_entity_1 = require("../shared/models/treasury.entity");
let TreasuryModule = (() => {
    let TreasuryModule = class TreasuryModule {
    };
    TreasuryModule = __decorate([
        common_1.Module({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([
                    treasury_entity_1.Treasury
                ])
            ],
            controllers: [treasury_controller_1.TreasuryController],
            providers: [treasury_service_1.TreasuryService]
        })
    ], TreasuryModule);
    return TreasuryModule;
})();
exports.TreasuryModule = TreasuryModule;
//# sourceMappingURL=treasury.module.js.map