import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { AdditionalInfo } from './../models/additional-info.interface';

@Injectable({
  providedIn: 'root'
})
export class AdditionalInfoService {
  private additionalInfoSource = new BehaviorSubject<AdditionalInfo[]>([]);
  additionalInfoItems = this.additionalInfoSource.asObservable();
  constructor() { }

  updateAdditionalInfo(items: AdditionalInfo[]) {
    this.additionalInfoSource.next(items);
  }

}
