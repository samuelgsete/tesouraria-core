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
exports.TesourariaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const treasury_entity_1 = require("../shared/models/treasury.entity");
const search_filter_entity_1 = require("../shared/models/search-filter.entity");
const Id_invalid_exception_1 = require("../shared/exceptions/models/Id-invalid.exception");
const permission_denied_excepton_1 = require("../shared/exceptions/models/permission-denied.excepton");
const treasury_not_foud_exception_1 = require("../shared/exceptions/models/treasury-not-foud.exception");
const is_created_exception_1 = require("../shared/exceptions/models/is-created.exception");
const transactions_service_1 = require("./transactions.service");
let TesourariaService = (() => {
    let TesourariaService = class TesourariaService {
        constructor(repositoryTesouraria, transactionService) {
            this.repositoryTesouraria = repositoryTesouraria;
            this.transactionService = transactionService;
        }
        async findAll(userId, filtro) {
            const [result, total] = await this.repositoryTesouraria.findAndCount({
                relations: ["saidas", "entradas", "contagens", "entradas.creditos"],
                where: [
                    { nome: typeorm_2.Like(filtro.palavra), userId: userId },
                ],
                order: { nome: "ASC" },
                take: 6,
                skip: filtro.nextPage()
            });
            return {
                data: result,
                count: total
            };
        }
        async findById(id, userId) {
            if (id <= 0) {
                throw new Id_invalid_exception_1.IdInvalidException("O id informado é invalído");
            }
            let tesouraria = await this.repositoryTesouraria.findOne(id, { relations: ["saidas", "entradas", "contagens", "entradas.creditos"] });
            if (tesouraria == null) {
                throw new treasury_not_foud_exception_1.TreasuryNotFoundException("Tesouraria inexistente");
            }
            if (tesouraria.userId != userId) {
                throw new permission_denied_excepton_1.PermissionDeniedException('Permissão negada');
            }
            return tesouraria;
        }
        async finByName(name) {
            const result = await this.repositoryTesouraria.find({ where: { nome: name } });
            const treasury = result[0];
            return treasury;
        }
        async getReport(id, userId, ano, mes) {
            if (id <= 0) {
                throw new Id_invalid_exception_1.IdInvalidException("O id informado é invalído");
            }
            const tesouraria = await this.repositoryTesouraria.findOne(id, { relations: ["saidas", "entradas", "contagens", "entradas.creditos"] });
            if (tesouraria == null) {
                throw new treasury_not_foud_exception_1.TreasuryNotFoundException("Tesouraria inexistente");
            }
            if (tesouraria.userId != userId) {
                throw new permission_denied_excepton_1.PermissionDeniedException('Permissão negada');
            }
            const report = this.transactionService.getReportMonthly(ano, mes, tesouraria.entradas, tesouraria.saidas);
            return report;
        }
        async getHistory(userId, id, ano) {
            if (id <= 0) {
                throw new Id_invalid_exception_1.IdInvalidException("O id informado é invalído");
            }
            const tesouraria = await this.repositoryTesouraria.findOne(id, { relations: ["saidas", "entradas", "contagens", "entradas.creditos"] });
            if (tesouraria == null) {
                throw new treasury_not_foud_exception_1.TreasuryNotFoundException("Tesouraria inexistente");
            }
            if (tesouraria.userId != userId) {
                throw new permission_denied_excepton_1.PermissionDeniedException('Permissão negada');
            }
            const incomeYearly = this.transactionService.getIncomeYearly(ano, tesouraria.entradas, tesouraria.saidas);
            const historyYearly = this.transactionService.getHistoryYearly(ano, tesouraria.saldoInicial, tesouraria.entradas, tesouraria.saidas);
            return { incomeYearly, historyYearly };
        }
        async getRecipes(id, userId) {
            if (id <= 0) {
                throw new Id_invalid_exception_1.IdInvalidException("O id informado é invalído");
            }
            let tesouraria = await this.repositoryTesouraria.findOne(id, { relations: ["saidas", "entradas", "contagens", "entradas.creditos"] });
            if (tesouraria == null) {
                throw new treasury_not_foud_exception_1.TreasuryNotFoundException("Tesouraria inexistente");
            }
            if (tesouraria.userId != userId) {
                throw new permission_denied_excepton_1.PermissionDeniedException('Permissão negada');
            }
            let recipes = this.transactionService.getRecipeGeneral(tesouraria.entradas, tesouraria.saidas, tesouraria.saldoInicial, tesouraria.saldoAtual);
            return recipes;
        }
        async save(tesouraria) {
            tesouraria.saldoAtual = tesouraria.saldoInicial;
            const result = await this.finByName(tesouraria.nome);
            if (result) {
                throw new is_created_exception_1.IsCreatedEception('O nome da tesouraria já está sendo utilizado', common_1.HttpStatus.BAD_REQUEST);
            }
            return this.repositoryTesouraria
                .save(tesouraria)
                .then(e => {
                return {
                    mensagem: 'Criado com sucesso'
                };
            });
        }
        async update(userId, tesouraria) {
            let treasury = await this.repositoryTesouraria.findOne(tesouraria.id, { relations: ["saidas", "entradas", "contagens", "entradas.creditos"] });
            if (treasury == null) {
                throw new treasury_not_foud_exception_1.TreasuryNotFoundException("Tesouraria inexistente");
            }
            if (tesouraria.userId != userId) {
                throw new permission_denied_excepton_1.PermissionDeniedException('Permissão negada');
            }
            if (tesouraria.id == null || tesouraria.id <= 0) {
                throw new Id_invalid_exception_1.IdInvalidException("O id informado é invalído");
            }
            tesouraria.saldoAtual = this.transactionService.updateBalance(tesouraria.entradas, tesouraria.saidas, tesouraria.saldoInicial);
            return this.repositoryTesouraria
                .save(tesouraria)
                .then(e => {
                return {
                    mensagem: 'Atualizado com sucesso'
                };
            });
        }
        async delete(id, userId) {
            if (id <= 0) {
                throw new Id_invalid_exception_1.IdInvalidException("O id informado é invalído");
            }
            let treasury = await this.repositoryTesouraria.findOne(id, { relations: ["saidas", "entradas", "contagens", "entradas.creditos"] });
            if (treasury == null) {
                throw new treasury_not_foud_exception_1.TreasuryNotFoundException("Tesouraria inexistente");
            }
            if (treasury.userId != userId) {
                throw new permission_denied_excepton_1.PermissionDeniedException('Permissão negada');
            }
            return this.repositoryTesouraria
                .delete(id)
                .then(e => {
                return {
                    mensagem: 'Deletado com sucesso'
                };
            });
        }
    };
    TesourariaService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(treasury_entity_1.Tesouraria)),
        __metadata("design:paramtypes", [typeorm_2.Repository,
            transactions_service_1.TransactionsService])
    ], TesourariaService);
    return TesourariaService;
})();
exports.TesourariaService = TesourariaService;
//# sourceMappingURL=tesouraria.service.js.map