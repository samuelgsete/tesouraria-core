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
const common_1 = require("@nestjs/common");
const relatorio_service_1 = require("./relatorio.service");
let RelatorioController = class RelatorioController {
    constructor(service) {
        this.service = service;
    }
    findReport(id, month, year) {
        return this.service.findReport(id, month, year);
    }
};
__decorate([
    common_1.Get(':id/:month/:year'),
    __param(0, common_1.Param('id')), __param(1, common_1.Param('month')), __param(2, common_1.Param('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], RelatorioController.prototype, "findReport", null);
RelatorioController = __decorate([
    common_1.Controller('relatorio'),
    __metadata("design:paramtypes", [relatorio_service_1.RelatorioService])
], RelatorioController);
exports.RelatorioController = RelatorioController;
//# sourceMappingURL=relatorio.controller.js.map