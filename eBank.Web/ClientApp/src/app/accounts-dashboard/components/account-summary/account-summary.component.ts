import { Component, OnInit } from '@angular/core';
import { AccountType } from '../../models/account-type.enum';

@Component({
    selector: 'account-summary',
    styleUrls: ['./account-summary.component.scss'],
    templateUrl: './account-summary.component.html'
})
export class AccountSummaryComponent implements OnInit {
    accountType: string;
    accountNumber: number;
    accountBalance: number;
    partialAccountNumber: string;

    constructor(){}

    ngOnInit(){
        this.accountType = AccountType[AccountType.Checking];
        this.accountNumber = 123548696358;

        const trailingCharsIntactCount: number = 4;
        this.partialAccountNumber = '...' + this.accountNumber.toString().slice(-trailingCharsIntactCount);
        
        this.accountBalance = 365425.77;
    }
}

