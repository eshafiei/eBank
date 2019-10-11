import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

// local
import { ResourceService } from '../../shared/services/resource.service';
import { ICustomer } from '../interfaces/customer.interface';
import { CustomerSerializer } from '../models/customer.serializer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends ResourceService<ICustomer> {
  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      environment.baseUrl,
      'customer',
      new CustomerSerializer());
  }
}
