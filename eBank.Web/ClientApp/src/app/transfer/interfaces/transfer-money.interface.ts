import { Resource } from '../../shared/interfaces/resource.interface';

export interface ITransferMoney extends Resource {
    transferId: number;
    originAccount: number;
    destinationAccount: number;
    frequency: number;
    transferDate: Date;
    amount: number;
    note: string;
}
