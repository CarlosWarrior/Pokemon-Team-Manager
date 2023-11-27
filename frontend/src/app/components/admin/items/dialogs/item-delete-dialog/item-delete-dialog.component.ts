import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TypeModel } from 'src/app/interfaces/models';

@Component({
  selector: 'app-item-delete-dialog',
  templateUrl: './item-delete-dialog.component.html',
  styleUrls: ['./item-delete-dialog.component.scss']
})
export class ItemDeleteDialogComponent {
  constructor( public dialogRef: MatDialogRef<ItemDeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: TypeModel[], ) {}
  
  action(){
    this.dialogRef.close(this.data)
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
