import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// local components
import { AccountsDashboardComponent } from './containers/accounts-dashboard.component';
import { AccountSummaryComponent } from './components/account-summary/account-summary.component';
import { AddAccountComponent } from './components/add-account/add-account.component';

// local services
import { AccountService } from './services/account.service';

@NgModule({
  declarations: [
    AccountsDashboardComponent,
    AccountSummaryComponent,
    AddAccountComponent
  ],
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'account', component: AccountsDashboardComponent },
      { path: 'createaccount', component: AddAccountComponent }
    ])
  ],
  providers: [
    AccountService
  ],
  exports: []
})
export class AccountsModule {

}
