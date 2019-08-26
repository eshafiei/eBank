import { Component, OnInit } from '@angular/core';
import { AppRouteList, AppRoute } from './../../models/app-route.interface';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  appRoutes: AppRoute[];
  constructor() { }

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
  }
}

