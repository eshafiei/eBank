import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customer-personal-information',
  templateUrl: './customer-personal-information.component.html',
  styleUrls: ['./customer-personal-information.component.scss']
})
export class CustomerPersonalInformationComponent implements OnInit {
  @Input() parent: FormGroup;
  constructor() { }

  ngOnInit() {
  }

  get a() {
    return (this.parent.controls.personal as FormGroup).controls;
  }
}
