import { Component, OnInit } from '@angular/core';

import { AccountService } from './../services/account.service';
import { Account } from '../models/Account.interface';
import { Observable } from 'rxjs';

@Component({
    selector: 'accounts-dashboard',
    styleUrls: ['./accounts-dashboard.component.scss'],
    templateUrl: './accounts-dashboard.component.html'
})
export class AccountsDashboardComponent implements OnInit {
    
    accountsInfo: Observable<Account[]>;

    constructor(private accountService: AccountService) {
    }

    ngOnInit() {
      const userId = 1;
      this.accountsInfo = this.accountService.getAccounts(userId);
    }
}