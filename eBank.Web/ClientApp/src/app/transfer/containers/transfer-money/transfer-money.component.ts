import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { TransferMoneyService } from '../../services/transfer-money.service';
import { IAccount } from 'src/app/account/interfaces/account.interface';

@Component({
  selector: 'app-transfer-money',
  templateUrl: './transfer-money.component.html',
  styleUrls: ['./transfer-money.component.scss']
})
export class TransferMoneyComponent implements OnInit {
  customerId: number;
  customerAccounts: IAccount[];
  transferForm = this.fb.group({
    originAccount: [null, Validators.required],
    destinationAccount: [null, Validators.required],
    frequency: [0, Validators.required],
    transferDate: [new Date(), Validators.required],
    amount: [0, [Validators.required, Validators.max, Validators.min]],
    note: [null]
  });
  @ViewChild('stepper', null) stepper: MatStepper;
  constructor(private fb: FormBuilder,
    private transferService: TransferMoneyService) { }

  ngOnInit() {
    const customerId = 7;
    this.transferService.getAccountsDropDown(customerId)
      .subscribe((accounts: IAccount[]) => {
        this.customerAccounts = accounts;
      });
  }

  stepperNext() {
    // complete the current step
    this.stepper.selected.completed = true;
    this.stepper.next();
  }

  submit() {
    if (this.transferForm.value) {
      this.transferForm.value.originAccount = this.transferForm.value.originAccount.accountId;
      this.transferForm.value.destinationAccount = this.transferForm.value.destinationAccount.accountId;
    }
    console.log(this.transferForm.value);
  }

}
