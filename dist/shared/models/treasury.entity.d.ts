import { Expense } from "./expense.entity";
import { Recipe } from "./recipe.entity";
import { EntityBase } from "./entity-base.entity";
export declare class Treasury extends EntityBase {
    name: string;
    initialAmount: number;
    currentBalance: number;
    incomeRecipes: number;
    incomeExpenses: number;
    countSale: number;
    countOffer: number;
    countTaxpayer: number;
    countOther: number;
    details: string;
    userId: number;
    expenses: Expense[];
    recipes: Recipe[];
    updated: Date;
    constructor(values?: Object);
}
