import { Component, EventEmitter, Output, OnInit, Input, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../../store/app.states';
import { Observable } from 'rxjs';

import { LogOut } from '../../store/actions/auth.actions';
import { NavComponent } from './../../containers/nav/nav.component';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  isAuthenticated: boolean;
  @Input() loggedInUsername: string;
  @Output() toggleSidenav = new EventEmitter<void>();
  getState: Observable<any>;

  constructor(private store: Store<AppState>,
    @Inject(NavComponent) private nav: NavComponent) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      if (state.user) {
        this.isAuthenticated = state.isAuthenticated;
        this.loggedInUsername = state.user.username;
      }
    });
    this.nav.authStatus.subscribe(status => {
      this.isAuthenticated = status;
    });
  }

  logOut(): void {
    this.store.dispatch(new LogOut);
  }
}
