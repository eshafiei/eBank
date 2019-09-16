import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// containers
import { UserDashboardComponent } from './containers/user-dashboard/user-dashboard.component';
import { LoginComponent } from './containers/login/login.component';
import { SignupComponent } from './containers/signup/signup.component';

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
        RouterModule.forChild(routes)
    ],
    exports: [
        UserDashboardComponent
    ]
})
export class AuthenticationModule {

}
