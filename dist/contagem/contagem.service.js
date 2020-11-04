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
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const contagem_entity_1 = require("../shared/models/contagem.entity");
const Id_invalid_exception_1 = require("../shared/exceptions/modelos/Id-invalid.exception");
const filtro_busca_1 = require("../shared/models/filtro-busca");
let ContagemService = class ContagemService {
    constructor(repository) {
        this.repository = repository;
    }
    async findPaginate(filtro) {
        const [result, total] = await this.repository.findAndCount({
            relations: ["caixa"],
            take: 6,
            skip: filtro.nextPage()
        });
        return {
            data: result,
            count: total
        };
    }
    findById(id) {
        if (id <= 0) {
            throw new Id_invalid_exception_1.IdInvalidException("O id informado é invalído");
        }
        return this.repository.findOne(id, { relations: ["caixa"] });
    }
    async findAllByIdCaixa(caixaId) {
        if (caixaId <= 0) {
            throw new Id_invalid_exception_1.IdInvalidException("O id informado é invalído");
        }
        return this.repository.createQueryBuilder().where("id_caixa = :id", { id: caixaId }).getMany();
    }
    async save(contagem) {
        return this.repository
            .save(contagem)
            .then(e => {
            return {
                mensagem: 'Criado com sucesso'
            };
        });
    }
    async update(contagem) {
        if (contagem.id == null || contagem.id <= 0) {
            throw new Id_invalid_exception_1.IdInvalidException("O id informado é invalído");
        }
        return this.repository
            .save(contagem)
            .then(e => {
            return {
                mensagem: 'Atualizado com sucesso'
            };
        });
    }
    async delete(id) {
        if (id <= 0) {
            throw new Id_invalid_exception_1.IdInvalidException("O id informado é invalído");
        }
        return this.repository
            .delete(id)
            .then(e => {
            return {
                mensagem: 'Deletado com sucesso'
            };
        });
    }
};
ContagemService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(contagem_entity_1.Contagem)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ContagemService);
exports.ContagemService = ContagemService;
//# sourceMappingURL=contagem.service.js.map