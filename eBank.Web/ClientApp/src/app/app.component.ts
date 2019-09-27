import { Component } from '@angular/core';
import { AutoLogoutService } from './shared/services/auto-logout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(private autoLogOut: AutoLogoutService) {
  }
}
