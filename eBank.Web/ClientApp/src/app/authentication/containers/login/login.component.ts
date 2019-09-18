import { Component, OnInit } from '@angular/core';

// local
import { User } from '../../models/user';
import { Store } from '@ngrx/store';
import { AppState } from '../../../shared/store/app.states';
import { LogIn } from 'src/app/shared/store/actions/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  onSubmit(): void {
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    this.store.dispatch(new LogIn(payload));
  }

}
