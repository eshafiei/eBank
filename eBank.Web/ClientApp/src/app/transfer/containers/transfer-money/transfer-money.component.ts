import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { TransferMoneyService } from '../../services/transfer-money.service';
import { IAccount } from 'src/app/account/models/account.interface';

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
    frequency: [null, Validators.required],
    transferDate: [null, Validators.required],
    amount: [null, [Validators.required, Validators.max]],
    note: [null]
  });
  @ViewChild('stepper', null) stepper: MatStepper;
  constructor(private fb: FormBuilder,
    private transferService: TransferMoneyService) { }

  ngOnInit() {
    this.customerId = 7;
    this.transferService.getAccountsDropDown(7)
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
    console.log(this.transferForm.value);
  }

}
