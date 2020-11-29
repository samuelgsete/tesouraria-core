import { Repository } from "typeorm";
import { Treasury } from "src/shared/models/treasury.entity";
export declare class ReportService {
    private readonly repositoryTreasury;
    constructor(repositoryTreasury: Repository<Treasury>);
    getReport(treasuryId: number, userId: number, year: number, month: number): Promise<any>;
    downloadReport(treasuryId: number, userId: number, year: number, month: number): Promise<string>;
    private getReportMonthly;
    private categorizeRecipes;
    private getReportYearly;
    private getTransactionsByMonth;
    private getIncome;
    private sortTransactions;
}
