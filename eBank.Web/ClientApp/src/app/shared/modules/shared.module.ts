import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

// local modules
import { MaterialModule } from 'src/app/material.module';

// local components
import { CommandBarComponent } from '../components/command-bar/command-bar.component';

// local services
import { AppBarService } from './../services/app-bar.service';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
  ],
  declarations: [CommandBarComponent],
  providers: [AppBarService],
  exports: [
    CommandBarComponent,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class SharedModule { }
