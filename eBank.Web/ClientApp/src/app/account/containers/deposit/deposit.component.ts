import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';
import { IAccount } from '../../interfaces/account.interface';
import { AccountType } from '../../../../app/shared/enums/account-type.enum';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IHttpResponse } from '../../../../app/shared/interfaces/http-response.interface';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {
  accountType: typeof AccountType = AccountType;
  bankAccounts: IAccount[];
  maximumDepositAllowed = 10000;
  depositForm = this.fb.group({
    accountId: [null, [Validators.required]],
    amount: [0, [Validators.required, Validators.max, Validators.min]],
    depositDate: [new Date(), [Validators.required]],
    note: [null]
  });
  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private logger: NGXLogger) { }

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    this.accountService
      .getAccountsDropDown(userId)
      .subscribe((accounts: IAccount[]) => {
        this.bankAccounts = accounts;
      });
  }

  get f() {
    return this.depositForm.controls;
  }

  deposit() {
    this.accountService
          .deposit(this.depositForm.value)
          .subscribe(
            (response: IHttpResponse) => {
              this.toastr.success(response.result, 'Deposit');
              this.router.navigateByUrl('/account');
            },
            (error: HttpErrorResponse) => {
              this.toastr.error(error.error, 'Deposit');
              this.logger.error(error);
            }
          );
  }

}
