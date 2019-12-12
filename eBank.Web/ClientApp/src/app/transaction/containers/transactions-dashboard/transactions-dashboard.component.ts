import { Component, OnInit } from '@angular/core';
import { ITransaction } from '../../interfaces/transaction.interface';
import { ActivatedRoute } from '@angular/router';
import { TransactionsService } from './../../services/transactions.service';

@Component({
  selector: 'app-transactions-dashboard',
  templateUrl: './transactions-dashboard.component.html',
  styleUrls: ['./transactions-dashboard.component.scss']
})
export class TransactionsDashboardComponent implements OnInit {
  accountTransactions: ITransaction[];
  accountId: number;
  constructor(private transactionsService: TransactionsService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.accountId = this.activatedRoute.snapshot.params.id;
    this.transactionsService.list(this.accountId)
      .subscribe(data => this.accountTransactions = data);
  }

}
