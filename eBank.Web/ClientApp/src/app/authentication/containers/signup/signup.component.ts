import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

// local
import { AppState, selectAuthState } from '../../../shared/store/app.states';
import { SignUp } from '../../../shared/store/actions/auth.actions';
import { ErrorResponse } from '../../models/error-response.interface';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  getState: Observable<any>;
  errorMessages: ErrorResponse[] | null;
  registerForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]]
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
    this.store.dispatch(new SignUp(this.registerForm.value));
  }

  get f() {
    return this.registerForm.controls;
  }

}
