import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

// local
import { ResourceService } from '../../shared/services/resource.service';
import { AccountSerializer } from '../models/account.serializer';
import { IAccount } from '../interfaces/account.interface';
import { Observable } from 'rxjs';
import { IDeposit } from './../interfaces/deposit.interface';
import { IWithdraw } from '../interfaces/withdraw.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends ResourceService<IAccount> {
  constructor(httpClient: HttpClient, public http: HttpClient) {
    super(
      httpClient,
      environment.baseUrl,
      'bankAccount',
      new AccountSerializer()
    );
  }

  getAccountsDropDown(customerId: number): Observable<any> {
    return this.http.get(
      environment.baseUrl + '/bankAccount/getaccountsdropdown/' + customerId
    );
  }

  deposit(deposit: IDeposit): Observable<any> {
    const url = `${environment.baseUrl}/bankaccount/deposit`;
    return this.http.post<IDeposit>(url, deposit);
  }

  withdraw(withdraw: IWithdraw): Observable<any> {
    const url = `${environment.baseUrl}/bankaccount/withdraw`;
    return this.http.post<IDeposit>(url, withdraw);
  }
}
