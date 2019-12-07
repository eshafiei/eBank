import { Component, OnInit } from '@angular/core';
// local services & interfaces
import { AccountService } from '../../services/account.service';
import { IAccount } from '../../interfaces/account.interface';

@Component({
    selector: 'app-account-dashboard',
    styleUrls: ['./account-dashboard.component.scss'],
    templateUrl: './account-dashboard.component.html'
})
export class AccountDashboardComponent implements OnInit {
    accountsInfo: IAccount[];
    constructor(private accountService: AccountService) {
    }

    ngOnInit() {
      const userId = localStorage.getItem('userId');
      this.accountService.list(userId)
                         .subscribe(data => this.accountsInfo = data);
    }
}

