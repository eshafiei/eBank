import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  customerId = 3;
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor() {
  }
}
