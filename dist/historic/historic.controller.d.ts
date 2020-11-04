import { Request } from 'express';
import { HistoricService } from './historic.service';
export declare class HistoricController {
    private readonly historicService;
    constructor(historicService: HistoricService);
    getHistoricYearly(treasuryId: number, year: number, request: Request): Promise<{
        incomeYearly: any[];
        historyYearly: any[];
        historicInventoriesYearly: any[];
    }>;
}
