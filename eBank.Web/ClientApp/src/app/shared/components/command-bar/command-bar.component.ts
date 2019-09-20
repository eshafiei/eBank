import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../../store/app.states';

import { CommandBarItem } from '../../models/command-bar-item.interface';
import { AuthService } from 'src/app/authentication/services/auth.service';

@Component({
  selector: 'app-command-bar',
  templateUrl: './command-bar.component.html',
  styleUrls: ['./command-bar.component.scss']
})
export class CommandBarComponent implements OnInit {
  @Input() commandBarButtons: CommandBarItem[] = [];
  isAuthenticated: boolean;
  user = null;
  errorMessage = null;
  getState: Observable<any>;
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

}
