import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { ResourceService } from '../../shared/services/resource.service';
import { TransactionsSerializer } from '../models/transactions.serializer';
import { Observable } from 'rxjs';
import { ITransaction } from './../interfaces/transaction.interface';

@Injectable({
    providedIn: 'root'
})
export class TransactionsService extends ResourceService<ITransaction> {

    constructor(httpClient: HttpClient, public http: HttpClient) {
        super(
            httpClient,
            environment.baseUrl,
            'transactions',
            new TransactionsSerializer());
    }

    createTransaction(transaction: ITransaction): Observable<any> {
        const url = `${environment.baseUrl}/transactions`;
        return this.http.post<ITransaction>(url, transaction);
    }
}
