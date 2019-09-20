import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// containers
import { UserDashboardComponent } from './containers/user-dashboard/user-dashboard.component';
import { LoginComponent } from './containers/login/login.component';
import { SignupComponent } from './containers/signup/signup.component';

// services & modules
import { AuthService } from './services/auth.service';
import { SharedModule } from '../shared/shared.module';

// components

const routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent }
  ];

@NgModule({
    declarations: [
        UserDashboardComponent,
        LoginComponent,
        SignupComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        AuthService
    ],
    exports: [
        UserDashboardComponent
    ]
})
export class AuthenticationModule {

}
