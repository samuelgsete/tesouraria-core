import { Repository } from 'typeorm';
import { Caixa } from 'src/shared/models/caixa.entity';
export declare class RelatorioService {
    private repositoryCaixa;
    constructor(repositoryCaixa: Repository<Caixa>);
    findById(id: number): Promise<Caixa>;
    findReportByDate(id: number, month: number, year: number): Promise<any>;
}
