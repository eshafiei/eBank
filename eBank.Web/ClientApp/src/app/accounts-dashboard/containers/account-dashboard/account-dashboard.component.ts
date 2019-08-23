import { Component, OnInit } from '@angular/core';

import { AccountService } from '../../services/account.service';
import { Account } from '../../models/Account.interface';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-account-dashboard',
    styleUrls: ['./account-dashboard.component.scss'],
    templateUrl: './account-dashboard.component.html'
})
export class AccountDashboardComponent implements OnInit {
    accountsInfo: Observable<Account[]>;

    constructor(private accountService: AccountService) {
    }

    ngOnInit() {
      const userId = 1;
      this.accountsInfo = this.accountService.getAccounts(userId);
    }
}
