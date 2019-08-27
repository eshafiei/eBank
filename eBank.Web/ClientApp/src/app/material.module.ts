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
  MatCheckboxModule
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
    MatCheckboxModule
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
    MatCheckboxModule
  ]
})
export class MaterialModule {}
