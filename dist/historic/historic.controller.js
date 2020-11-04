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
exports.HistoricController = void 0;
const common_1 = require("@nestjs/common");
const historic_service_1 = require("./historic.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let HistoricController = (() => {
    let HistoricController = class HistoricController {
        constructor(historicService) {
            this.historicService = historicService;
        }
        getHistoricYearly(treasuryId, year, request) {
            const userId = parseInt(request.headers['userid'].toString());
            return this.historicService.getHistoric(treasuryId, userId, year);
        }
    };
    __decorate([
        common_1.Get(':treasuryId'),
        __param(0, common_1.Param('treasuryId')),
        __param(1, common_1.Query('year')),
        __param(2, common_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Number, Object]),
        __metadata("design:returntype", void 0)
    ], HistoricController.prototype, "getHistoricYearly", null);
    HistoricController = __decorate([
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        common_1.Controller('historic'),
        __metadata("design:paramtypes", [historic_service_1.HistoricService])
    ], HistoricController);
    return HistoricController;
})();
exports.HistoricController = HistoricController;
//# sourceMappingURL=historic.controller.js.map