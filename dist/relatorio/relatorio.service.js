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
const common_1 = require("@nestjs/common");
const caixa_entity_1 = require("../shared/models/caixa.entity");
const Id_invalid_exception_1 = require("../shared/exceptions/modelos/Id-invalid.exception");
let RelatorioService = class RelatorioService {
    constructor() { }
    async findReport(id, month, ano) {
    }
};
RelatorioService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], RelatorioService);
exports.RelatorioService = RelatorioService;
//# sourceMappingURL=relatorio.service.js.map