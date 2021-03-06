import { Request } from 'express';
import { TransactionsService } from './transactions.service';
import { Recipe } from 'src/shared/models/recipe.entity';
import { Expense } from 'src/shared/models/expense.entity';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    findPaginate(treasuryId: number, request: Request, year: number, month: number, type: string, page: number): Promise<{
        data: (Recipe | Expense)[];
        count: number;
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
