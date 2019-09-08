import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LegalStatus } from '../../../shared/enums/legal-status.enum';
import { MaritalStatus } from '../../../shared/enums/marital-status.enum';

@Component({
  selector: 'app-customer-basic',
  templateUrl: './customer-basic.component.html',
  styleUrls: ['./customer-basic.component.scss']
})
export class CustomerBasicComponent implements OnInit {
  @Input() form: FormGroup;
  legalStatus: typeof LegalStatus = LegalStatus;
  legalStatusItems: string[] = [];
  maritalStatus: typeof MaritalStatus = MaritalStatus;
  maritalStatusItems: string[] = [];
  constructor() { }

  ngOnInit() {
    const legalStatusOptions = Object.keys(LegalStatus);
    this.legalStatusItems = legalStatusOptions.slice(legalStatusOptions.length / 2);
    const maritalStatusOptions = Object.keys(MaritalStatus);
    this.maritalStatusItems = maritalStatusOptions.slice(maritalStatusOptions.length / 2);
  }

  get f() {
    return this.form.controls;
  }
}