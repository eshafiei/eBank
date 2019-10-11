import { Component, OnInit } from '@angular/core';

// interfaces & services
import { AdditionalInfo } from '../../interfaces/additional-info.interface';

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.scss']
})
export class AdditionalInfoComponent implements OnInit {
  additionalInfo: AdditionalInfo;
  constructor() { }

  ngOnInit() {
  }
}
