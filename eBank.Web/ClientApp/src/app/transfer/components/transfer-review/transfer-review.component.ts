import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef,
  ComponentRef, Input, OnChanges, SimpleChanges } from '@angular/core';

import { AdditionalInfoItem } from 'src/app/shared/models/additional-info-item.interface';
import { AdditionalInfo } from 'src/app/shared/models/additional-info.interface';
import { AdditionalInfoComponent } from 'src/app/shared/components/additional-info/additional-info.component';
import { FormGroup } from '@angular/forms';
import { AccountType } from 'src/app/shared/enums/account-type.enum';
import { Frequency } from '../../enums/frequency.enum';
import { DatePipe } from '@angular/common';

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

  pushInfo(transferInfo: FormGroup) {
    const additionalInfoFactory = this.resolver.resolveComponentFactory(AdditionalInfoComponent);
    this.transferReviewComponent = this.transferReview.createComponent(additionalInfoFactory);
    this.transferReviewInfo = [];
      this.transferReviewInfo.push({ text: 'From account', value: this.accountType[transferInfo.controls['originAccount'].value] });
      this.transferReviewInfo.push({ text: 'To account', value: this.accountType[transferInfo.controls['destinationAccount'].value] });
      this.transferReviewInfo.push({ text: 'Frequency', value: this.frequency[transferInfo.controls['frequency'].value] });
      this.transferReviewInfo.push({ text: 'Send on',
        value: this.datepipe.transform(transferInfo.controls['transferDate'].value, 'MM/dd/yyyy') });
      this.transferReviewInfo.push({ text: 'Amount', value: transferInfo.controls['amount'].value });
      this.transferReviewInfo.push({ text: 'Memo', value: transferInfo.controls['note'].value });
      const transferReviewInformation: AdditionalInfo = {
        title: 'Transfer Review',
        items: this.transferReviewInfo
      };
      this.transferReviewComponent.instance.additionalInfo = transferReviewInformation;
  }

  // ngOnDestroy() {
  //   this.transferReviewComponent.destroy();
  // }

}
