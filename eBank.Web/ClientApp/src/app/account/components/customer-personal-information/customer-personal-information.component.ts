import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LegalStatus } from '../../models/legal-status.enum';

@Component({
  selector: 'app-customer-personal-information',
  templateUrl: './customer-personal-information.component.html',
  styleUrls: ['./customer-personal-information.component.scss']
})
export class CustomerPersonalInformationComponent implements OnInit {
  @Input() parent: FormGroup;
  legalStatus: typeof LegalStatus = LegalStatus;
  legalStatusItems: string[] = [];
  constructor() { }

  ngOnInit() {
    const legalStatusOptions = Object.keys(LegalStatus);
    this.legalStatusItems = legalStatusOptions.slice(legalStatusOptions.length / 2);
  }

  get a() {
    return (this.parent.controls.customer as FormGroup).controls;
  }
}
