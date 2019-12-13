import { Serializer } from '../../shared/interfaces/serializer.interface';
import { Account } from './account.model';
import { IAccount } from 'src/app/account/interfaces/account.interface';


export class AccountSerializer implements Serializer<IAccount> {
    fromJson(json: any): Account {
        const account = new Account();
        account.id = json.id;
        account.accountId = json.accountId;
        account.accountNumber = json.accountNumber;
        account.accountType = json.accountType;
        account.balance = json.balance;
        account.accountStatus = json.accountStatus;
        account.maskedAccountNumber = json.maskedAccountNumber;
        return account;
    }

    toJson(account: Account) {
        return {
            id: account.id,
            accountId: account.accountId,
            accountNumber: account.accountNumber,
            accountType: account.accountType,
            balance: account.balance,
            accountStatus: account.accountStatus,
            maskedAccountNumber: account.maskedAccountNumber
        };
    }
}
