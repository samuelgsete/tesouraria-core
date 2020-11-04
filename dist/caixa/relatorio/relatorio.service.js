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
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const caixa_entity_1 = require("../../shared/models/caixa.entity");
const Id_invalid_exception_1 = require("../../shared/exceptions/modelos/Id-invalid.exception");
const relatorio_entity_1 = require("./relatorio.entity");
let RelatorioService = class RelatorioService {
    constructor(repositoryCaixa) {
        this.repositoryCaixa = repositoryCaixa;
    }
    async findById(id) {
        if (id <= 0) {
            throw new Id_invalid_exception_1.IdInvalidException("O id informado é invalído");
        }
        return this.repositoryCaixa.findOne(id, { relations: ["saidas", "entradas", "entradas.creditos"] });
    }
    async findReportByDate(id, month, year) {
        let caixa = await this.findById(id);
        if (caixa == null) {
            throw new Id_invalid_exception_1.IdInvalidException('O id informado não está cadastrado');
        }
        let _entradas = caixa.entradas.filter(e => {
            return e.registro.getMonth() == month && e.registro.getFullYear() == year;
        });
        let _saidas = caixa.saidas.filter(s => {
            return s.registro.getMonth() == month && s.registro.getFullYear() == year;
        });
        let relatorio = new relatorio_entity_1.Relatorio({
            nomeCaixa: caixa.nome,
            saldoInicial: caixa.saldoInicial,
            saldoAtual: caixa.saldoAtual,
            entradas: _entradas,
            saidas: _saidas,
        });
        relatorio.calcularSaldoDoMes();
        return relatorio;
    }
};
RelatorioService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(caixa_entity_1.Caixa)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RelatorioService);
exports.RelatorioService = RelatorioService;
//# sourceMappingURL=relatorio.service.js.map