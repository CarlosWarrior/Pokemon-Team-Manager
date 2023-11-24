import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TypeModel } from 'src/app/interfaces/models';

@Component({
  selector: 'app-type-create-dialog',
  templateUrl: './type-create-dialog.component.html',
  styleUrls: ['./type-create-dialog.component.scss']
})
export class TypeCreateDialogComponent {
  constructor( public dialogRef: MatDialogRef<TypeCreateDialogComponent>) {}
  type: TypeModel = {name: '', image: '', teracrystalImage: '', color: ''}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
