import { Saida } from "./saida.entity";
import { Entrada } from "./entrada.entity";
import { EntidadeBase } from "./entidade-base";
import { Contagem } from "./contagem.entity";
export declare class Tesouraria extends EntidadeBase {
    nome: string;
    saldoInicial: number;
    saldoAtual: number;
    detalhes: string;
    userId: number;
    saidas: Saida[];
    entradas: Entrada[];
    contagens: Contagem[];
    constructor(values?: Object);
}
