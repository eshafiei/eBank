import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IAddress } from '../interfaces/address.interface';
import { environment } from '../../../environments/environment';
import { AddressSerializer } from '../models/address.serializer';
import { SubResourceService } from './subresource.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService extends SubResourceService<IAddress> {

  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      environment.baseUrl,
      'customer',
      'address',
      new AddressSerializer());
  }

}
