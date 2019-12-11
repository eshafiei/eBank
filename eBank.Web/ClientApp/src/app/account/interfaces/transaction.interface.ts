export interface ITransaction {
    transactionId: number;
    transactionType: number;
    accountId: number;
    amount: number;
    date: Date;
    note: string;
}
