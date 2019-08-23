import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';

import { AccountService } from './../../services/account.service';
import { AccountType } from '../../models/account-type.enum';
import { AccountStatus } from '../../models/account-status.enum';

@Component({
  selector: 'app-add-account',
  styleUrls: ['./add-account.component.scss'],
  templateUrl: './add-account.component.html'
})
export class AddAccountComponent implements OnInit {

  accountType: typeof AccountType = AccountType;
  accountTypeItems: string[] = [];
  userId = 1;

  form = this.fb.group({
    account: this.fb.group({
      accountType: ['', [Validators.required]],
      accountNumber: ['', [Validators.required]],
      balance: [],
      accountStatus: AccountStatus.Active,
      userId: this.userId
    })
  });

  constructor(private accountService: AccountService,
              private router: Router,
              private toastr: ToastrService,
              private logger: NGXLogger,
              private fb: FormBuilder) {}

  ngOnInit() {
    this.setOptions();
  }

  setOptions() {
    const accountTypeOptions = Object.keys(AccountType);
    this.accountTypeItems = accountTypeOptions.slice(accountTypeOptions.length / 2);
  }

  get f() {
    return (this.form.controls.account as FormGroup).controls;
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
