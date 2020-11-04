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
exports.ReportController = void 0;
const common_1 = require("@nestjs/common");
const report_service_1 = require("./report.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let ReportController = (() => {
    let ReportController = class ReportController {
        constructor(reportService) {
            this.reportService = reportService;
        }
        getReport(treasuryId, request, year, month) {
            const userId = parseInt(request.headers['userid'].toString());
            return this.reportService.getReport(treasuryId, userId, year, month);
        }
        downloadReportMonthly(id, year, month, request) {
            const userId = parseInt(request.headers['userid'].toString());
            return this.reportService.downloadReport(id, userId, year, month);
        }
    };
    __decorate([
        common_1.Get(':treasuryId'),
        __param(0, common_1.Param('treasuryId')),
        __param(1, common_1.Req()),
        __param(2, common_1.Query('year')),
        __param(3, common_1.Query('month')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object, Number, Number]),
        __metadata("design:returntype", void 0)
    ], ReportController.prototype, "getReport", null);
    __decorate([
        common_1.Get('download/:id'),
        __param(0, common_1.Param('id')),
        __param(1, common_1.Query('year')),
        __param(2, common_1.Query('month')),
        __param(3, common_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Number, Number, Object]),
        __metadata("design:returntype", void 0)
    ], ReportController.prototype, "downloadReportMonthly", null);
    ReportController = __decorate([
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        common_1.Controller('report'),
        __metadata("design:paramtypes", [report_service_1.ReportService])
    ], ReportController);
    return ReportController;
})();
exports.ReportController = ReportController;
//# sourceMappingURL=report.controller.js.map