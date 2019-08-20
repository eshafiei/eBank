import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';

import { AccountType } from '../../models/account-type.enum';
import { AccountService } from './../../services/account.service';

@Component({
    selector: 'add-account',
    styleUrls: ['./add-account.component.scss'],
    templateUrl: './add-account.component.html'
})
export class AddAccountComponent implements OnInit {

    accountType: typeof AccountType = AccountType;
    accountTypeItems: string[]= [];
    userId: number = 1;

    form = new FormGroup({
        account: new FormGroup({
            accountType: new FormControl(),
            accountNumber: new FormControl(),
            balance: new FormControl(),
            accountStatus: new FormControl(1),
            userId: new FormControl(this.userId)
        })
    });

    constructor(private accountService: AccountService, 
                private router: Router,
                private toastr: ToastrService,
                private logger: NGXLogger) {}

    ngOnInit() {
        this.setOptions();
    }

    setOptions() {
        const accountTypeOptions = Object.keys(AccountType);
        this.accountTypeItems = accountTypeOptions.slice(accountTypeOptions.length / 2);
    }

    createAccount() {
        this.accountService.createAccount(this.form.value.account)
                           .subscribe(response => {
                                        this.toastr.success('account created successfuly!', 'Account');
                                        this.router.navigateByUrl('/account');
                                      }, (error: HttpErrorResponse) => {
                                        this.toastr.error(error.message, 'Account');
                                        this.logger.error(error);
                                      });
    }
}