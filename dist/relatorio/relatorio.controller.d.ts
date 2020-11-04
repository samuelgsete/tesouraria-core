import { RelatorioService } from './relatorio.service';
export declare class RelatorioController {
    private service;
    constructor(service: RelatorioService);
    findReport(id: number, month: number, year: number): Promise<any>;
}
