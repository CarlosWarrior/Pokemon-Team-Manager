import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MoveCategory, MoveModel, TypeModel } from 'src/app/interfaces/models';

interface MoveCreateDialogData{
  moveCategories: MoveCategory[],
  types: TypeModel[]
}
@Component({
  selector: 'app-move-create-dialog',
  templateUrl: './move-create-dialog.component.html',
  styleUrls: ['./move-create-dialog.component.scss']
})
export class MoveCreateDialogComponent {
  constructor( public dialogRef: MatDialogRef<MoveCreateDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: MoveCreateDialogData, ) {}
  move: MoveModel = {name: "", type: "", category: MoveCategory.Physical, power: 0, accuracy: 0, pp: 0, effect: "", }
  onNoClick(): void {
    this.dialogRef.close(undefined);
  }
}
