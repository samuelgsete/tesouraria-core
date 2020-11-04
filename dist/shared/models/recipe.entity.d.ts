import { Treasury } from "./treasury.entity";
import { EntityBase } from "./entity-base.entity";
import { TransactionType } from "./enums/transaction-type.enum";
export declare class Recipe extends EntityBase {
    description: string;
    value: number;
    offerer: string;
    readonly type: TransactionType;
    registeredIn: Date;
    details: string;
    treasury: Treasury;
    constructor(values?: Object);
}
