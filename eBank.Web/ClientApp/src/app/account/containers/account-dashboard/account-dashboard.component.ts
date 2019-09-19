import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// local services & interfaces
import { AccountService } from '../../services/account.service';
import { AppBarService } from '../../../shared/services/app-bar.service';
import { Account } from '../../models/account.interface';
import { CommandBarItem } from '../../../shared/models/command-bar-item.interface';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../../../shared/store/app.states';

@Component({
    selector: 'app-account-dashboard',
    styleUrls: ['./account-dashboard.component.scss'],
    templateUrl: './account-dashboard.component.html'
})
export class AccountDashboardComponent implements OnInit {
    accountsInfo: Observable<Account[]>;
    commandBarButtons: CommandBarItem[] = [];
    getState: Observable<any>;
    isAuthenticated: false;
    user = null;
    errorMessage = null;
    constructor(private accountService: AccountService,
                private appBar: AppBarService,
                private store: Store<AppState>) {
                  this.getState = this.store.select(selectAuthState);
    }

    ngOnInit() {
      const customerId = 7;
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
      this.getState.subscribe((state) => {
        this.isAuthenticated = state.isAuthenticated;
        this.user = state.user;
        this.errorMessage = state.errorMessage;
      });
    }
}
