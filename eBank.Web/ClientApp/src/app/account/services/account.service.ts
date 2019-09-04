import { OnInit, Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// local imports
import { Account } from '../models/account.interface';
import { Customer } from '../models/customer.interface';

@Injectable()
export class AccountService implements OnInit {
    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {}

    ngOnInit() {}

    getAccounts(userId: number): Observable<any> {
        return  this.http
                    .get(this.baseUrl + 'api/account/getaccounts/' + userId);
    }

    getCustomer(customerId: number): Observable<Customer> {
        return this.http
                   .get<Customer>(this.baseUrl + 'api/account/getcustomer/' + customerId);
    }

    createAccount(account: Account): Observable<any> {
        return  this.http
                    .post(this.baseUrl + 'api/account/createaccount', account);
    }
}
