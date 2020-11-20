import { Repository } from "typeorm";
import { Treasury } from "src/shared/models/treasury.entity";
export declare class HistoricService {
    private readonly repositoryTreasury;
    constructor(repositoryTreasury: Repository<Treasury>);
    getHistoric(treasuryId: number, userId: number, year: number): Promise<{
        incomeYearly: any[];
        historyYearly: any[];
    }>;
    private getHistorcBilling;
    private getIncomeTransactions;
    private getTransactionsByMonth;
    private getIncome;
}
