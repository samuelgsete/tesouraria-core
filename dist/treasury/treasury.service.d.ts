import { Repository } from 'typeorm';
import { Treasury } from 'src/shared/models/treasury.entity';
import { SearchFilter } from 'src/shared/models/search-filter.entity';
export declare class TreasuryService {
    private repository;
    constructor(repository: Repository<Treasury>);
    findAll(userId: number, filter: SearchFilter): Promise<any>;
    finByName(name: string): Promise<Treasury>;
    getResume(id: number, userId: number): Promise<any>;
    save(treasury: Treasury): Promise<void>;
    update(userId: number, treasury: Treasury): Promise<void>;
    delete(id: number, userId: number): Promise<void>;
}
