import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// local components
import { AddEditCustomerComponent } from './containers/add-edit-customer/add-edit-customer.component';
import { CustomerDashboardComponent } from './containers/customer-dashboard/customer-dashboard.component';
import { CustomerBasicComponent } from './components/customer-basic/customer-basic.component';

// local services & modules
import { SharedModule } from '../shared/shared.module';
import { CustomerService } from './services/customer.service';

const routes = [
  { path: 'customer/addcustomer', component: AddEditCustomerComponent }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    CustomerDashboardComponent,
    CustomerBasicComponent,
    AddEditCustomerComponent
  ],
  providers: [
    CustomerService
  ]
})
export class CustomerModule { }
