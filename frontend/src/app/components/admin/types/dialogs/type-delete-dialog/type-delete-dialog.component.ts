import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TypeModel } from 'src/app/interfaces/models';

@Component({
  selector: 'app-type-delete-dialog',
  templateUrl: './type-delete-dialog.component.html',
  styleUrls: ['./type-delete-dialog.component.scss']
})
export class TypeDeleteDialogComponent {
  constructor( public dialogRef: MatDialogRef<TypeDeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: TypeModel[], ) {}
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
