import { Request } from 'express';
import { InventoryService } from './inventory.service';
import { Inventory } from 'src/shared/models/inventory.entity';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    findAll(treasuryId: number, request: Request): Promise<Inventory[]>;
    save(treasuryId: number, request: Request, inventory: Inventory): Promise<void>;
    update(treasuryId: number, request: Request, inventory: Inventory): Promise<void>;
    deleteExpense(treasuryId: number, request: Request, inventoryId: number): Promise<void>;
}
