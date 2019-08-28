import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// local components
import { Account } from '../../models/Account.interface';
import { CommandBarItem } from 'src/app/shared/models/command-bar-item.interface';

// local services
import { AccountService } from '../../services/account.service';
import { AppBarService } from 'src/app/shared/services/app-bar.service';

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
      const userId = 1;
      this.accountsInfo = this.accountService.getAccounts(userId);
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
