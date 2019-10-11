import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

// local
import { ResourceService } from '../../shared/services/resource.service';
import { AccountSerializer } from '../models/account.serializer';
import { IAccount } from '../interfaces/account.interface';

@Injectable({
    providedIn: 'root'
})
export class AccountService extends ResourceService<IAccount> {
    constructor(httpClient: HttpClient) {
        super(
            httpClient,
            environment.baseUrl,
            'bankAccount',
            new AccountSerializer());
    }
}
