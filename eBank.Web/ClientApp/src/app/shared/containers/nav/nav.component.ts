import { Component, OnInit } from '@angular/core';
import { AppRoute } from './../../models/app-route.interface';

// local services
import { AuthService } from './../../../authentication/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  appRoutes: AppRoute[];
  toggle: boolean;
  isAdminUser: boolean;
  loggedInUserId: string;
  constructor(private auth: AuthService) {
    this.loggedInUserId = localStorage.getItem('userId');
    this.auth.isAdminUser(this.loggedInUserId)
      .subscribe((response: boolean) => {
        console.log('from nav ctor: ', response);
        this.isAdminUser = response;
      });
  }

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
      },
      {
        routeHeader: 'Customer management',
        adminAccess: true,
        routeItems: [
          {
            title: 'Add new customer',
            icon: 'add',
            route: '/customer/addcustomer'
          }
        ]
      }
    ];
  }

  toggleNav() {
    this.toggle = !this.toggle;
  }
}

