import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PokemonModel } from 'src/app/interfaces/models';

@Component({
  selector: 'app-pokemon-delete-dialog',
  templateUrl: './pokemon-delete-dialog.component.html',
  styleUrls: ['./pokemon-delete-dialog.component.scss']
})
export class PokemonDeleteDialogComponent {
  constructor( public dialogRef: MatDialogRef<PokemonDeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: PokemonModel[], ) {}
  
  action(){
    this.dialogRef.close(this.data)
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
