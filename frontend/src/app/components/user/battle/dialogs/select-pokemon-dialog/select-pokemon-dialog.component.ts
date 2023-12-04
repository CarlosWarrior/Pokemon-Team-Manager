import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PokemonModel } from 'src/app/interfaces/models';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-select-pokemon-dialog',
  templateUrl: './select-pokemon-dialog.component.html',
  styleUrls: ['./select-pokemon-dialog.component.scss'],
})
export class SelectPokemonDialogComponent {
  pokemons: PokemonModel[] = [];
  pokemon?: PokemonModel;

  constructor(
    public dialogRef: MatDialogRef<SelectPokemonDialogComponent>,
    private pokemonService: PokemonService
  ) {
    this.pokemonService.getList();
    this.pokemonService.pokemons.subscribe(
      (pokemons: PokemonModel[]) => (this.pokemons = pokemons)
    );
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
