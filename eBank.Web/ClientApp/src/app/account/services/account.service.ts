import { OnInit, Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// local imports
import { Account } from '../models/account.interface';

@Injectable()
export class AccountService implements OnInit {
    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {}

    ngOnInit() {}

    getAccounts(customerId: number): Observable<any> {
        return  this.http
                    .get(this.baseUrl + 'api/bankaccount/getaccounts/' + customerId);
    }

    createAccount(account: Account): Observable<any> {
        return  this.http
                    .post(this.baseUrl + 'api/bankaccount/createaccount', account);
    }
}
