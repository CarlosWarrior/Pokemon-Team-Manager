import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatCardModule } from '@angular/material/card'
import { MatListModule } from '@angular/material/list'
import { MatInputModule } from '@angular/material/input'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatButtonModule } from '@angular/material/button'
import { MatDividerModule } from '@angular/material/divider'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDividerModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTableModule
  ]
})
export class MaterialModule { }
