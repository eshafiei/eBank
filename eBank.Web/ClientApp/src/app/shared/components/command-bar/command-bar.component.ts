import { Component, OnInit, Input } from '@angular/core';
import { CommandBarItem } from '../../models/command-bar-item.interface';
import { AppBarService } from './../../services/app-bar.service';

@Component({
  selector: 'app-command-bar',
  templateUrl: './command-bar.component.html',
  styleUrls: ['./command-bar.component.scss']
})
export class CommandBarComponent implements OnInit {
  commandBarButtons: CommandBarItem[];
  constructor(private appBar: AppBarService) { }

  ngOnInit() {
    this.appBar.commanBarItems.subscribe(items => this.commandBarButtons = items);
  }

}
