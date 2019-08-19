import { Component, OnInit } from '@angular/core';

import { AccountService } from './../services/account.service';
import { Account } from '../models/Account.interface';

@Component({
    selector: 'accounts-dashboard',
    styleUrls: ['./accounts-dashboard.component.scss'],
    templateUrl: './accounts-dashboard.component.html'
})
export class AccountsDashboardComponent implements OnInit {
    
    accountsInfo: Account[] = [];

    constructor(private accountService: AccountService) {
    }

    ngOnInit() {
      const userId = 1;
      this.accountService.getAccounts(userId)
                         .subscribe((accountsInfo: Account[]) => this.accountsInfo = accountsInfo);
    }
}