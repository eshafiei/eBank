import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

// local components
import { AccountsDashboardComponent } from './containers/accounts-dashboard.component';
import { AccountSummaryComponent } from './components/account-summary/account-summary.component';
import { AccountService } from './services/account.service';

@NgModule({
  declarations: [
    AccountsDashboardComponent,
    AccountSummaryComponent],
  imports: [
    CommonModule,
    HttpModule,
    RouterModule.forChild([
      { path: 'account', component: AccountsDashboardComponent }
    ])
  ],
  providers: [
    AccountService
  ],
  exports: []
})
export class AccountsModule {

}
