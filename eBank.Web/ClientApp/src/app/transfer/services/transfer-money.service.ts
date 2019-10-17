import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { TransferMoneySerializer } from '../models/transfer-money.serializer';
import { ITransferMoney } from '../interfaces/transfer-money.interface';
import { ResourceService } from '../../shared/services/resource.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferMoneyService extends ResourceService<ITransferMoney> {

  constructor(httpClient: HttpClient, public http: HttpClient) {
    super(
      httpClient,
      environment.baseUrl,
      'transfermoney',
      new TransferMoneySerializer());
  }

  getAccountsDropDown(customerId: number): Observable<any> {
    return this.http
      .get(environment.baseUrl + '/transfermoney/getaccountsdropdown/' + customerId);
  }
}
