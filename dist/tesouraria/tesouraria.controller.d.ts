import { Request } from 'express';
import { TesourariaService } from './tesouraria.service';
import { Tesouraria } from 'src/shared/models/treasury.entity';
export declare class TesourariaController {
    private service;
    constructor(service: TesourariaService);
    findPaginete(filtro: any, page: any, request: Request): Promise<any[]>;
    findById(id: number, request: Request): Promise<Tesouraria>;
    getReport(id: number, ano: number, mes: number, request: Request): Promise<any[]>;
    getHistory(id: number, ano: number, request: Request): Promise<any[]>;
    getRecipes(id: number, request: Request): Promise<any>;
    create(tesouraria: Tesouraria, request: Request): Promise<{
        mensagem: string;
    }>;
    update(tesouraria: Tesouraria, request: Request): Promise<{
        mensagem: string;
    }>;
    delete(id: number, request: Request): Promise<{
        mensagem: string;
    }>;
}
