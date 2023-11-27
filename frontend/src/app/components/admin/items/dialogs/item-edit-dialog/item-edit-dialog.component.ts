import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemModel } from 'src/app/interfaces/models';

@Component({
  selector: 'app-item-edit-dialog',
  templateUrl: './item-edit-dialog.component.html',
  styleUrls: ['./item-edit-dialog.component.scss']
})
export class ItemEditDialogComponent {
  constructor( public dialogRef: MatDialogRef<ItemEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: ItemModel, ) {}
  
  action(){
    this.dialogRef.close(this.data)
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
