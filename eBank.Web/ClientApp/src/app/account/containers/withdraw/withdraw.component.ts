import { Component, OnInit } from '@angular/core';
import { AccountType } from 'src/app/shared/enums/account-type.enum';
import { IAccount } from '../../interfaces/account.interface';
import { Validators, FormBuilder } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';
import { HttpErrorResponse } from '@angular/common/http';
import { IHttpResponse } from 'src/app/shared/interfaces/http-response.interface';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit {
  accountType: typeof AccountType = AccountType;
  bankAccounts: IAccount[];
  maximumDepositAllowed = 10000;
  withdrawForm = this.fb.group({
    accountId: [null, [Validators.required]],
    amount: [0, [Validators.required, Validators.max, Validators.min]],
    withdrawDate: [new Date(), [Validators.required]],
    note: [null]
  });
  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private logger: NGXLogger
  ) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    this.accountService
      .getAccountsDropDown(userId)
      .subscribe((accounts: IAccount[]) => {
        this.bankAccounts = accounts;
      });
  }

  get f() {
    return this.withdrawForm.controls;
  }

  withdraw() {
    this.accountService
          .withdraw(this.withdrawForm.value)
          .subscribe(
            (response: IHttpResponse) => {
              this.toastr.success(response.result, 'Withdraw');
              this.router.navigateByUrl('/account');
            },
            (error: HttpErrorResponse) => {
              this.toastr.error(error.error, 'Withdraw');
              this.logger.error(error);
            }
          );
  }
}
