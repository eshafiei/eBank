import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

// local modules
import { MaterialModule } from 'src/app/material.module';

// local components
import { CommandBarComponent } from '../components/command-bar/command-bar.component';
import { AddressComponent } from './../components/address/address.component';

// local services
import { AppBarService } from './../services/app-bar.service';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [
    CommandBarComponent,
    AddressComponent
  ],
  providers: [AppBarService],
  exports: [
    CommandBarComponent,
    AddressComponent,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
