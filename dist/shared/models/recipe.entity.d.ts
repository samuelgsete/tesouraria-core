import { Treasury } from "./treasury.entity";
import { EntityBase } from "./entity-base.entity";
import { TransactionType } from "./enums/transaction-type.enum";
import { RecipeType } from "./enums/recipe-type.enum";
export declare class Recipe extends EntityBase {
    description: string;
    value: number;
    offerer: string;
    readonly type: TransactionType;
    recipeType: RecipeType;
    registeredIn: Date;
    details: string;
    treasury: Treasury;
    constructor(values?: Object);
}
