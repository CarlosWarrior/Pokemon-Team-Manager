import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbilityModel } from 'src/app/interfaces/models';


@Component({
  selector: 'app-abilities-create-dialog',
  templateUrl: './abilities-create-dialog.component.html',
  styleUrls: ['./abilities-create-dialog.component.scss']
})
export class AbilitiesCreateDialogComponent {
  constructor( public dialogRef: MatDialogRef<AbilitiesCreateDialogComponent>) {}
  ability: AbilityModel = {name: '', effect: ''}
  action(){
    this.dialogRef.close(this.ability)
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
