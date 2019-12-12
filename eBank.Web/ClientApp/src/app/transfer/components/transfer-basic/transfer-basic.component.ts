import { Component, OnInit, Input, AfterContentInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccountType } from '../../../shared/enums/account-type.enum';
import { Frequency } from '../../enums/frequency.enum';
import { IAccount } from '../../../account/interfaces/account.interface';

@Component({
  selector: 'app-transfer-basic',
  templateUrl: './transfer-basic.component.html',
  styleUrls: ['./transfer-basic.component.scss']
})
export class TransferBasicComponent implements OnInit, OnChanges {
  @Input() form: FormGroup;
  @Input() userAccounts: IAccount[];
  transferOriginAccounts: IAccount[];
  transferDestinationAccounts: IAccount[];
  accountType: typeof AccountType = AccountType;
  frequency: typeof Frequency = Frequency;
  frequencyItems: string[] = [];
  constructor() {
  }

  ngOnInit() {
    const frequencyOptions = Object.keys(Frequency);
    this.frequencyItems = frequencyOptions.slice(frequencyOptions.length / 2);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userAccounts']) {
      this.transferOriginAccounts = this.userAccounts;
      this.transferDestinationAccounts = this.userAccounts;
    }
  }

  get f() {
    return this.form.controls;
  }

  accountChanged(selectedAccount: IAccount) {
    this.transferDestinationAccounts =
      this.userAccounts.filter(a => a.accountId !== selectedAccount.accountId);
  }

}
