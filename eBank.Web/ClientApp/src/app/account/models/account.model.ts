import { IAccount } from '../interfaces/account.interface';

export class Account implements IAccount {
    accountId?: number;
    accountNumber: number;
    accountType: number;
    balance: number;
    accountStatus: boolean;
    id: string;
    parentId?: number;
    maskedAccountNumber: string;
}
