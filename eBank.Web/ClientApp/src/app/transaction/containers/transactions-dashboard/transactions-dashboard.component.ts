import { Component, OnInit } from '@angular/core';
import { ITransaction } from '../../interfaces/transaction.interface';
import { ActivatedRoute } from '@angular/router';
import { TransactionsService } from './../../services/transactions.service';
import { TransactionType } from 'src/app/account/enums/transaction-type.enum';

@Component({
  selector: 'app-transactions-dashboard',
  templateUrl: './transactions-dashboard.component.html',
  styleUrls: ['./transactions-dashboard.component.scss']
})
export class TransactionsDashboardComponent implements OnInit {
  allAccountTransactions: ITransaction[];
  depositAccountTransactions: ITransaction[];
  withdrawAccountTransactions: ITransaction[];
  accountId: number;
  constructor(private transactionsService: TransactionsService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.accountId = this.activatedRoute.snapshot.params.id;
    this.transactionsService.list(this.accountId)
      .subscribe(data => {
        this.allAccountTransactions = data;
        this.depositAccountTransactions = this.allAccountTransactions
          .filter(t => t.transactionType === TransactionType.Deposit);
        this.withdrawAccountTransactions = this.allAccountTransactions
          .filter(t => t.transactionType === TransactionType.Withdraw);
      });
  }

}
