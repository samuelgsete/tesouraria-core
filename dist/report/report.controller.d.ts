import { Request } from 'express';
import { ReportService } from './report.service';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    getReport(treasuryId: number, request: Request, year: number, month: number): Promise<any>;
    downloadReportMonthly(id: number, year: number, month: number, request: Request): Promise<string>;
}
