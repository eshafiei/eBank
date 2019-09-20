import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../../store/app.states';
import { LogOut } from '../../store/actions/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  customerId = 7;
  getState: Observable<any>;
  isAuthenticated: false;
  user = null;
  errorMessage = null;
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
      this.errorMessage = state.errorMessage;
    });
  }

  logOut(): void {
    this.store.dispatch(new LogOut);
  }
}
