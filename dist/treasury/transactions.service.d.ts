import { Recipe } from "src/shared/models/recipe.entity";
import { Expense } from "src/shared/models/expense.entity";
import { TransactionsFilter } from 'src/shared/models/transactions-filter.entity';
export declare class TransactionsService {
    constructor();
    updateBalance(recipes: Recipe[], expenses: Expense[], initialAmount: number): number;
    private updateRecipe;
    getTransactionsByMonth(year: number, month: number, recipes: Recipe[], expenses: Expense[]): any;
    getIncome(recipes: Recipe[], expenses: Expense[]): any;
    getHistoryYearly(year: number, initialAmount: number, recipes: Recipe[], expenses: Expense[]): any[];
    getIncomeYearly(year: number, recipes: Recipe[], expenses: Expense[]): any[];
    getReportMonthly(year: number, month: number, recipes: Recipe[], expenses: Expense[]): {
        recipes: Recipe[];
        expenses: Expense[];
        incomeRecipesMonthly: any;
        incomeExpensesMonthly: any;
        balanceMonthly: number;
    };
    filterTransactions(transactionsFilter: TransactionsFilter, recipes: Recipe[], expenses: Expense[]): {
        filteredRecipes: any[];
        filteredExpenses: any[];
    };
}
