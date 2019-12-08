import { Component, OnInit } from '@angular/core';
import { AccountType } from 'src/app/shared/enums/account-type.enum';
import { IAccount } from '../../interfaces/account.interface';
import { AccountService } from '../../services/account.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-close-account',
  templateUrl: './close-account.component.html',
  styleUrls: ['./close-account.component.scss']
})
export class CloseAccountComponent implements OnInit {
  accountType: typeof AccountType = AccountType;
  bankAccounts: IAccount[];
  closeAccountForm = this.fb.group({
    accountId: [null, [Validators.required]]
  });
  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private logger: NGXLogger,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    const customerId = 7;
    this.accountService
      .getAccountsDropDown(customerId)
      .subscribe((accounts: IAccount[]) => {
        this.bankAccounts = accounts;
      });
  }

  get f() {
    return this.closeAccountForm.controls;
  }

  closeAccount() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Are you sure you want to close this account?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.accountService
          .delete(this.closeAccountForm.get('accountId').value)
          .subscribe(
            response => {
              this.toastr.success('account closed successfuly!', 'Account');
              this.router.navigateByUrl('/account');
            },
            (error: HttpErrorResponse) => {
              this.toastr.error(error.message, 'Account');
              this.logger.error(error);
            }
          );
      }
    });
  }
}
