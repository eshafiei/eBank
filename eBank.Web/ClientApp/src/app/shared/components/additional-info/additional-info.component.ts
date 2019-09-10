import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

// interfaces & services
import { AdditionalInfo } from './../../models/additional-info.interface';
import { AdditionalInfoService } from './../../services/additional-info.service';

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.scss']
})
export class AdditionalInfoComponent implements OnInit, AfterViewInit {
  additionalInfo: AdditionalInfo;
  constructor(private additionalInfoService: AdditionalInfoService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.additionalInfoService.additionalInfoItems
      .subscribe(item => this.additionalInfo = item);
  }
}
