import { Component, OnInit } from '@angular/core';
import { AccountType } from '../../models/account-type.enum';
import { FormGroup, FormControl } from '@angular/forms';
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

    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.setOptions();
    }

    setOptions() {
        const accountTypeOptions = Object.keys(AccountType);
        this.accountTypeItems = accountTypeOptions.slice(accountTypeOptions.length / 2);
    }

    createAccount() {
        this.accountService.createAccount(this.form.value.account);
    }
}