import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PokemonModel } from 'src/app/interfaces/models';
import { PokemonService } from 'src/app/services/pokemon.service';

interface SelectPokemonDialogData {
  pokemons: PokemonModel[];
}

@Component({
  selector: 'app-select-pokemon-dialog',
  templateUrl: './select-pokemon-dialog.component.html',
  styleUrls: ['./select-pokemon-dialog.component.scss'],
})
export class SelectPokemonDialogComponent {
  
  pokemon?: PokemonModel;

  constructor(
    public dialogRef: MatDialogRef<SelectPokemonDialogData>,
    @Inject(MAT_DIALOG_DATA) public data: SelectPokemonDialogData
  ) {
    
  }

  action() {
    this.dialogRef.close(this.pokemon);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  isSelected(pokemon: PokemonModel) {
    return this.pokemon?._id === pokemon._id;
  }
  handleSelect(pokemon: PokemonModel) {
    this.pokemon = pokemon;
  }
}
