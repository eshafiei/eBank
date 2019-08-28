import { Component, OnInit, Input } from '@angular/core';

import { CommandBarItem } from '../../models/command-bar-item.interface';

@Component({
  selector: 'app-command-bar',
  templateUrl: './command-bar.component.html',
  styleUrls: ['./command-bar.component.scss']
})
export class CommandBarComponent implements OnInit {
  @Input() commandBarButtons: CommandBarItem[] = [];
  constructor() { }

  ngOnInit() {
  }

}
