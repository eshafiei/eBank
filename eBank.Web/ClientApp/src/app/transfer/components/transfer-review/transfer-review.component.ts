import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef,
  ComponentRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as moment from 'moment';

import { AdditionalInfoItem } from 'src/app/shared/interfaces/additional-info-item.interface';
import { AdditionalInfo } from 'src/app/shared/interfaces/additional-info.interface';
import { AdditionalInfoComponent } from 'src/app/shared/components/additional-info/additional-info.component';
import { FormGroup } from '@angular/forms';
import { AccountType } from 'src/app/shared/enums/account-type.enum';
import { Frequency } from '../../enums/frequency.enum';
import { DatePipe } from '@angular/common';
import { IAccount } from 'src/app/account/interfaces/account.interface';

@Component({
  selector: 'app-transfer-review',
  templateUrl: './transfer-review.component.html',
  styleUrls: ['./transfer-review.component.scss']
})
export class TransferReviewComponent implements OnInit, OnChanges {
  @Input() form: FormGroup;
  transferReviewComponent: ComponentRef<AdditionalInfoComponent>;
  @ViewChild('transferReview', { read: ViewContainerRef, static: true }) transferReview: ViewContainerRef;
  transferReviewInfo: AdditionalInfoItem[] = [];
  accountType: typeof AccountType = AccountType;
  frequency: typeof Frequency = Frequency;
  constructor(private resolver: ComponentFactoryResolver,
    private datepipe: DatePipe) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.form.valueChanges.subscribe(val => {
      if (changes['form'] && changes['form'].currentValue !== changes['form'].previousValue) {
        if (this.transferReviewComponent) {
          this.transferReviewComponent.destroy();
        }
        this.pushInfo(changes['form'].currentValue);
      }
    });
  }

  pushInfo(transferForm: FormGroup) {
    const additionalInfoFactory = this.resolver.resolveComponentFactory(AdditionalInfoComponent);
    this.transferReviewComponent = this.transferReview.createComponent(additionalInfoFactory);

    this.transferReviewInfo = [];

    if (transferForm.controls['originAccount'].value) {
      this.transferReviewInfo.push(
        { text: 'From account', value: this.getAccountDisplayText(transferForm.controls['originAccount'].value)}
      );
    }
    if (transferForm.controls['destinationAccount'].value) {
      this.transferReviewInfo.push(
        { text: 'To account', value: this.getAccountDisplayText(transferForm.controls['destinationAccount'].value)}
      );
    }

    this.transferReviewInfo.push({ text: 'Frequency', value: this.frequency[transferForm.controls['frequency'].value] });

    this.transferReviewInfo.push({ text: 'Send on',
      value: this.datepipe.transform(transferForm.controls['transferDate'].value, 'MM/dd/yyyy') });

    this.transferReviewInfo.push({ text: 'Delivers by',
      value: this.datepipe.transform(this.getDeliveryDate(transferForm.controls['transferDate'].value), 'MM/dd/yyyy') });

    this.transferReviewInfo.push({ text: 'Amount', value: `$${transferForm.controls['amount'].value}` });
    this.transferReviewInfo.push({ text: 'Memo', value: transferForm.controls['note'].value });

    const transferReviewInformation: AdditionalInfo = {
      title: 'Verify Transfer',
      items: this.transferReviewInfo
    };

    this.transferReviewComponent.instance.additionalInfo = transferReviewInformation;
  }

  getAccountDisplayText(account: IAccount) {
    return `${this.accountType[account.accountType]} account ending in ...${account.accountNumber.toString()
      .substr(account.accountNumber.toString().length - 4, 4)} with current balance of $${account.balance}`;
  }

  getDeliveryDate(transferDate: Date) {
    let deliveryDate = moment(transferDate);
    deliveryDate = this.addBusinessDays(deliveryDate, 2);
    return deliveryDate;
  }

  addBusinessDays = (momentDate: moment.Moment, daysToAdd: number) => {
    const weekend = [moment().day('Saturday').weekday(), moment().day('Sunday').weekday()];
    let daysAdded = 0;
    while (daysAdded < daysToAdd) {
      momentDate = momentDate.add(1, 'days');
      if (!weekend.includes(momentDate.weekday())) {
        daysAdded++;
      }
    }
    return momentDate;
  }
}
