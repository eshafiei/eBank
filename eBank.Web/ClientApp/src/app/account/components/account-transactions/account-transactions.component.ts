import { Component, OnInit, Input } from '@angular/core';
import { ITransaction } from './../../interfaces/transaction.interface';

@Component({
  selector: 'app-account-transactions',
  templateUrl: './account-transactions.component.html',
  styleUrls: ['./account-transactions.component.scss']
})
export class AccountTransactionsComponent implements OnInit {
  @Input() accountTransactions: ITransaction[] = [];

  constructor() { }

  ngOnInit() {
  }

}
