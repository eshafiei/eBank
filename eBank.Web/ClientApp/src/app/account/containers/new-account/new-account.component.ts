import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';
import { MatStepper } from '@angular/material';

import { AccountService } from '../../services/account.service';
import { CustomerService } from 'src/app/customer/services/customer.service';
import { AdditionalInfoService } from 'src/app/shared/services/additional-info.service';
import { CustomerViewModel } from './../../../customer/view-models/customer-vm.interface';
import { AdditionalInfo } from '../../../shared/models/additional-info.interface';
import { LegalStatus } from 'src/app/shared/enums/legal-status.enum';
import { AdditionalInfoItem } from 'src/app/shared/models/additional-info-item.interface';

@Component({
  selector: 'app-new-account',
  styleUrls: ['./new-account.component.scss'],
  templateUrl: './new-account.component.html'
})
export class NewAccountComponent implements OnInit, OnDestroy {
  userId = 1;
  customerId = 3;
  newAccountForm = this.fb.group({
    accountType: ['', [Validators.required]],
    accountNumber: ['', [Validators.required]],
    balance: [],
    accountStatus: [null, Validators.requiredTrue],
    accountAgreement: [null, Validators.requiredTrue],
    customerId: this.customerId
  });
  @ViewChild('stepper', null) stepper: MatStepper;
  constructor(private accountService: AccountService,
              private customerService: CustomerService,
              private router: Router,
              private toastr: ToastrService,
              private logger: NGXLogger,
              private fb: FormBuilder,
              private additionalInfoService: AdditionalInfoService,
              private datepipe: DatePipe) {}

  ngOnInit() {
    this.getCustomerBasicInfo();
  }
  ngOnDestroy() {
    this.additionalInfoService.updateAdditionalInfo(null);
  }

  stepperNext() {
    // complete the current step
    this.stepper.selected.completed = true;
    this.stepper.next();
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

  getCustomerBasicInfo() {
    const customerAdditionalInfo: AdditionalInfoItem[] = [];
    this.customerService.getCustomer(this.customerId)
      .subscribe((customerInfo: CustomerViewModel) => {
        customerAdditionalInfo.push({ text: 'First name', value: customerInfo.customer.firstName });
        customerAdditionalInfo.push({ text: 'Last name', value: customerInfo.customer.lastName });
        customerAdditionalInfo.push({ text: 'Date of birth',
          value: this.datepipe.transform(customerInfo.customer.dateOfBirth, 'MM/dd/yyyy') });
        customerAdditionalInfo.push({ text: 'Legal status', value: LegalStatus[customerInfo.customer.legalStatus] });
        const customerInformation: AdditionalInfo = {
          title: 'Customer information',
          items: customerAdditionalInfo
        };
        this.additionalInfoService.updateAdditionalInfo(customerInformation);
      });
  }
}
