import { Component, OnInit, Input } from '@angular/core';

import { AccountType } from '../../models/account-type.enum';
import { Account } from '../../models/Account.interface';
import { AppBarService } from './../../../shared/services/app-bar.service';
import { CommandBarItem } from 'src/app/shared/models/command-bar-item.interface';

@Component({
  selector: 'app-account-summary',
  styleUrls: ['./account-summary.component.scss'],
  templateUrl: './account-summary.component.html'
})
export class AccountSummaryComponent implements OnInit {

  @Input()
  accountsInfo: Account[] = [];

  accountType = AccountType;

  constructor(private appBar: AppBarService) { }

  ngOnInit() {
    const commandBarButtons: CommandBarItem[] = [
      {
        title: 'Transfer Money',
        icon: 'swap_horiz'
      },
      {
        title: 'Pay Bills',
        icon: 'money'
      },
      {
        title: 'Account Services',
        icon: 'work'
      }
    ];
    this.appBar.updateAppBar(commandBarButtons);
  }
}

