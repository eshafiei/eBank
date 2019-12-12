import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// local components
import { TransferMoneyComponent } from './containers/transfer-money/transfer-money.component';
import { TransferBasicComponent } from './components/transfer-basic/transfer-basic.component';
import { TransferReviewComponent } from './components/transfer-review/transfer-review.component';

// local services
import { AuthGuardService as AuthGuard } from './../authentication/services/auth-guard.service';
import { SharedModule } from '../shared/shared.module';
import { TransferMoneyService } from './services/transfer-money.service';

const routes: Routes = [
  { path: 'transfer', component: TransferMoneyComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    TransferMoneyComponent,
    TransferBasicComponent,
    TransferReviewComponent
  ],
  providers: [
    TransferMoneyService
  ]
})
export class TransferModule { }
