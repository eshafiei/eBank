import { OnInit, Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import 'rxjs/add/operator/map';

// local imports
import { IAccount } from '../models/Account.interface';
import { AccountType } from '../models/account-type.enum';


@Injectable()
export class AccountService implements OnInit {
    
    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
    }

    ngOnInit() {}

  getAccounts(accountId: number): Observable<IAccount[]> {
        return this.http
         .get(this.baseUrl + 'api/account/getaccounts/' + accountId)
         .pipe(
           map((response : Response) => response.json())
        );
    }

    createAccount() : any {
        const data: IAccount = {
            accountNumber: 1504398633,
            accountType: AccountType.Mortgage,
            balance: 120000,
            accountStatus: true
        };
      
         this.http.post(this.baseUrl + 'api/account/createaccount', data).subscribe(result => {
            return result;
         }, (error => {
             console.error(error);
         }));
    }

}
