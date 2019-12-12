import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsDashboardComponent } from './containers/transactions-dashboard/transactions-dashboard.component';
import { AuthGuardService as AuthGuard } from './../authentication/services/auth-guard.service';
import { AccountTransactionsComponent } from './components/account-transactions/account-transactions.component';
import { TransactionsService } from './services/transactions.service';
import { DepositComponent } from './containers/deposit/deposit.component';
import { WithdrawComponent } from './containers/withdraw/withdraw.component';

const routes: Routes = [
  { path: 'deposit', component: DepositComponent, canActivate: [AuthGuard] },
  { path: 'withdraw', component: WithdrawComponent, canActivate: [AuthGuard] },
  { path: 'account/:id', component: TransactionsDashboardComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    TransactionsDashboardComponent,
    AccountTransactionsComponent,
    DepositComponent,
    WithdrawComponent
  ],
  providers: [
    TransactionsService
  ]
})
export class TransactionModule { }
