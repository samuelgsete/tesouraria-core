import { TreasuryService } from './treasury.service';
export declare class ReportService {
    private readonly treasuryService;
    constructor(treasuryService: TreasuryService);
    downloadPDFReport(id: number): Promise<string>;
}
