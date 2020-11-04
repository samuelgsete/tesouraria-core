"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const contagem_controller_1 = require("./contagem.controller");
const contagem_service_1 = require("./contagem.service");
const contagem_entity_1 = require("../shared/models/contagem.entity");
let ContagemModule = class ContagemModule {
};
ContagemModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                contagem_entity_1.Contagem
            ])
        ],
        controllers: [contagem_controller_1.ContagemController],
        providers: [contagem_service_1.ContagemService]
    })
], ContagemModule);
exports.ContagemModule = ContagemModule;
//# sourceMappingURL=contagem.module.js.map