import { OnInit, Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// local imports
import { IAccount } from '../models/Account.interface';

@Injectable()
export class AccountService implements OnInit {
    
    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
    }

    ngOnInit() {}

  getAccounts(userId: number): Observable<IAccount[]> {
        return this.http
         .get(this.baseUrl + 'api/account/getaccounts/' + userId)
         .pipe(
           map((response : Response) => response.json())
        );
    }

    createAccount(account: IAccount) : any {
        if(account){
            this.http.post(this.baseUrl + 'api/account/createaccount', account).subscribe(result => {
                return result;
             }, (error => {
                 console.error(error);
             }));
        }
    }
}
