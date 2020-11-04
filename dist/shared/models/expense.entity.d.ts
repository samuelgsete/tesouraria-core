import { Treasury } from "./treasury.entity";
import { EntityBase } from "./entity-base.entity";
import { TransactionType } from "./enums/transaction-type.enum";
export declare class Expense extends EntityBase {
    description: string;
    value: number;
    registeredIn: Date;
    details: string;
    readonly type: TransactionType;
    treasury: Treasury;
    constructor(values?: Object);
}
