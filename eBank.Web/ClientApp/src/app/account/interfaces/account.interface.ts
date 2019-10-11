import { Resource } from '../../shared/interfaces/resource.interface';

export interface IAccount extends Resource {
    accountId?: number;
    accountNumber: number;
    accountType: number;
    balance: number;
    accountStatus: boolean;
    customerId: number;
}
