import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransferMoneyService {

constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

getAccountsDropDown(customerId: number): Observable<any> {
  return  this.http
              .get(this.baseUrl + 'api/transfermoney/getaccountsdropdown/' + customerId);
}

}
