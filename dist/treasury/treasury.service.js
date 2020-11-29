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
exports.TreasuryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const treasury_entity_1 = require("../shared/models/treasury.entity");
const search_filter_entity_1 = require("../shared/models/search-filter.entity");
const Id_invalid_exception_1 = require("../shared/exceptions/models/Id-invalid.exception");
const permission_denied_excepton_1 = require("../shared/exceptions/models/permission-denied.excepton");
const treasury_not_foud_exception_1 = require("../shared/exceptions/models/treasury-not-foud.exception");
const is_created_exception_1 = require("../shared/exceptions/models/is-created.exception");
let TreasuryService = (() => {
    let TreasuryService = class TreasuryService {
        constructor(repository) {
            this.repository = repository;
        }
        async findAll(userId, filter) {
            const [result, total] = await this.repository.findAndCount({
                where: [
                    { name: typeorm_2.Like(filter.word), userId: userId },
                ],
                order: { name: "ASC" },
                take: 6,
                skip: filter.nextPage()
            });
            return {
                data: result,
                count: total
            };
        }
        async finByName(name) {
            const result = await this.repository.find({ where: { name: name } });
            const treasury = result[0];
            return treasury;
        }
        async getResume(id, userId) {
            if (id <= 0) {
                throw new Id_invalid_exception_1.IdInvalidException("O id informado é invalído");
            }
            const treasury = await this.repository.findOne(id);
            if (!treasury) {
                throw new treasury_not_foud_exception_1.TreasuryNotFoundException("Tesouraria inexistente");
            }
            if (treasury.userId != userId) {
                throw new permission_denied_excepton_1.PermissionDeniedException('Permissão negada');
            }
            const income = {
                initialAmount: treasury.initialAmount,
                currentBalance: treasury.currentBalance,
                incomeRecipes: treasury.incomeRecipes,
                incomeExpenses: treasury.incomeExpenses,
                countSales: treasury.countSale,
                countOffers: treasury.countOffer,
                countContributors: treasury.countTaxpayer,
                countOthers: treasury.countOther
            };
            return income;
        }
        async save(treasury) {
            treasury.currentBalance = treasury.initialAmount;
            const result = await this.finByName(treasury.name);
            if (result) {
                throw new is_created_exception_1.IsCreatedEception('O nome da tesouraria já está sendo utilizado', common_1.HttpStatus.BAD_REQUEST);
            }
            await this.repository.save(treasury);
        }
        async update(userId, treasury) {
            if (treasury.userId != userId) {
                throw new permission_denied_excepton_1.PermissionDeniedException('Permissão negada');
            }
            if (treasury.id == null || treasury.id <= 0) {
                throw new Id_invalid_exception_1.IdInvalidException("O id informado é invalído");
            }
            let outdatedTreasury = await this.repository.findOne({ where: { id: treasury.id } });
            treasury.currentBalance = treasury.currentBalance + (treasury.initialAmount - outdatedTreasury.initialAmount);
            await this.repository.save(treasury);
        }
        async delete(id, userId) {
            if (id <= 0) {
                throw new Id_invalid_exception_1.IdInvalidException("O id informado é invalído");
            }
            let treasury = await this.repository.findOne(id);
            if (!treasury) {
                throw new treasury_not_foud_exception_1.TreasuryNotFoundException("Tesouraria inexistente");
            }
            if (treasury.userId != userId) {
                throw new permission_denied_excepton_1.PermissionDeniedException('Permissão negada');
            }
            await this.repository.delete(id);
        }
    };
    TreasuryService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(treasury_entity_1.Treasury)),
        __metadata("design:paramtypes", [typeorm_2.Repository])
    ], TreasuryService);
    return TreasuryService;
})();
exports.TreasuryService = TreasuryService;
//# sourceMappingURL=treasury.service.js.map