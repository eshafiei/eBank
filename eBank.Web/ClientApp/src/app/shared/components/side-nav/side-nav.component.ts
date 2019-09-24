import { Component, OnInit, Input, ViewChild, SimpleChanges, OnChanges } from '@angular/core';

import { AppRoute } from '../../models/app-route.interface';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnChanges {
  @Input() appRoutes: AppRoute[];
  @Input() toggleSideNav: boolean;
  @Input() isAdminUser: boolean;
  @ViewChild('navigationSideNav', null) navigationSideNav: MatSidenav;
  constructor() {}

  ngOnInit() {
    if (this.appRoutes && !this.isAdminUser) {
      this.appRoutes = this.appRoutes.filter(i => i.adminAccess !== true);
    }
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
