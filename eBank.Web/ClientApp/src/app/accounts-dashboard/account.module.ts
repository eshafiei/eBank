import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// angular material modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';

// local components

import { AccountSummaryComponent } from './components/account-summary/account-summary.component';
import { AddAccountComponent } from './components/add-account/add-account.component';
import { AccountDashboardComponent } from './containers/account-dashboard/account-dashboard.component';

// local services & modules
import { AccountService } from './services/account.service';
import { SharedModule } from '../shared/modules/shared.module';


@NgModule({
  declarations: [
    AccountDashboardComponent,
    AccountSummaryComponent,
    AddAccountComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'account', component: AccountDashboardComponent },
      { path: 'createaccount', component: AddAccountComponent }
    ]),
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule
  ],
  providers: [
    AccountService
  ],
  exports: []
})
export class AccountModule {
}
