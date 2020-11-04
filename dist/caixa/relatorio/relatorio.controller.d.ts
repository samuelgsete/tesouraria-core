import { RelatorioService } from './relatorio.service';
export declare class RelatorioController {
    private servico;
    constructor(servico: RelatorioService);
    findAll(): string;
    findReportByDate(id: number, month: number, year: number): Promise<any>;
}
