import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// local components
import { AccountsDashboardComponent } from './containers/accounts-dashboard.component';
import { AccountSummaryComponent } from './components/account-summary/account-summary.component';

@NgModule({
    declarations: [
        AccountsDashboardComponent,
        AccountSummaryComponent],
    imports: [
        CommonModule,
        RouterModule.forRoot([
            { path: 'account', component: AccountsDashboardComponent }
        ])
    ],
    exports: []
})
export class AccountsModule {

}
