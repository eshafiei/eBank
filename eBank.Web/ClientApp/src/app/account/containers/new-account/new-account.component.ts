import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, OnDestroy, ComponentRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';
import { MatStepper } from '@angular/material';

// dynamic component
import { AdditionalInfoComponent } from './../../../shared/components/additional-info/additional-info.component';

import { AccountService } from '../../services/account.service';
import { CustomerService } from 'src/app/customer/services/customer.service';
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
  customerId: number;
  loggedInUserId: string;
  customerInfoComponent: ComponentRef<AdditionalInfoComponent>;
  newAccountForm = this.fb.group({
    accountType: ['', [Validators.required]],
    accountNumber: ['', [Validators.required]],
    balance: null,
    accountStatus: [null, Validators.requiredTrue],
    accountAgreement: [null, Validators.requiredTrue],
    customerId: null
  });
  @ViewChild('stepper', null) stepper: MatStepper;
  @ViewChild('customerBasicInfoEntry', { read: ViewContainerRef, static: true }) customerBasicInfoEntry: ViewContainerRef;
  constructor(private accountService: AccountService,
              private customerService: CustomerService,
              private router: Router,
              private toastr: ToastrService,
              private logger: NGXLogger,
              private fb: FormBuilder,
              private datepipe: DatePipe,
              private resolver: ComponentFactoryResolver) {}

  ngOnInit() {
    this.loggedInUserId = localStorage.getItem('userId');
    this.getCustomerBasicInfo(this.loggedInUserId);
  }

  ngOnDestroy() {
    this.customerInfoComponent.destroy();
  }

  stepperNext() {
    // complete the current step
    this.stepper.selected.completed = true;
    this.stepper.next();
  }

  createAccount() {
    this.stepper.steps.forEach(step => step.editable = false);
    this.newAccountForm.value.customerId = this.customerId;
    this.accountService.createAccount(this.newAccountForm.value)
      .subscribe(response => {
        this.toastr.success('account created successfuly!', 'Account');
        this.router.navigateByUrl('/account');
      }, (error: HttpErrorResponse) => {
        this.toastr.error(error.message, 'Account');
        this.logger.error(error);
      });
  }

  getCustomerBasicInfo(userId: string) {
    const customerAdditionalInfo: AdditionalInfoItem[] = [];
    this.customerService.getCustomer(userId)
      .subscribe((customerInfo: CustomerViewModel) => {
        this.customerId = customerInfo.customer.customerId;
        customerAdditionalInfo.push({ text: 'First name', value: customerInfo.customer.firstName });
        customerAdditionalInfo.push({ text: 'Last name', value: customerInfo.customer.lastName });
        customerAdditionalInfo.push({ text: 'Date of birth',
          value: this.datepipe.transform(customerInfo.customer.dateOfBirth, 'MM/dd/yyyy') });
        customerAdditionalInfo.push({ text: 'Legal status', value: LegalStatus[customerInfo.customer.legalStatus] });
        const customerInformation: AdditionalInfo = {
          title: 'Customer information',
          items: customerAdditionalInfo
        };
        const additionalInfoFactory = this.resolver.resolveComponentFactory(AdditionalInfoComponent);
        this.customerInfoComponent = this.customerBasicInfoEntry.createComponent(additionalInfoFactory);
        this.customerInfoComponent.instance.additionalInfo = customerInformation;
      });
  }
}
