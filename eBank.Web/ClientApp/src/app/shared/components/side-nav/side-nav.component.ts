import { Component, OnInit, Input } from '@angular/core';

import { AppRouteList } from '../../models/app-route.interface';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @Input() appRoutes: AppRouteList;
  toggle: boolean;
  constructor() {}

  ngOnInit() {
  }

  toggleNav(navigationSidenav: MatSidenav) {
    navigationSidenav.toggle();
  }
}
