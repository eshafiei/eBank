import { Resource } from '../../shared/interfaces/resource.interface';

export interface ITransaction extends Resource {
    transactionId: number;
    transactionType: number;
    accountId: number;
    amount: number;
    transactionDate: Date;
    note: string;
}
