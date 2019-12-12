import { Component, OnInit, ViewChild, ComponentRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';
import { MatStepper } from '@angular/material';

// dynamic component
import { AdditionalInfoComponent } from './../../../shared/components/additional-info/additional-info.component';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-new-account',
  styleUrls: ['./new-account.component.scss'],
  templateUrl: './new-account.component.html'
})
export class NewAccountComponent implements OnInit {
  userId: string;
  initialBalanceRequired = 100;
  newAccountNumber: number;
  userInfoComponent: ComponentRef<AdditionalInfoComponent>;
  newAccountForm = this.fb.group({
    accountNumber: Math.floor(1000000000 + Math.random() * 9000000000),
    accountType: ['', [Validators.required]],
    balance: [this.initialBalanceRequired,
      [Validators.required, Validators.min(this.initialBalanceRequired)]],
    accountStatus: true,
    accountAgreement: [null, Validators.requiredTrue],
    id: null
  });
  @ViewChild('stepper', null) stepper: MatStepper;
  constructor(private accountService: AccountService,
              private router: Router,
              private toastr: ToastrService,
              private logger: NGXLogger,
              private fb: FormBuilder) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
  }

  stepperNext() {
    // complete the current step
    this.stepper.selected.completed = true;
    this.stepper.next();
  }

  createAccount() {
    this.stepper.steps.forEach(step => step.editable = false);
    this.newAccountForm.value.id = this.userId;
    this.accountService.create(this.newAccountForm.value)
      .subscribe(
        (response) => {
          this.toastr.success('account created successfully.', 'Account');
          this.router.navigateByUrl('/account');
        }, (error: HttpErrorResponse) => {
          this.toastr.error(error.error, 'Account');
          this.logger.error(error);
        });
  }
}
