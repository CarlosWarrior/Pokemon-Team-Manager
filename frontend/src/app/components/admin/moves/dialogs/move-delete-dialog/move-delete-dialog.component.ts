import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MoveModel } from 'src/app/interfaces/models';

@Component({
  selector: 'app-move-delete-dialog',
  templateUrl: './move-delete-dialog.component.html',
  styleUrls: ['./move-delete-dialog.component.scss']
})
export class MoveDeleteDialogComponent {
  constructor( public dialogRef: MatDialogRef<MoveDeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: MoveModel[], ) {}
  
  action(){
    this.dialogRef.close(this.data)
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
