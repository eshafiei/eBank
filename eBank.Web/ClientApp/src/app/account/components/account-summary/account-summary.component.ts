import { Component, OnInit, Input } from '@angular/core';

import { AccountType } from '../../../shared/enums/account-type.enum';
import { IAccount } from '../../interfaces/account.interface';

@Component({
  selector: 'app-account-summary',
  styleUrls: ['./account-summary.component.scss'],
  templateUrl: './account-summary.component.html'
})
export class AccountSummaryComponent implements OnInit {
  isExpanded: boolean;
  @Input() accountsInfo: IAccount[] = [];

  accountType = AccountType;

  constructor() {}

  ngOnInit() {
    this.isExpanded = true;
  }
}
