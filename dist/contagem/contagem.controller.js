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
const contagem_service_1 = require("./contagem.service");
const contagem_entity_1 = require("../shared/models/contagem.entity");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const filtro_busca_1 = require("../shared/models/filtro-busca");
let ContagemController = class ContagemController {
    constructor(service) {
        this.service = service;
    }
    findPaginete(page) {
        return this.service.findPaginate(new filtro_busca_1.FiltroBusca('', page));
    }
    findById(id) {
        return this.service.findById(id);
    }
    findByIdCaixa(id) {
        return this.service.findAllByIdCaixa(id);
    }
    create(contagem) {
        return this.service.save(contagem);
    }
    update(contagem) {
        return this.service.update(contagem);
    }
    delete(id) {
        return this.service.delete(id);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContagemController.prototype, "findPaginete", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ContagemController.prototype, "findById", null);
__decorate([
    common_1.Get('caixa/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ContagemController.prototype, "findByIdCaixa", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contagem_entity_1.Contagem]),
    __metadata("design:returntype", void 0)
], ContagemController.prototype, "create", null);
__decorate([
    common_1.Put(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contagem_entity_1.Contagem]),
    __metadata("design:returntype", void 0)
], ContagemController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ContagemController.prototype, "delete", null);
ContagemController = __decorate([
    common_1.Controller('contagem'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [contagem_service_1.ContagemService])
], ContagemController);
exports.ContagemController = ContagemController;
//# sourceMappingURL=contagem.controller.js.map