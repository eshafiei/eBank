import { Component, OnInit } from '@angular/core';
import { AppRoute } from '../../interfaces/app-route.interface';

// local services
import { AuthService } from './../../../authentication/services/auth.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../../store/app.states';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  private isAuthenticatedDataSource = new BehaviorSubject<boolean>(true);
  authStatus = this.isAuthenticatedDataSource.asObservable();
  appRoutes: AppRoute[];
  userAppRoutes: AppRoute[];
  toggle: boolean;
  isAdminUser: boolean;
  isAuthenticated: boolean;
  loggedInUserId: string;
  loggedInUsername: string;
  getState: Observable<any>;
  constructor(private auth: AuthService,
    private store: Store<AppState>) {
      this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.appRoutes = this.getAppRoutes();
    this.checkAuthState();
    this.auth.authStatus.subscribe(isChanged => {
      this.checkAuthState();
    });
  }

  toggleNav() {
    if (!this.userAppRoutes) {
      this.checkUserAccess();
    }
    this.toggle = !this.toggle;
  }

  checkUserAccess() {
    this.loggedInUserId = this.auth.getLoggedInUserId();
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
  }

  checkAuthState() {
    const username = this.auth.getLoggedInUserName();
    const token = this.auth.getToken();
    if (token && username) {
      this.isAuthenticated = true;
      this.loggedInUsername = username;
    } else {
      this.isAuthenticated = false;
      this.loggedInUsername = null;
      this.userAppRoutes = null;
    }
    this.isAuthenticatedDataSource.next(this.isAuthenticated);
  }

  getAppRoutes() {
    return [
      {
        routeHeader: 'Account',
        routeItems: [
          {
            title: 'Account summary',
            icon: 'money',
            route: '/account'
          },
          {
            title: 'Deposit',
            icon: 'call_received',
            route: '/deposit'
          },
          {
            title: 'Withdraw',
            icon: 'call_made',
            route: '/withdraw'
          }
        ]
      },
      {
        routeHeader: 'Transfer',
        routeItems: [
          {
            title: 'Transfer money',
            icon: 'trending_flat',
            route: '/transfer'
          }
        ]
      },
      {
        routeHeader: 'Account Services',
        routeItems: [
          {
            title: 'Open an Account',
            icon: 'call_to_action',
            route: '/createaccount'
          },
          {
            title: 'Close an Account',
            icon: 'not_interested',
            route: '/closeaccount'
          }
        ]
      }
    ];
  }
}

