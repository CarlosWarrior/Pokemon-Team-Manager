import { Component } from '@angular/core';
import { PokemonModel } from '../../../interfaces/models'
import { PokemonService } from 'src/app/services/pokemon.service';
import { MatDialog } from '@angular/material/dialog';
import { PokemonEditDialogComponent } from './dialogs/pokemon-edit-dialog/pokemon-edit-dialog.component';
import { PokemonCreateDialogComponent } from './dialogs/pokemon-create-dialog/pokemon-create-dialog.component';
import { PokemonDeleteDialogComponent } from './dialogs/pokemon-delete-dialog/pokemon-delete-dialog.component';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent {
  displayedColumns: string[] = ['name', 'description', 'image'];
  pokemons: PokemonModel[] = [];
  selected: PokemonModel[] = [];
  constructor(private pokemonService: PokemonService, public dialog: MatDialog){
    this.pokemonService.getList()
    this.pokemonService.pokemons.subscribe((pokemons: PokemonModel[]) => this.pokemons = pokemons)
  }
  
  isSelected(element: PokemonModel){
    return this.selected.find(el => el.name == element.name)
  }
  
  handleSelect(element: PokemonModel){
    if(this.isSelected(element))
      this.selected = this.selected.filter(el => el.name != element.name)
    else
      this.selected.push(element)
  }
  
  openCreateDialog(){
    const dialogRef = this.dialog.open(PokemonCreateDialogComponent);
    
    dialogRef.afterClosed().subscribe((newPokemon: PokemonModel) => {
      if(newPokemon)
        this.pokemonService.create(newPokemon)
    });
  }
  
  openEditDialog(){
    const dialogRef = this.dialog.open(PokemonEditDialogComponent, {
      data: this.selected[0],
    });
    
    dialogRef.afterClosed().subscribe((editedPokemon: PokemonModel) => {
      if(editedPokemon)
        this.pokemonService.edit(editedPokemon)
    });
  }
  
  openDeleteDialog(){
    const dialogRef = this.dialog.open(PokemonDeleteDialogComponent, {
      data: this.selected
    });
    
    dialogRef.afterClosed().subscribe((deletedPokemons: PokemonModel[]) => {
      if(deletedPokemons)
        this.pokemonService.delete(deletedPokemons.map((pokemon: PokemonModel) => pokemon._id!))
    });
  }
}