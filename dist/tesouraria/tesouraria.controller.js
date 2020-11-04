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
exports.TesourariaController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const tesouraria_service_1 = require("./tesouraria.service");
const treasury_entity_1 = require("../shared/models/treasury.entity");
const search_filter_entity_1 = require("../shared/models/search-filter.entity");
const Id_invalid_exception_1 = require("../shared/exceptions/models/Id-invalid.exception");
let TesourariaController = (() => {
    let TesourariaController = class TesourariaController {
        constructor(service) {
            this.service = service;
        }
        findPaginete(filtro, page, request) {
            if (!request.headers.userid) {
                throw new Id_invalid_exception_1.IdInvalidException('O ID do usuário está ausente');
            }
            let userId = parseInt(request.headers.userid[0]);
            return this.service.findAll(userId, new search_filter_entity_1.FiltroBusca(filtro, page));
        }
        findById(id, request) {
            if (!request.headers.userid) {
                throw new Id_invalid_exception_1.IdInvalidException('O ID do usuário está ausente');
            }
            let userId = parseInt(request.headers.userid[0]);
            return this.service.findById(id, userId);
        }
        getReport(id, ano, mes, request) {
            if (!request.headers.userid) {
                throw new Id_invalid_exception_1.IdInvalidException('O ID do usuário está ausente');
            }
            let userId = parseInt(request.headers.userid[0]);
            return this.service.getReport(id, userId, ano, mes);
        }
        getHistory(id, ano, request) {
            if (!request.headers.userid) {
                throw new Id_invalid_exception_1.IdInvalidException('O ID do usuário está ausente');
            }
            let userId = parseInt(request.headers.userid[0]);
            return this.service.getHistory(userId, id, ano);
        }
        getRecipes(id, request) {
            if (!request.headers.userid) {
                throw new Id_invalid_exception_1.IdInvalidException('O ID do usuário está ausente');
            }
            let userId = parseInt(request.headers.userid[0]);
            return this.service.getRecipes(id, userId);
        }
        create(tesouraria, request) {
            let userId = parseInt(request.headers.userid[0]);
            tesouraria.userId = userId;
            return this.service.save(tesouraria);
        }
        update(tesouraria, request) {
            if (!request.headers.userid) {
                throw new Id_invalid_exception_1.IdInvalidException('O ID do usuário está ausente');
            }
            let userId = parseInt(request.headers.userid[0]);
            return this.service.update(userId, tesouraria);
        }
        delete(id, request) {
            if (!request.headers.userid) {
                throw new Id_invalid_exception_1.IdInvalidException('O ID do usuário está ausente');
            }
            let userId = parseInt(request.headers.userid[0]);
            return this.service.delete(id, userId);
        }
    };
    __decorate([
        common_1.Get(),
        __param(0, common_1.Query('filtro')),
        __param(1, common_1.Query('page')),
        __param(2, common_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Object]),
        __metadata("design:returntype", Promise)
    ], TesourariaController.prototype, "findPaginete", null);
    __decorate([
        common_1.Get(':id'),
        __param(0, common_1.Param('id')),
        __param(1, common_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object]),
        __metadata("design:returntype", Promise)
    ], TesourariaController.prototype, "findById", null);
    __decorate([
        common_1.Get('relatorio/:id'),
        __param(0, common_1.Param('id')),
        __param(1, common_1.Query('ano')),
        __param(2, common_1.Query('mes')),
        __param(3, common_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Number, Number, Object]),
        __metadata("design:returntype", Promise)
    ], TesourariaController.prototype, "getReport", null);
    __decorate([
        common_1.Get('historico/:id'),
        __param(0, common_1.Param('id')),
        __param(1, common_1.Query('ano')),
        __param(2, common_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Number, Object]),
        __metadata("design:returntype", Promise)
    ], TesourariaController.prototype, "getHistory", null);
    __decorate([
        common_1.Get('receitas/:id'),
        __param(0, common_1.Param('id')),
        __param(1, common_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object]),
        __metadata("design:returntype", Promise)
    ], TesourariaController.prototype, "getRecipes", null);
    __decorate([
        common_1.Post(),
        __param(0, common_1.Body()),
        __param(1, common_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [treasury_entity_1.Tesouraria, Object]),
        __metadata("design:returntype", void 0)
    ], TesourariaController.prototype, "create", null);
    __decorate([
        common_1.Put(),
        __param(0, common_1.Body()),
        __param(1, common_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [treasury_entity_1.Tesouraria, Object]),
        __metadata("design:returntype", void 0)
    ], TesourariaController.prototype, "update", null);
    __decorate([
        common_1.Delete(':id'),
        __param(0, common_1.Param('id')),
        __param(1, common_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object]),
        __metadata("design:returntype", void 0)
    ], TesourariaController.prototype, "delete", null);
    TesourariaController = __decorate([
        common_1.Controller('tesouraria'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        __metadata("design:paramtypes", [tesouraria_service_1.TesourariaService])
    ], TesourariaController);
    return TesourariaController;
})();
exports.TesourariaController = TesourariaController;
//# sourceMappingURL=tesouraria.controller.js.map