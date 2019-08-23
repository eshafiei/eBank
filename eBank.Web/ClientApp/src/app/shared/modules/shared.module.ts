import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// local modules
import { MaterialModule } from 'src/app/material.module';

// local components
import { CommandBarComponent } from '../components/command-bar/command-bar.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [CommandBarComponent],
  exports: [CommandBarComponent]
})
export class SharedModule { }
