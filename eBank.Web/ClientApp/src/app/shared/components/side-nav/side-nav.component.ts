import { Component, OnInit, Input, ViewChild, SimpleChanges, OnChanges } from '@angular/core';

import { AppRouteList } from '../../models/app-route.interface';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnChanges {
  @Input() appRoutes: AppRouteList;
  @Input() toggleSideNav: boolean;
  @ViewChild('navigationSideNav', null) navigationSideNav: MatSidenav;
  constructor() {}

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['toggleSideNav'].currentValue !== changes['toggleSideNav'].previousValue) {
      this.navigationSideNav.toggle();
    }
  }

  closeSideNav() {
    this.navigationSideNav.close();
  }
}
