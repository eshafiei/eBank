import { NgModule } from '@angular/core';

import {
  MatFormFieldModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatMenuModule,
  MatButtonModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  MatStepperModule,
  MatSidenavModule,
  MatListModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatStepperModule,
    MatSidenavModule,
    MatListModule
  ],
  exports: [
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatStepperModule,
    MatSidenavModule,
    MatListModule
  ]
})
export class MaterialModule {}
