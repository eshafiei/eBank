import { Serializer } from '../../shared/interfaces/serializer.interface';
import { ITransferMoney } from '../interfaces/transfer-money.interface';
import { TransferMoney } from './transfer-money.model';


export class TransferMoneySerializer implements Serializer<ITransferMoney> {
    fromJson(json: any): TransferMoney {
        const transfer = new TransferMoney();
        transfer.id = json.id;
        transfer.transferId = json.transferId;
        transfer.originAccount = json.originAccount;
        transfer.destinationAccount = json.destinationAccount;
        transfer.frequency = json.frequency;
        transfer.transferDate = json.transferDate;
        transfer.amount = json.amount;
        transfer.note = json.note;
        return transfer;
    }

    toJson(transfer: TransferMoney) {
        return {
            id: transfer.id,
            transferId: transfer.transferId,
            originAccount: transfer.originAccount,
            destinationAccount: transfer.destinationAccount,
            frequency: transfer.frequency,
            transferDate: transfer.transferDate,
            amount: transfer.amount,
            note: transfer.note
        };
    }
}
