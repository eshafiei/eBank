import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccountType } from '../../models/account-type.enum';

@Component({
  selector: 'app-customer-account-information',
  templateUrl: './customer-account-information.component.html',
  styleUrls: ['./customer-account-information.component.scss']
})
export class CustomerAccountInformationComponent implements OnInit {
  @Input() parent: FormGroup;
  accountType: typeof AccountType = AccountType;
  accountTypeItems: string[] = [];
  constructor() { }

  ngOnInit() {
    const accountTypeOptions = Object.keys(AccountType);
    this.accountTypeItems = accountTypeOptions.slice(accountTypeOptions.length / 2);
  }

  get f() {
    return (this.parent.controls.account as FormGroup).controls;
  }
}
