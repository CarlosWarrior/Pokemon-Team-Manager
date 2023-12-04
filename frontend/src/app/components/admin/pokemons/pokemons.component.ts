import { Component } from '@angular/core';
import { AbilityModel, MoveModel, PokemonModel, TypeModel } from '../../../interfaces/models'
import { PokemonService } from 'src/app/services/pokemon.service';
import { MatDialog } from '@angular/material/dialog';
import { PokemonEditDialogComponent } from './dialogs/pokemon-edit-dialog/pokemon-edit-dialog.component';
import { PokemonCreateDialogComponent } from './dialogs/pokemon-create-dialog/pokemon-create-dialog.component';
import { PokemonDeleteDialogComponent } from './dialogs/pokemon-delete-dialog/pokemon-delete-dialog.component';
import { TypeService } from 'src/app/services/type.service';
import { MoveService } from 'src/app/services/move.service';
import { AbilityService } from 'src/app/services/ability.service';
import { PokemonBulkCreateComponent } from './dialogs/pokemon-bulk-create/pokemon-bulk-create.component';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent {
  displayedColumns: string[] = ['name', 'description', 'image'];
  pokemons: PokemonModel[] = [];
  moves: MoveModel[] = [];
  types: TypeModel[] = [];
  abilities: AbilityModel[] = [];
  selected: PokemonModel[] = [];
  constructor(private pokemonService: PokemonService, private moveService: MoveService, private typeService: TypeService, private abilityService: AbilityService, public dialog: MatDialog){
    this.moveService.getList()
    this.typeService.getList()
    this.abilityService.getList()
    this.pokemonService.getList()
    this.moveService.moves.subscribe((moves: MoveModel[]) => this.moves = moves)
    this.typeService.types.subscribe((types: TypeModel[]) => this.types = types)
    this.abilityService.abilities.subscribe((abilities: AbilityModel[]) => this.abilities = abilities)
    this.pokemonService.pokemons.subscribe((pokemons: PokemonModel[]) => this.pokemons = pokemons)
  }
  
  isSelected(element: PokemonModel){
    return this.selected.find(el => el.name == element.name)
  }

  unselect(){
    this.selected = []
  }
  
  handleSelect(element: PokemonModel){
    if(this.isSelected(element))
      this.selected = this.selected.filter(el => el.name != element.name)
    else
      this.selected.push(element)
  }
  
  openCreateDialog(){
    const dialogRef = this.dialog.open(PokemonCreateDialogComponent, {
      data:{
        pokemonNumbers: this.pokemons.map((pokemon: PokemonModel) => `${pokemon.number}`),
        pokemonNames: this.pokemons.map((pokemon: PokemonModel) => pokemon.name),
        typeNames: this.types.map((type: TypeModel) => type.name),
        moveNames: this.moves.map((move: MoveModel) => move.name),
        abilityNames: this.abilities.map((ability: AbilityModel) => ability.name),
      }
    });
    
    dialogRef.afterClosed().subscribe((newPokemon: PokemonModel) => {
      if(newPokemon){
        this.pokemonService.create(newPokemon)
        this.unselect()
      }
    });
  }
  
  openEditDialog(){
    const dialogRef = this.dialog.open(PokemonEditDialogComponent, {
      data: {
        pokemon: this.selected[0],
        pokemonNumbers: this.pokemons.map((pokemon: PokemonModel) => `${pokemon.number}`),
        pokemonNames: this.pokemons.map((pokemon: PokemonModel) => pokemon.name),
        typeNames: this.types.map((type: TypeModel) => type.name),
        moveNames: this.moves.map((move: MoveModel) => move.name),
        abilityNames: this.abilities.map((ability: AbilityModel) => ability.name),
      },
    });
    
    dialogRef.afterClosed().subscribe((editedPokemon: PokemonModel) => {
      if(editedPokemon){
        this.pokemonService.edit(editedPokemon)
        this.unselect()
      }
    });
  }
  
  openDeleteDialog(){
    const dialogRef = this.dialog.open(PokemonDeleteDialogComponent, {
      data: this.selected
    });
    
    dialogRef.afterClosed().subscribe((deletedPokemons: PokemonModel[]) => {
      if(deletedPokemons){
        this.pokemonService.delete(deletedPokemons.map((pokemon: PokemonModel) => pokemon._id!))
        this.unselect()
      }
    });
  }

  openBulkCreateDialog(){
    const dialogRef = this.dialog.open(PokemonBulkCreateComponent);
    
    dialogRef.afterClosed().subscribe((data:any) => {
      if(data)
        this.pokemonService.bulk(data)
    });
  }

}