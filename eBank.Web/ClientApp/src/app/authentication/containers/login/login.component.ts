import { Component, OnInit } from '@angular/core';

// local
import { User } from '../../models/user';
import { Store } from '@ngrx/store';
import { AppState } from '../../../shared/store/app.states';

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
    console.log(this.user);
  }

}
