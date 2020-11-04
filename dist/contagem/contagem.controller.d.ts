import { ContagemService } from './contagem.service';
import { Contagem } from 'src/shared/models/contagem.entity';
export declare class ContagemController {
    private service;
    constructor(service: ContagemService);
    findPaginete(page: any): Promise<any[]>;
    findById(id: number): Promise<Contagem>;
    findByIdCaixa(id: number): Promise<any>;
    create(contagem: Contagem): Promise<{
        mensagem: string;
    }>;
    update(contagem: Contagem): Promise<{
        mensagem: string;
    }>;
    delete(id: number): Promise<{
        mensagem: string;
    }>;
}
