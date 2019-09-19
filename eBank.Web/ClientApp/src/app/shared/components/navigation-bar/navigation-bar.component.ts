import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.states';
import { LogOut } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  customerId = 7;
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private store: Store<AppState>) {
  }

  logOut(): void {
    this.store.dispatch(new LogOut);
  }
}
