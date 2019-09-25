import { Component, OnInit } from '@angular/core';
import { AppRoute } from './../../models/app-route.interface';

// local services
import { AuthService } from './../../../authentication/services/auth.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../../store/app.states';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  appRoutes: AppRoute[];
  userAppRoutes: AppRoute[];
  toggle: boolean;
  isAdminUser: boolean;
  loggedInUserId: string;
  getState: Observable<any>;
  constructor(private auth: AuthService,
    private store: Store<AppState>) {
      this.getState = this.store.select(selectAuthState);
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

    this.getState.subscribe((state) => {
      this.loggedInUserId = localStorage.getItem('userId');
      if (this.loggedInUserId) {
        this.auth.isAdminUser(this.loggedInUserId)
          .subscribe((response: boolean) => {
            this.isAdminUser = response;
            if (this.isAdminUser) {
              this.userAppRoutes = this.appRoutes;
            } else {
              this.userAppRoutes = this.appRoutes.filter(i => i.adminAccess !== true);
            }
          });
      }
    });
  }

  toggleNav() {
    this.toggle = !this.toggle;
  }
}

