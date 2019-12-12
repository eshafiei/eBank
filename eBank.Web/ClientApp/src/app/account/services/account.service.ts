import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

// local
import { ResourceService } from '../../shared/services/resource.service';
import { AccountSerializer } from '../models/account.serializer';
import { IAccount } from '../interfaces/account.interface';
import { Observable } from 'rxjs';

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

  getAccountsDropDown(userId: string): Observable<any> {
    return this.http.get(
      environment.baseUrl + '/bankAccount/getAccountsDropdown/' + userId
    );
  }

  getAccountById(accountId: number): Observable<any> {
    return this.http.get(
      environment.baseUrl + '/bankAccount/getAccountById/' + accountId
    );
  }
}
