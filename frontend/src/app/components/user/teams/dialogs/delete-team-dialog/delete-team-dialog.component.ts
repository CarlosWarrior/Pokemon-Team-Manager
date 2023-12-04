import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TeamModel } from 'src/app/interfaces/models';
@Component({
  selector: 'app-delete-team-dialog',
  templateUrl: './delete-team-dialog.component.html',
  styleUrls: ['./delete-team-dialog.component.scss']
})
export class DeleteTeamDialogComponent {
  constructor( public dialogRef: MatDialogRef<DeleteTeamDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: TeamModel[], ) {}
  
  action(){
    this.dialogRef.close(this.data)
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
