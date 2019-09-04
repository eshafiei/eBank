import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';

import { AccountService } from '../../services/account.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-new-account',
  styleUrls: ['./new-account.component.scss'],
  templateUrl: './new-account.component.html'
})
export class NewAccountComponent implements OnInit {
  userId = 1;
  customerId = 3;
  newAccountForm = this.fb.group({
    account: this.fb.group({
      accountType: ['', [Validators.required]],
      accountNumber: ['', [Validators.required]],
      balance: [],
      accountStatus: [null, Validators.required],
      accountAgreement: [null, Validators.required],
      customerId: this.customerId
    }),
    customer: this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dateOfBirth: ['', Validators.required],
      legalStatus: ['', Validators.required],
      userId: this.userId
    })
  });
  @ViewChild('stepper', null) stepper: MatStepper;
  constructor(private accountService: AccountService,
              private router: Router,
              private toastr: ToastrService,
              private logger: NGXLogger,
              private fb: FormBuilder) {}

  ngOnInit() {
    this.loadData(this.customerId);
  }

  stepperNext() {
    // complete the current step
    this.stepper.selected.completed = true;
    this.stepper.next();
  }

  loadData(customerId: number) {
    this.accountService.getCustomer(customerId)
      .subscribe(data => {
        const customer = this.newAccountForm.controls.customer as FormGroup;
        customer.setValue({
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: data.dateOfBirth,
          legalStatus: data.legalStatus,
          userId: data.userId
        });
      });
  }

  createAccount() {
    this.stepper.steps.forEach(step => step.editable = false);
    this.accountService.createAccount(this.newAccountForm.value)
      .subscribe(response => {
        this.toastr.success('account created successfuly!', 'Account');
        this.router.navigateByUrl('/account');
      }, (error: HttpErrorResponse) => {
        this.toastr.error(error.message, 'Account');
        this.logger.error(error);
      });
  }
}
