import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TypeModel } from 'src/app/interfaces/models';

@Component({
  selector: 'app-type-edit-dialog',
  templateUrl: './type-edit-dialog.component.html',
  styleUrls: ['./type-edit-dialog.component.scss']
})
export class TypeEditDialogComponent {
  constructor( public dialogRef: MatDialogRef<TypeEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: TypeModel, ) {}
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
