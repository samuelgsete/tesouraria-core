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
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const treasury_entity_1 = require("../shared/models/treasury.entity");
const inventory_entity_1 = require("../shared/models/inventory.entity");
const Id_invalid_exception_1 = require("../shared/exceptions/models/Id-invalid.exception");
const treasury_not_foud_exception_1 = require("../shared/exceptions/models/treasury-not-foud.exception");
const permission_denied_excepton_1 = require("../shared/exceptions/models/permission-denied.excepton");
let InventoryService = (() => {
    let InventoryService = class InventoryService {
        constructor(repositoryTreasury, repositoryInventory) {
            this.repositoryTreasury = repositoryTreasury;
            this.repositoryInventory = repositoryInventory;
        }
        async findAll(treasuryId, userId) {
            const treasury = await this.validateUser(treasuryId, userId);
            return treasury.inventories;
        }
        async create(inventory, treasuryId, userId) {
            const treasury = await this.validateUser(treasuryId, userId);
            treasury.inventories.push(inventory);
            await this.repositoryTreasury.save(treasury);
        }
        async update(inventoryUpdated, treasuryId, userId) {
            const treasury = await this.validateUser(treasuryId, userId);
            const currentInventory = treasury.inventories.filter(inventory => {
                return inventory.id == inventoryUpdated.id;
            })[0];
            const index = treasury.inventories.indexOf(currentInventory);
            treasury.inventories[index] = inventoryUpdated;
            await this.repositoryTreasury.save(treasury);
        }
        async delete(treasuryId, userId, inventoryId) {
            const treasury = await this.validateUser(treasuryId, userId);
            const currentInventory = treasury.inventories.filter(inventory => {
                return inventory.id == inventoryId;
            })[0];
            const index = treasury.inventories.indexOf(currentInventory);
            treasury.inventories.splice(index, 1);
            await this.repositoryTreasury.save(treasury);
            await this.repositoryInventory.delete(inventoryId);
        }
        async validateUser(treasuryId, userId) {
            if (treasuryId <= 0 || userId <= 0) {
                throw new Id_invalid_exception_1.IdInvalidException("O id informado é invalído");
            }
            const treasury = await this.repositoryTreasury.findOne(treasuryId, { relations: ["inventories"] });
            if (!treasury) {
                throw new treasury_not_foud_exception_1.TreasuryNotFoundException("Tesouraria inexistente");
            }
            if (treasury.userId != userId) {
                throw new permission_denied_excepton_1.PermissionDeniedException('Permissão negada');
            }
            return treasury;
        }
    };
    InventoryService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(treasury_entity_1.Treasury)),
        __param(1, typeorm_1.InjectRepository(inventory_entity_1.Inventory)),
        __metadata("design:paramtypes", [typeorm_2.Repository,
            typeorm_2.Repository])
    ], InventoryService);
    return InventoryService;
})();
exports.InventoryService = InventoryService;
//# sourceMappingURL=inventory.service.js.map