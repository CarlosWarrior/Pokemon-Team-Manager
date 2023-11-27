import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemModel } from 'src/app/interfaces/models';


@Component({
  selector: 'app-item-create-dialog',
  templateUrl: './item-create-dialog.component.html',
  styleUrls: ['./item-create-dialog.component.scss']
})
export class ItemCreateDialogComponent {
  constructor( public dialogRef: MatDialogRef<ItemCreateDialogComponent>) {}
  item: ItemModel = {name: '', image: '', description: '',}
  action(){
    this.dialogRef.close(this.item)
  }
  onNoClick(){
    this.dialogRef.close();
  }
}
