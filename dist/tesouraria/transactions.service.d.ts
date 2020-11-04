import { Entrada } from "src/shared/models/recipe.entity";
import { Saida } from "src/shared/models/expense.entity";
export declare class TransactionsService {
    constructor();
    updateBalance(recipes: Entrada[], expenses: Saida[], openingBalance: number): number;
    private updateRecipe;
    getTransactionsByMonth(year: number, month: number, recipes: Entrada[], expenses: Saida[]): any;
    private getIncome;
    getRecipeGeneral(recipes: Entrada[], expenses: Saida[], openingBalance: number, currentBalance: number): any;
    getHistoryYearly(year: number, openingBalance: number, recipes: Entrada[], expenses: Saida[]): any[];
    getIncomeYearly(year: number, recipes: Entrada[], expenses: Saida[]): any[];
    getReportMonthly(year: number, month: number, recipes: Entrada[], expenses: Saida[]): {
        recipes: Entrada[];
        expenses: Saida[];
        incomeRecipesMonthly: any;
        incomeExpensesMonthly: any;
        balanceMonthly: number;
    };
}
