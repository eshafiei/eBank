import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../../store/app.states';
import { Observable } from 'rxjs';

import { LogOut } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  @Input() isAuthenticated: boolean;
  @Input() loggedInUsername: string;
  @Output() toggleSidenav = new EventEmitter<void>();
  getState: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      if (state.user) {
        this.isAuthenticated = state.isAuthenticated;
        this.loggedInUsername = state.user.username;
      }
    });
  }

  logOut(): void {
    this.isAuthenticated = false;
    this.store.dispatch(new LogOut);
  }
}
