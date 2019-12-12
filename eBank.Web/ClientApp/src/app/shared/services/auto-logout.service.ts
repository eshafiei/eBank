import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../store/app.states';
import { LogOut, IdleTime } from '../store/actions/auth.actions';
import { Observable } from 'rxjs';

const MINUTES_UNITL_AUTO_LOGOUT = 60; // in Minutes
const CHECK_INTERVALL = 60000; // in ms

@Injectable()
export class AutoLogoutService {
  getState: Observable<any>;
  idleStartTime: any;
  isAuthenticated: boolean;
  constructor(
    private router: Router,
    private ngZone: NgZone,
    private store: Store<AppState>
  ) {
    this.getState = this.store.select(selectAuthState);
    this.check();
    this.initListener();
    this.initInterval();
  }

  getLastIdleTime() {
    this.getState.subscribe((state) => {
      this.idleStartTime = state.idleStartTime;
      this.isAuthenticated = state.isAuthenticated;
    });
  }
  setLastIdleTime(value: any) {
    this.store.dispatch(new IdleTime(value));
  }

  initListener() {
    this.ngZone.runOutsideAngular(() => {
      document.body.addEventListener('click', () => this.reset());
    });
  }

  initInterval() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.check();
      }, CHECK_INTERVALL);
    });
  }

  reset() {
    this.setLastIdleTime(Date.now());
  }

  check() {
    this.getLastIdleTime();
    const now = Date.now();
    const timeleft = this.idleStartTime + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
    const diff = timeleft - now;
    const isTimeout = diff < 0;
    this.ngZone.run(() => {
      if (isTimeout && this.isAuthenticated) {
        this.store.dispatch(new LogOut());
      }
    });
  }
}
