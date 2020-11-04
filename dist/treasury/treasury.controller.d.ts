import { Request } from 'express';
import { TreasuryService } from './treasury.service';
import { Treasury } from 'src/shared/models/treasury.entity';
export declare class TreasuryController {
    private readonly service;
    constructor(service: TreasuryService);
    findPaginete(filter: any, page: any, request: Request): Promise<any[]>;
    getRecipes(id: number, request: Request): Promise<any>;
    create(treasury: Treasury, request: Request): Promise<void>;
    update(treasury: Treasury, request: Request): Promise<void>;
    delete(id: number, request: Request): Promise<void>;
}
