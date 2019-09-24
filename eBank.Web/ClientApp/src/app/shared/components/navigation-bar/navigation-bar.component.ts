import { Component, EventEmitter, Output, OnInit, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../../store/app.states';
import { Observable } from 'rxjs';
import { LogOut } from '../../store/actions/auth.actions';
import { AuthService } from './../../../authentication/services/auth.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  isAuthenticated: boolean;
  loggedInUser = null;
  user = null;
  errorMessage = null;
  getState: Observable<any>;
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private store: Store<AppState>,
    private auth: AuthService) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.checkAuthState();
    this.getState.subscribe((state) => {
      if (state.user) {
        this.isAuthenticated = state.isAuthenticated;
        this.loggedInUser = state.user.username;
        this.user = state.user;
        this.errorMessage = state.errorMessage;
      }
    });
  }

  logOut(): void {
    this.store.dispatch(new LogOut);
    this.checkAuthState();
  }

  checkAuthState() {
    const username = this.auth.getLoggedInUser();
    const token = this.auth.getToken();
    if (token && username) {
      this.isAuthenticated = true;
      this.loggedInUser = username;
    } else {
      this.isAuthenticated = false;
      this.loggedInUser = null;
    }
  }
}
