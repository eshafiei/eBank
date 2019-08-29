import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// angular material modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';

// local components

import { AccountSummaryComponent } from './components/account-summary/account-summary.component';
import { NewAccountComponent } from './containers/new-account/new-account.component';
import { AccountDashboardComponent } from './containers/account-dashboard/account-dashboard.component';
import { CustomerPersonalInformationComponent } from './components/customer-personal-information/customer-personal-information.component';
import { CustomerAccountInformationComponent } from './components/customer-account-information/customer-account-information.component';
import { AccountTermsComponent } from './components/account-terms/account-terms.component';

// local services & modules
import { AccountService } from './services/account.service';
import { SharedModule } from '../shared/modules/shared.module';


@NgModule({
  declarations: [
    AccountDashboardComponent,
    AccountSummaryComponent,
    NewAccountComponent,
    CustomerPersonalInformationComponent,
    CustomerAccountInformationComponent,
    AccountTermsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'account', component: AccountDashboardComponent },
      { path: 'createaccount', component: NewAccountComponent }
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
