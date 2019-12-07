import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccountType } from '../../../shared/enums/account-type.enum';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {
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
