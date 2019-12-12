import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { ITransaction } from '../../interfaces/transaction.interface';
import { TransactionType } from 'src/app/account/enums/transaction-type.enum';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-account-transactions',
  templateUrl: './account-transactions.component.html',
  styleUrls: ['./account-transactions.component.scss']
})
export class AccountTransactionsComponent implements OnInit, OnChanges {
  @Input() accountTransactions: ITransaction[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;
  transactionType = TransactionType;
  displayedColumns: string[] = [
    'transactionType',
    'transactionDate',
    'amount',
    'note'
  ];
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['accountTransactions'].currentValue !==
        changes['accountTransactions'].previousValue) {
          if (this.accountTransactions) {
            this.dataSource = new MatTableDataSource(this.accountTransactions);
            this.dataSource.paginator = this.paginator;
          }
    }
  }
}
