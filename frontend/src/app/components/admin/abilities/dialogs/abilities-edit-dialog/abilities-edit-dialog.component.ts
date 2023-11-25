import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbilityModel } from 'src/app/interfaces/models';

@Component({
  selector: 'app-abilities-edit-dialog',
  templateUrl: './abilities-edit-dialog.component.html',
  styleUrls: ['./abilities-edit-dialog.component.scss']
})
export class AbilitiesEditDialogComponent {
  constructor( public dialogRef: MatDialogRef<AbilitiesEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: AbilityModel, ) {}
  
  onNoClick(): void {
    this.dialogRef.close();
  }

}
