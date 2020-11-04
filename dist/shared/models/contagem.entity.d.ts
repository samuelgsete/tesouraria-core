import { EntidadeBase } from "./entidade-base";
import { Tesouraria } from "./tesouraria.entity";
export declare class Contagem extends EntidadeBase {
    saldoReal: number;
    registradoEm: Date;
    tesouraria: Tesouraria;
    constructor(values?: Object);
}
