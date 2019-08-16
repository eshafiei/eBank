import { Component, OnInit } from '@angular/core';

import { AccountService } from './../services/account.service';
import { IAccount } from '../models/Account.interface';

@Component({
    selector: 'accounts-dashboard',
    styleUrls: ['./accounts-dashboard.component.scss'],
    templateUrl: './accounts-dashboard.component.html'
})
export class AccountsDashboardComponent implements OnInit {
    
    accountsInfo: IAccount[];

    constructor(private accountService: AccountService) {

    }

    ngOnInit() {
      //this.accountService.createAccount();
      this.accountService.getAccounts(1)
        .subscribe((data: IAccount[]) => {
          this.accountsInfo = data;
        });
        
    }
}
