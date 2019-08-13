import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// containers
import { UserDashboardComponent } from './containers/user-dashboard/user-dashboard.component';

// components

@NgModule({
    declarations: [
        UserDashboardComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        UserDashboardComponent
    ]
})
export class AuthenticationModule {

}
