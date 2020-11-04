import { Repository } from 'typeorm';
import { Tesouraria } from 'src/shared/models/tesouraria.entity';
export declare class RelatorioService {
    private repositoryTesouraria;
    constructor(repositoryTesouraria: Repository<Tesouraria>);
    findById(id: number): Promise<Tesouraria>;
    findReportByDate(id: number, month: number, year: number): Promise<any>;
}
