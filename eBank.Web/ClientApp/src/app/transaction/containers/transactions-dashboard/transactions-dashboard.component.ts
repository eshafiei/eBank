import { Component, OnInit } from '@angular/core';
import { ITransaction } from '../../interfaces/transaction.interface';
import { ActivatedRoute } from '@angular/router';
import { TransactionsService } from './../../services/transactions.service';
import { TransactionType } from 'src/app/account/enums/transaction-type.enum';
import { AccountService } from './../../../account/services/account.service';
import { IAccount } from 'src/app/account/interfaces/account.interface';
import { forkJoin } from 'rxjs';
import { AccountType } from 'src/app/shared/enums/account-type.enum';

@Component({
  selector: 'app-transactions-dashboard',
  templateUrl: './transactions-dashboard.component.html',
  styleUrls: ['./transactions-dashboard.component.scss']
})
export class TransactionsDashboardComponent implements OnInit {
  accountInfo: IAccount;
  accountType = AccountType;
  allAccountTransactions: ITransaction[];
  depositAccountTransactions: ITransaction[];
  withdrawAccountTransactions: ITransaction[];
  accountId: number;
  constructor(
    private accountService: AccountService,
    private transactionsService: TransactionsService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.accountId = this.activatedRoute.snapshot.params.id;

    forkJoin([
      this.accountService.getAccountById(this.accountId),
      this.transactionsService.list(this.accountId)])
      .subscribe(([account, transactions]) => {
        this.accountInfo = account;
        this.allAccountTransactions = transactions;
        this.depositAccountTransactions = this.allAccountTransactions
          .filter(t => t.transactionType === TransactionType.Deposit);
        this.withdrawAccountTransactions = this.allAccountTransactions
          .filter(t => t.transactionType === TransactionType.Withdraw);
      });
  }
}
