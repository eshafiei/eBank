import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';

// local modules
import { MaterialModule } from '../shared/modules/material.module';

// local components
import { CommandBarComponent } from './components/command-bar/command-bar.component';
import { AdditionalInfoComponent } from './components/additional-info/additional-info.component';
import { AddressComponent } from './components/address/address.component';
import { WeatherComponent } from './containers/weather/weather.component';

// local services
import { AppBarService } from './services/app-bar.service';
import { WeatherService } from './services/weather.service';
import { AutoLogoutService } from './services/auto-logout.service';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.states';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers as any, {}),
    EffectsModule.forRoot([AuthEffects]),
    CurrencyMaskModule
  ],
  declarations: [
    CommandBarComponent,
    AdditionalInfoComponent,
    ConfirmationDialogComponent,
    AddressComponent,
    WeatherComponent
  ],
  providers: [AppBarService, WeatherService, DatePipe, AutoLogoutService],
  exports: [
    CommandBarComponent,
    AdditionalInfoComponent,
    AddressComponent,
    WeatherComponent,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    ConfirmationDialogComponent
  ],
  entryComponents: [AdditionalInfoComponent, ConfirmationDialogComponent]
})
export class SharedModule {}
