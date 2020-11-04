import { Repository } from "typeorm/repository/Repository";
import { Treasury } from "src/shared/models/treasury.entity";
import { Recipe } from "src/shared/models/recipe.entity";
import { Expense } from "src/shared/models/expense.entity";
import { TransactionsFilter } from "src/shared/models/transactions-filter.entity";
export declare class TransactionsService {
    private readonly repositoryTreasury;
    private readonly repositoryRecipe;
    private readonly repositoryExpense;
    constructor(repositoryTreasury: Repository<Treasury>, repositoryRecipe: Repository<Recipe>, repositoryExpense: Repository<Expense>);
    findAll(treasuryId: number, userId: number, transactionsFilter: TransactionsFilter): Promise<{
        recipes: any[];
        expenses: any[];
    }>;
    createRecipe(treasuryId: number, userId: number, recipe: Recipe): Promise<void>;
    updateRecipe(treasuryId: number, userId: number, recipeUpdated: Recipe): Promise<void>;
    deleteRecipe(treasuryId: number, userId: number, recipeId: number): Promise<{
        message: string;
    }>;
    createExpense(treasuryId: number, userId: number, expense: Expense): Promise<void>;
    updateExpense(treasuryId: number, userId: number, expenseUpdated: Expense): Promise<void>;
    deleteExpense(treasuryId: number, userId: number, expenseId: number): Promise<any>;
    private validateUser;
    private filterTransactions;
}
