import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// local components

import { AccountSummaryComponent } from './components/account-summary/account-summary.component';
import { NewAccountComponent } from './containers/new-account/new-account.component';
import { AccountDashboardComponent } from './containers/account-dashboard/account-dashboard.component';
import { NewAccountDetailsComponent } from './components/new-account-details/new-account-details.component';
import { AccountTermsComponent } from './components/account-terms/account-terms.component';
import { CloseAccountComponent } from './containers/close-account/close-account.component';
import { DepositComponent } from './containers/deposit/deposit.component';
import { WithdrawComponent } from './containers/withdraw/withdraw.component';
import { AccountDetailsComponent } from './containers/account-details/account-details.component';
import { AccountTransactionsComponent } from './components/account-transactions/account-transactions.component';

// local services & modules
import { AccountService } from './services/account.service';
import { AuthGuardService as AuthGuard } from './../authentication/services/auth-guard.service';
import { SharedModule } from '../shared/shared.module';

const routes = [
  { path: 'account', component: AccountDashboardComponent, canActivate: [AuthGuard] },
  { path: 'createaccount', component: NewAccountComponent, canActivate: [AuthGuard] },
  { path: 'closeaccount', component: CloseAccountComponent, canActivate: [AuthGuard] },
  { path: 'deposit', component: DepositComponent, canActivate: [AuthGuard] },
  { path: 'withdraw', component: WithdrawComponent, canActivate: [AuthGuard] },
  { path: 'account/:id', component: AccountDetailsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AccountDashboardComponent,
    AccountSummaryComponent,
    NewAccountComponent,
    NewAccountDetailsComponent,
    AccountTermsComponent,
    CloseAccountComponent,
    DepositComponent,
    WithdrawComponent,
    AccountDetailsComponent,
    AccountTransactionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [AccountService, AuthGuard],
  exports: []
})
export class AccountModule {}
