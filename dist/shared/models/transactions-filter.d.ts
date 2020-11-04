import { TransactionType } from "./enums/transaction-type.enum";
export declare class TransactionsFilter {
    year: number;
    month: number;
    type: TransactionType;
    constructor(values?: Object);
}
