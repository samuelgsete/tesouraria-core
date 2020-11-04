import { Expense } from "./expense.entity";
import { Recipe } from "./recipe.entity";
import { EntityBase } from "./entity-base.entity";
import { Inventory } from "./inventory.entity";
export declare class Treasury extends EntityBase {
    name: string;
    initialAmount: number;
    currentBalance: number;
    incomeRecipes: number;
    incomeExpenses: number;
    details: string;
    userId: number;
    expenses: Expense[];
    recipes: Recipe[];
    updated: Date;
    inventories: Inventory[];
    constructor(values?: Object);
}
