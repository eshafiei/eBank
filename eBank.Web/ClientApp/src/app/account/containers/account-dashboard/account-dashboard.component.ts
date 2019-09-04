import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// local services & interfaces
import { AccountService } from '../../services/account.service';
import { AppBarService } from 'src/app/shared/services/app-bar.service';
import { Account } from '../../models/account.interface';
import { CommandBarItem } from 'src/app/shared/models/command-bar-item.interface';

@Component({
    selector: 'app-account-dashboard',
    styleUrls: ['./account-dashboard.component.scss'],
    templateUrl: './account-dashboard.component.html'
})
export class AccountDashboardComponent implements OnInit {
    accountsInfo: Observable<Account[]>;
    commandBarButtons: CommandBarItem[] = [];
    constructor(private accountService: AccountService,
                private appBar: AppBarService) {
    }

    ngOnInit() {
      const customerId = 3;
      this.accountsInfo = this.accountService.getAccounts(customerId);
      const commandBarButtons: CommandBarItem[] = [
        {
          title: 'Account Summary',
          icon: 'list',
          route: '/account'
        },
        {
          title: 'Transfer Money',
          icon: 'swap_horiz',
          route: '/transfer'
        },
        {
          title: 'Pay Bills',
          icon: 'money',
          route: '/billpay'
        },
        {
          title: 'Account Services',
          icon: 'work',
          route: '/accountservices'
        }
      ];
      this.appBar.updateAppBar(commandBarButtons);
    }
}
