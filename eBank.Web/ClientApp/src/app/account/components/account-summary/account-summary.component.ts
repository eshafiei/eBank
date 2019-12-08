import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { AccountType } from '../../../shared/enums/account-type.enum';
import { IAccount } from '../../interfaces/account.interface';

@Component({
  selector: 'app-account-summary',
  styleUrls: ['./account-summary.component.scss'],
  templateUrl: './account-summary.component.html'
})
export class AccountSummaryComponent implements OnInit, OnChanges {
  @Input() accountsInfo: IAccount[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  isExpanded: boolean;
  dataSource: any;
  accountType = AccountType;
  displayedColumns: string[] = [
    'accountType',
    'accountNumber',
    'balance'
  ];

  constructor() {}

  ngOnInit() {
    this.isExpanded = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['accountsInfo'].currentValue !==
      changes['accountsInfo'].previousValue
    ) {
      if (this.accountsInfo) {
        this.dataSource = new MatTableDataSource(this.accountsInfo);
        this.dataSource.paginator = this.paginator;
      }
    }
  }
}
