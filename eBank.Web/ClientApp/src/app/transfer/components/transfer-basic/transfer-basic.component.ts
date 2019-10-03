import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccountType } from '../../../shared/enums/account-type.enum';
import { Frequency } from '../../enums/frequency.enum';
import { IAccount } from '../../../account/models/account.interface';

@Component({
  selector: 'app-transfer-basic',
  templateUrl: './transfer-basic.component.html',
  styleUrls: ['./transfer-basic.component.scss']
})
export class TransferBasicComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() customerAccounts: IAccount[];
  accountType: typeof AccountType = AccountType;
  frequency: typeof Frequency = Frequency;
  frequencyItems: string[] = [];
  constructor() { }

  ngOnInit() {
    const frequencyOptions = Object.keys(Frequency);
    this.frequencyItems = frequencyOptions.slice(frequencyOptions.length / 2);
  }

  get f() {
    return this.form.controls;
  }

}
