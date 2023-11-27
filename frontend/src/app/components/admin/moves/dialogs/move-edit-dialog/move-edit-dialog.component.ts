import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MoveCategory, MoveModel, TypeModel } from 'src/app/interfaces/models';

interface MoveEditDialogData{
  moveCategories: MoveCategory[],
  types: TypeModel[]
  move: MoveModel,
}
@Component({
  selector: 'app-move-edit-dialog',
  templateUrl: './move-edit-dialog.component.html',
  styleUrls: ['./move-edit-dialog.component.scss']
})
export class MoveEditDialogComponent {
  constructor( public dialogRef: MatDialogRef<MoveEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: MoveEditDialogData, ) {}
  
  action(){
    this.dialogRef.close(this.data)
  }
  onNoClick(): void {
    this.dialogRef.close(undefined);
  }
}