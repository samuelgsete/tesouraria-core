import { Repository } from "typeorm";
import { Treasury } from "src/shared/models/treasury.entity";
import { Inventory } from "src/shared/models/inventory.entity";
export declare class InventoryService {
    private readonly repositoryTreasury;
    private readonly repositoryInventory;
    constructor(repositoryTreasury: Repository<Treasury>, repositoryInventory: Repository<Inventory>);
    findAll(treasuryId: number, userId: number): Promise<Inventory[]>;
    create(inventory: Inventory, treasuryId: number, userId: number): Promise<void>;
    update(inventoryUpdated: Inventory, treasuryId: number, userId: number): Promise<void>;
    delete(treasuryId: number, userId: number, inventoryId: number): Promise<void>;
    private validateUser;
}
