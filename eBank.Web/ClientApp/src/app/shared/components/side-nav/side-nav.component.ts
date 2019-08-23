import { Component, OnInit, Input, OnChanges, ElementRef, ViewChild, SimpleChange, SimpleChanges } from '@angular/core';

import { AppRoute } from '../../models/app-route.interface';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnChanges {
  accountRoutes: AppRoute[];
  @Input() toggleNav: boolean;
  @ViewChild('navigationSidenav', null) navigationSideNav: MatSidenav;
  constructor() {}

  ngOnInit() {
    this.accountRoutes = [
      {
        title: 'Account summary',
        icon: 'money',
        route: '/account'
      },
      {
        title: 'Account settings',
        icon: 'settings_applications',
        route: '/setting'
      }
    ];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['toggleNav'].currentValue !== changes['toggleNav'].previousValue) {
      this.navigationSideNav.toggle();
    }
  }
}
