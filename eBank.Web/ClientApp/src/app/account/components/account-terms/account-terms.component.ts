import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-account-terms',
  templateUrl: './account-terms.component.html',
  styleUrls: ['./account-terms.component.scss']
})
export class AccountTermsComponent implements OnInit {
  @Input() parent: FormGroup;
  constructor() { }

  ngOnInit() {
  }
}
