import { Injectable, OnInit } from '@angular/core';
import { CommandBarItem } from '../interfaces/command-bar-item.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AppBarService implements OnInit {
    private commandBarSource = new BehaviorSubject<CommandBarItem[]>([]);
    commanBarItems = this.commandBarSource.asObservable();
    constructor() {}

    ngOnInit() {
    }

    updateAppBar(appBarButtons: CommandBarItem[]) {
        this.commandBarSource.next(appBarButtons);
    }
}
