import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { AdditionalInfo } from './../models/additional-info.interface';

@Injectable({
  providedIn: 'root'
})
export class AdditionalInfoService {
  private additionalInfoSource = new BehaviorSubject<AdditionalInfo>(null);
  additionalInfoItems = this.additionalInfoSource.asObservable();
  constructor() { }

  updateAdditionalInfo(item: AdditionalInfo) {
    this.additionalInfoSource.next(item);
  }

}
