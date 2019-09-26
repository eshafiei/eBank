import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';

// local services and modules
import { CustomerService } from '../../services/customer.service';


@Component({
  selector: 'app-add-edit-customer',
  templateUrl: './add-edit-customer.component.html',
  styleUrls: ['./add-edit-customer.component.scss']
})
export class AddEditCustomerComponent implements OnInit {
  loggedInUserId: string;
  customerForm = this.fb.group({
    customer: this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      dateOfBirth: [null, Validators.required],
      legalStatus: [null, Validators.required],
      maritalStatus: [null, Validators.required],
      userId: this.loggedInUserId
    }),
    address: this.fb.group({
      address1: [null, Validators.required],
      address2: null,
      city: [null, Validators.required],
      state: [null, Validators.required],
      zip: [null, Validators.required],
      country: [null, Validators.required]
    })
  });
  constructor(private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private toastr: ToastrService,
    private logger: NGXLogger) { }

  ngOnInit() {
    this.loggedInUserId = localStorage.getItem('userId');
    if (this.loggedInUserId) {
      this.loadData(this.loggedInUserId);
    }
  }

  loadData(userId: string) {
    this.customerService.getCustomer(userId)
      .subscribe(data => {
        if (data) {
          this.customerForm.controls.customer.setValue({
            firstName: data.customer.firstName,
            lastName: data.customer.lastName,
            dateOfBirth: data.customer.dateOfBirth,
            legalStatus: data.customer.legalStatus,
            maritalStatus: data.customer.maritalStatus,
            userId: data.customer.userId
          });
          this.customerForm.controls.address.setValue({
            address1: data.address.address1,
            address2: data.address.address2,
            city: data.address.city,
            state: data.address.state,
            zip: data.address.zip,
            country: data.address.country
          });
        }
      });
  }

  submit() {
    this.customerForm.value.customer.userId = localStorage.getItem('userId');
    this.customerService.updateCustomer(this.customerForm.value)
    .subscribe(response => {
      this.toastr.success('account updated successfuly!', 'Account');
      this.router.navigateByUrl('/account');
    }, (error: HttpErrorResponse) => {
      this.toastr.error(error.message, 'Account');
      this.logger.error(error);
    });
  }
}
