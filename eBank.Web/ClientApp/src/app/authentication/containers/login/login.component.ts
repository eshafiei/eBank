import { Component, OnInit } from '@angular/core';

// local
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../../../shared/store/app.states';
import { LogIn } from 'src/app/shared/store/actions/auth.actions';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ErrorResponse } from '../../models/error-response.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  getState: Observable<any>;
  errorMessages: ErrorResponse[] | null;
  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });
  constructor(private store: Store<AppState>,
    private fb: FormBuilder) {
      this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.errorMessages = state.errorMessages;
    });
  }

  onSubmit(): void {
    this.store.dispatch(new LogIn(this.loginForm.value));
  }

  get f() {
    return this.loginForm.controls;
  }

}
