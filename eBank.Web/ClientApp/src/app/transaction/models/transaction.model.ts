import { ITransaction } from './../interfaces/transaction.interface';

export class Transaction implements ITransaction {
    transactionId: number;
    transactionType: number;
    accountId: number;
    amount: number;
    transactionDate: Date;
    note: string;
    id: number;
    parentId?: number;
}
