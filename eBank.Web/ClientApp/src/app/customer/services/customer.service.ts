import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// local
import { CustomerViewModel } from '../../customer/view-models/customer-vm.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) { }

  getCustomer(customerId: number): Observable<CustomerViewModel> {
    return this.http
              .get<CustomerViewModel>(this.baseUrl + 'api/customer/getcustomer/' + customerId);
  }

  updateCustomer(customerModel: CustomerViewModel): Observable<any> {
    return this.http.post(this.baseUrl + 'api/customer/updatecustomer', customerModel);
  }

}
