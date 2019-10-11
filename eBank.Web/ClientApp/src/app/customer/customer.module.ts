import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// local components
import { AddEditCustomerComponent } from './containers/add-edit-customer/add-edit-customer.component';
import { CustomerBasicComponent } from './components/customer-basic/customer-basic.component';

// local services & modules
import { SharedModule } from '../shared/shared.module';
import { CustomerService } from './services/customer.service';
import { AuthGuardService as AuthGuard } from './../authentication/services/auth-guard.service';

const routes = [
  {
    path: 'customer/addcustomer',
    component: AddEditCustomerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'customer/updatecustomer/:id',
    component: AddEditCustomerComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  declarations: [CustomerBasicComponent, AddEditCustomerComponent],
  providers: [CustomerService]
})
export class CustomerModule {}
