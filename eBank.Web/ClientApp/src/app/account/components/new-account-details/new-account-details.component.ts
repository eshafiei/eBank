import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccountType } from '../../../shared/enums/account-type.enum';

@Component({
  selector: 'app-new-account-details',
  templateUrl: './new-account-details.component.html',
  styleUrls: ['./new-account-details.component.scss']
})
export class NewAccountDetailsComponent implements OnInit {
  @Input() form: FormGroup;
  accountType: typeof AccountType = AccountType;
  accountTypeItems: string[] = [];
  initialBalanceRequired: number;
  constructor() { }

  ngOnInit() {
    const accountTypeOptions = Object.keys(AccountType);
    this.accountTypeItems = accountTypeOptions.slice(accountTypeOptions.length / 2);
    this.initialBalanceRequired = this.form.get('balance').value;
  }

  get f() {
    return this.form.controls;
  }
}
