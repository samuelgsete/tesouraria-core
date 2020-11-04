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
exports.TreasuryController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const treasury_service_1 = require("./treasury.service");
const treasury_entity_1 = require("../shared/models/treasury.entity");
const search_filter_entity_1 = require("../shared/models/search-filter.entity");
let TreasuryController = (() => {
    let TreasuryController = class TreasuryController {
        constructor(service) {
            this.service = service;
        }
        findPaginete(filter, page, request) {
            const userId = parseInt(request.headers['userid'].toString());
            return this.service.findAll(userId, new search_filter_entity_1.SearchFilter(filter, page));
        }
        getRecipes(id, request) {
            const userId = parseInt(request.headers['userid'].toString());
            return this.service.getResume(id, userId);
        }
        create(treasury, request) {
            const userId = parseInt(request.headers['userid'].toString());
            treasury.userId = userId;
            return this.service.save(treasury);
        }
        update(treasury, request) {
            const userId = parseInt(request.headers['userid'].toString());
            return this.service.update(userId, treasury);
        }
        delete(id, request) {
            const userId = parseInt(request.headers['userid'].toString());
            return this.service.delete(id, userId);
        }
    };
    __decorate([
        common_1.Get(),
        __param(0, common_1.Query('filter')),
        __param(1, common_1.Query('page')),
        __param(2, common_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Object]),
        __metadata("design:returntype", Promise)
    ], TreasuryController.prototype, "findPaginete", null);
    __decorate([
        common_1.Get('resume/:id'),
        __param(0, common_1.Param('id')),
        __param(1, common_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object]),
        __metadata("design:returntype", Promise)
    ], TreasuryController.prototype, "getRecipes", null);
    __decorate([
        common_1.Post(),
        __param(0, common_1.Body()),
        __param(1, common_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [treasury_entity_1.Treasury, Object]),
        __metadata("design:returntype", void 0)
    ], TreasuryController.prototype, "create", null);
    __decorate([
        common_1.Put(),
        __param(0, common_1.Body()),
        __param(1, common_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [treasury_entity_1.Treasury, Object]),
        __metadata("design:returntype", void 0)
    ], TreasuryController.prototype, "update", null);
    __decorate([
        common_1.Delete(':id'),
        __param(0, common_1.Param('id')),
        __param(1, common_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object]),
        __metadata("design:returntype", void 0)
    ], TreasuryController.prototype, "delete", null);
    TreasuryController = __decorate([
        common_1.Controller('treasury'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        __metadata("design:paramtypes", [treasury_service_1.TreasuryService])
    ], TreasuryController);
    return TreasuryController;
})();
exports.TreasuryController = TreasuryController;
//# sourceMappingURL=treasury.controller.js.map