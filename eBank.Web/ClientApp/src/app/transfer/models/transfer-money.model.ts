import { ITransferMoney } from '../interfaces/transfer-money.interface';

export class TransferMoney implements ITransferMoney {
    id: number;
    transferId: number;
    originAccount: number;
    destinationAccount: number;
    frequency: number;
    transferDate: Date;
    amount: number;
    note: string;
}
