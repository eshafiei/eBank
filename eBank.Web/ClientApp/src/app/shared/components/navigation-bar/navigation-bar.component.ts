import { Component, EventEmitter, Output, OnInit } from '@angular/core';
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
  customerId = 7;
  isAuthenticated: boolean;
  user = null;
  errorMessage = null;
  getState: Observable<any>;
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private store: Store<AppState>,
    private auth: AuthService) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    const token = this.auth.getToken();
    if (token) {
      this.isAuthenticated = true;
    } else {
      this.getState.subscribe((state) => {
        this.isAuthenticated = state.isAuthenticated;
        this.user = state.user;
        this.errorMessage = state.errorMessage;
      });
    }
  }

  logOut(): void {
    this.store.dispatch(new LogOut);
  }
}
