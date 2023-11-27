import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbilityModel } from 'src/app/interfaces/models';

@Component({
  selector: 'app-abilities-delete-dialog',
  templateUrl: './abilities-delete-dialog.component.html',
  styleUrls: ['./abilities-delete-dialog.component.scss']
})
export class AbilitiesDeleteDialogComponent {
  constructor( public dialogRef: MatDialogRef<AbilitiesDeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: AbilityModel[], ) {}
  
  action(){
    this.dialogRef.close(this.data)
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
