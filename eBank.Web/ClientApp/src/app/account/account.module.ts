import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, CanActivate } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// local components

import { AccountSummaryComponent } from './components/account-summary/account-summary.component';
import { NewAccountComponent } from './containers/new-account/new-account.component';
import { AccountDashboardComponent } from './containers/account-dashboard/account-dashboard.component';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { AccountTermsComponent } from './components/account-terms/account-terms.component';

// local services & modules
import { AccountService } from './services/account.service';
import { AuthGuardService as AuthGuard } from './../authentication/services/auth-guard.service';
import { SharedModule } from '../shared/shared.module';

const routes = [
  { path: 'account', component: AccountDashboardComponent, canActivate: [AuthGuard] },
  { path: 'createaccount', component: NewAccountComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AccountDashboardComponent,
    AccountSummaryComponent,
    NewAccountComponent,
    AccountDetailComponent,
    AccountTermsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [
    AccountService,
    AuthGuard
  ],
  exports: []
})
export class AccountModule {
}
