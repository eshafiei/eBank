import { Component, OnInit, Input, ViewChild, SimpleChanges, OnChanges } from '@angular/core';

import { AppRoute } from '../../interfaces/app-route.interface';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnChanges {
  @Input() appRoutes: AppRoute[];
  @Input() toggleSideNav: boolean;
  @ViewChild('navigationSideNav', null) navigationSideNav: MatSidenav;
  constructor() {}

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['toggleSideNav'] &&
          changes['toggleSideNav'].currentValue !== changes['toggleSideNav'].previousValue) {
      this.navigationSideNav.toggle();
    }
    if (changes['appRoutes'] &&
          changes['appRoutes'].currentValue !== changes['appRoutes'].previousValue) {
      this.appRoutes = changes['appRoutes'].currentValue;
    }
  }

  closeSideNav() {
    this.navigationSideNav.close();
  }
}
