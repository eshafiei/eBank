import { Component, OnInit, Input } from '@angular/core';

import { AccountType } from '../../models/account-type.enum';
import { IAccount } from '../../models/Account.interface';

@Component({
  selector: 'account-summary',
  styleUrls: ['./account-summary.component.scss'],
  templateUrl: './account-summary.component.html'
})
export class AccountSummaryComponent implements OnInit {

  @Input()
  accountsInfo: IAccount[];

  accountType = AccountType;

  constructor() { }

  ngOnInit() {}
}

