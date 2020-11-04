import { EntityBase } from "./entity-base.entity";
import { Treasury } from "./treasury.entity";
export declare class Inventory extends EntityBase {
    actualBalance: number;
    currentBalance: number;
    discrepancy: number;
    registeredIn: Date;
    treasury: Treasury;
    constructor(values?: Object);
}
