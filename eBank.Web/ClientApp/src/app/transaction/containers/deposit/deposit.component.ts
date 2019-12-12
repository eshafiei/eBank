import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../account/services/account.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';
import { IAccount } from '../../../account/interfaces/account.interface';
import { AccountType } from '../../../shared/enums/account-type.enum';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IHttpResponse } from '../../../shared/interfaces/http-response.interface';
import { TransactionsService } from '../../services/transactions.service';
import { TransactionType } from 'src/app/account/enums/transaction-type.enum';

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
    transactionType: TransactionType.Deposit,
    accountId: [null, [Validators.required]],
    amount: [0, [Validators.required, Validators.max, Validators.min]],
    transactionDate: [new Date(), [Validators.required]],
    note: [null]
  });
  constructor(
    private accountService: AccountService,
    private transactionsService: TransactionsService,
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
    this.transactionsService
          .createTransaction(this.depositForm.value)
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
