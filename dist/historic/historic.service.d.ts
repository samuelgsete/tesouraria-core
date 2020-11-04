import { Repository } from "typeorm";
import { Treasury } from "src/shared/models/treasury.entity";
import { Inventory } from "src/shared/models/inventory.entity";
export declare class HistoricService {
    private readonly repositoryTreasury;
    constructor(repositoryTreasury: Repository<Treasury>);
    getHistoric(treasuryId: number, userId: number, year: number): Promise<{
        incomeYearly: any[];
        historyYearly: any[];
        historicInventoriesYearly: any[];
    }>;
    private getHistorcBilling;
    private getIncomeTransactions;
    getHistoricInventory(year: number, inventories: Inventory[]): any[];
    private getInventoryByMonth;
    private getTransactionsByMonth;
    private getIncome;
}
