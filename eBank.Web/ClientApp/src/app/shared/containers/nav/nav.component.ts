import { Component, OnInit } from '@angular/core';
import { AppRoute } from './../../models/app-route.interface';

import { CommandBarItem } from '../../models/command-bar-item.interface';

// local services
import { AppBarService } from '../../services/app-bar.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  appRoutes: AppRoute[];
  toggle: boolean;
  commandBarButtons: CommandBarItem[];
  constructor(private appBar: AppBarService) { }

  ngOnInit() {
    this.appRoutes = [
      {
        routeHeader: 'Account',
        routeItems: [
          {
            title: 'Account summary',
            icon: 'money',
            route: '/account'
          },
          {
            title: 'Account settings',
            icon: 'settings_applications',
            route: '/accountsettings'
          }
        ]
      },
      {
        routeHeader: 'Transfer & Pay',
        routeItems: [
          {
            title: 'Transfer money',
            icon: 'trending_flat',
            route: '/transfer'
          },
          {
            title: 'Pay bills',
            icon: 'payment',
            route: '/billpay'
          }
        ]
      },
      {
        routeHeader: 'New Account Services',
        routeItems: [
          {
            title: 'Open an Account',
            icon: 'call_to_action',
            route: '/createaccount'
          }
        ]
      }
    ];
    this.appBar.commanBarItems.subscribe(items => this.commandBarButtons = items);
  }

  toggleNav() {
    this.toggle = !this.toggle;
  }
}

