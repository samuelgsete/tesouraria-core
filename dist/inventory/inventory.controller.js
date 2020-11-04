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
exports.InventoryController = void 0;
const common_1 = require("@nestjs/common");
const inventory_service_1 = require("./inventory.service");
const inventory_entity_1 = require("../shared/models/inventory.entity");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let InventoryController = (() => {
    let InventoryController = class InventoryController {
        constructor(inventoryService) {
            this.inventoryService = inventoryService;
        }
        findAll(treasuryId, request) {
            const userId = parseInt(request.headers['userid'].toString());
            return this.inventoryService.findAll(treasuryId, userId);
        }
        save(treasuryId, request, inventory) {
            const userId = parseInt(request.headers['userid'].toString());
            return this.inventoryService.create(inventory, treasuryId, userId);
        }
        update(treasuryId, request, inventory) {
            const userId = parseInt(request.headers['userid'].toString());
            return this.inventoryService.update(inventory, treasuryId, userId);
        }
        deleteExpense(treasuryId, request, inventoryId) {
            const userId = parseInt(request.headers['userid'].toString());
            return this.inventoryService.delete(treasuryId, userId, inventoryId);
        }
    };
    __decorate([
        common_1.Get(':treasuryId'),
        __param(0, common_1.Param('treasuryId')), __param(1, common_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object]),
        __metadata("design:returntype", void 0)
    ], InventoryController.prototype, "findAll", null);
    __decorate([
        common_1.Post(':treasuryId'),
        __param(0, common_1.Param('treasuryId')),
        __param(1, common_1.Req()),
        __param(2, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object, inventory_entity_1.Inventory]),
        __metadata("design:returntype", void 0)
    ], InventoryController.prototype, "save", null);
    __decorate([
        common_1.Put(':treasuryId'),
        __param(0, common_1.Param('treasuryId')),
        __param(1, common_1.Req()),
        __param(2, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object, inventory_entity_1.Inventory]),
        __metadata("design:returntype", void 0)
    ], InventoryController.prototype, "update", null);
    __decorate([
        common_1.Delete(':treasuryId'),
        __param(0, common_1.Param('treasuryId')),
        __param(1, common_1.Req()),
        __param(2, common_1.Body('inventoryId')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object, Number]),
        __metadata("design:returntype", void 0)
    ], InventoryController.prototype, "deleteExpense", null);
    InventoryController = __decorate([
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        common_1.Controller('inventory'),
        __metadata("design:paramtypes", [inventory_service_1.InventoryService])
    ], InventoryController);
    return InventoryController;
})();
exports.InventoryController = InventoryController;
//# sourceMappingURL=inventory.controller.js.map