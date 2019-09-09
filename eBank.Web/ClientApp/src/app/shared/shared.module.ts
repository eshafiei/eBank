import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

// local modules
import { MaterialModule } from '../shared/modules/material.module';

// local components
import { CommandBarComponent } from './components/command-bar/command-bar.component';
import { AddressComponent } from './components/address/address.component';
import { WeatherComponent } from './containers/weather/weather.component';

// local services
import { AppBarService } from './services/app-bar.service';
import { WeatherService } from './services/weather.service';
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
    AddressComponent,
    WeatherComponent
  ],
  providers: [
    AppBarService,
    WeatherService],
  exports: [
    CommandBarComponent,
    AddressComponent,
    WeatherComponent,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }