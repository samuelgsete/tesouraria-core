import { Repository } from 'typeorm';
import { Tesouraria } from 'src/shared/models/treasury.entity';
import { FiltroBusca } from 'src/shared/models/search-filter.entity';
import { TransactionsService } from './transactions.service';
export declare class TesourariaService {
    private repositoryTesouraria;
    private readonly transactionService;
    constructor(repositoryTesouraria: Repository<Tesouraria>, transactionService: TransactionsService);
    findAll(userId: number, filtro: FiltroBusca): Promise<any>;
    findById(id: number, userId: number): Promise<Tesouraria>;
    finByName(name: string): Promise<Tesouraria>;
    getReport(id: number, userId: number, ano: number, mes: number): Promise<any>;
    getHistory(userId: number, id: number, ano: number): Promise<any>;
    getRecipes(id: number, userId: number): Promise<any>;
    save(tesouraria: Tesouraria): Promise<{
        mensagem: string;
    }>;
    update(userId: number, tesouraria: Tesouraria): Promise<{
        mensagem: string;
    }>;
    delete(id: number, userId: number): Promise<{
        mensagem: string;
    }>;
}
