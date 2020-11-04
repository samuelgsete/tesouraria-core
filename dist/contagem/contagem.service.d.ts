import { Repository } from 'typeorm';
import { Contagem } from 'src/shared/models/contagem.entity';
import { FiltroBusca } from 'src/shared/models/filtro-busca';
export declare class ContagemService {
    private repository;
    constructor(repository: Repository<Contagem>);
    findPaginate(filtro: FiltroBusca): Promise<any>;
    findById(id: number): Promise<Contagem>;
    findAllByIdCaixa(caixaId: number): Promise<any>;
    save(contagem: Contagem): Promise<{
        mensagem: string;
    }>;
    update(contagem: Contagem): Promise<{
        mensagem: string;
    }>;
    delete(id: number): Promise<{
        mensagem: string;
    }>;
}
