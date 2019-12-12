import { Serializer } from '../../shared/interfaces/serializer.interface';
import { ITransaction } from './../interfaces/transaction.interface';
import { Transaction } from './transaction.model';

export class TransactionsSerializer implements Serializer<ITransaction> {
    fromJson(json: any): Transaction {
        const transaction = new Transaction();
        transaction.id = json.id;
        transaction.transactionId = json.transactionId;
        transaction.transactionType = json.transactionType;
        transaction.accountId = json.accountId;
        transaction.transactionDate = json.transactionDate;
        transaction.amount = json.amount;
        transaction.note = json.note;
        return transaction;
    }

    toJson(transaction: Transaction) {
        return {
            id: transaction.id,
            transactionId: transaction.transactionId,
            transactionType: transaction.transactionType,
            accountId: transaction.accountId,
            transactionDate: transaction.transactionDate,
            amount: transaction.amount,
            note: transaction.note
        };
    }
}
