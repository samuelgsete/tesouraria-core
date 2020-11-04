import { Request } from 'express';
import { TransactionsService } from './transactions.service';
import { Recipe } from 'src/shared/models/recipe.entity';
import { Expense } from 'src/shared/models/expense.entity';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    findAll(treasuryId: number, request: Request, year: number, month: number, type: string): Promise<{
        recipes: any[];
        expenses: any[];
    }>;
    saveRecipe(treasuryId: number, request: Request, recipe: Recipe): Promise<void>;
    updateRecipe(treasuryId: number, request: Request, recipe: Recipe): Promise<void>;
    deleteRecipe(treasuryId: number, request: Request, id: number): Promise<{
        message: string;
    }>;
    saveExpense(treasuryId: number, request: Request, expense: Expense): Promise<void>;
    updateExpense(treasuryId: number, request: Request, expense: Expense): Promise<void>;
    deleteExpense(treasuryId: number, request: Request, id: number): Promise<any>;
}
