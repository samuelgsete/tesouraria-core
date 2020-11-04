import { Entrada } from "src/shared/models/entrada.entity";
import { Saida } from "src/shared/models/saida.entity";
export declare class Relatorio {
    nomeCaixa: string;
    saldoInicial: number;
    saldoAtual: number;
    saldoMensal: number;
    totalEntradas: number;
    totalSaidas: number;
    entradas: Entrada[];
    saidas: Saida[];
    constructor(values?: Object);
    calcularSaldoDoMes(): void;
}
