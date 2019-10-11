import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';

// local services and modules
import { CustomerService } from '../../services/customer.service';
import { AddressService } from './../../../shared/services/address.service';
import { ICustomer } from '../../interfaces/customer.interface';
import { IAddress } from '../../../shared/interfaces/address.interface';
import { forkJoin } from 'rxjs';
import { AuthService } from './../../../authentication/services/auth.service';

@Component({
  selector: 'app-add-edit-customer',
  templateUrl: './add-edit-customer.component.html',
  styleUrls: ['./add-edit-customer.component.scss']
})
export class AddEditCustomerComponent implements OnInit {
  customerForm = this.fb.group({
    customer: this.fb.group({
      customerId: 0,
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      dateOfBirth: [null, Validators.required],
      legalStatus: [null, Validators.required],
      maritalStatus: [null, Validators.required]
    }),
    address: this.fb.group({
      customerId: 0,
      address1: [null, Validators.required],
      address2: null,
      city: [null, Validators.required],
      state: [null, Validators.required],
      zip: [null, Validators.required],
      country: [null, Validators.required]
    })
  });
  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private addressService: AddressService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private logger: NGXLogger
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const userId = this.authService.getLoggedInUserId();
    this.customerService.read(userId).subscribe((customer: ICustomer) => {
      if (customer) {
        this.addressService.read(customer.customerId).subscribe((address: IAddress) => {
          if (address) {
            this.customerForm.controls.address.setValue({
              customerId: customer.customerId,
              address1: address.address1,
              address2: address.address2,
              city: address.city,
              state: address.state,
              zip: address.zip,
              country: address.country
            });
          }
        });

        this.customerForm.controls.customer.setValue({
          customerId: customer.customerId,
          firstName: customer.firstName,
          lastName: customer.lastName,
          dateOfBirth: customer.dateOfBirth,
          legalStatus: customer.legalStatus,
          maritalStatus: customer.maritalStatus
        });
      }
    });
  }

  submit() {
    forkJoin([
      this.customerService.update(this.customerForm.value.customer),
      this.addressService.update(this.customerForm.value.address)])
      .subscribe(([customer, address]) => {
        this.toastr.success('account updated successfuly!', 'Account');
        this.router.navigateByUrl('/account');
      });

    // console.log(this.customerForm.value.address);
    // this.customerService.update(this.customerForm.value.customer)
    //   .subscribe(response => {
    //     this.toastr.success('account updated successfuly!', 'Account');
    //     this.router.navigateByUrl('/account');
    //   }, (error: HttpErrorResponse) => {
    //     this.toastr.error(error.message, 'Account');
    //     this.logger.error(error);
    //   });
  }
}
