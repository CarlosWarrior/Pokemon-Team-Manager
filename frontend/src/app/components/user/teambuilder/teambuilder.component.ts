import { Component } from '@angular/core';
import { AbilityModel, ItemModel, MoveModel, PokemonModel, TeamModel, TypeModel } from 'src/app/interfaces/models';
import { AbilityService } from 'src/app/services/ability.service';
import { MoveService } from 'src/app/services/move.service';
import { PokemonService } from 'src/app/services/pokemon.service';
import { TypeService } from 'src/app/services/type.service';
import { TeamSetupComponent } from '../slots/team-setup/team-setup.component';
import { MatDialog } from '@angular/material/dialog';
import { TeamService } from 'src/app/services/team.service';
import { ItemService } from 'src/app/services/item.service';

const _type: TypeModel = {
  color: "",
  image: "",
  teracrystalImage: "",
  name: "",
  attackAdvantage: [""],
  defenseAdvantage: [""],
  defenseWeakness: [""],
}

@Component({
  selector: 'app-teambuilder',
  templateUrl: './teambuilder.component.html',
  styleUrls: ['./teambuilder.component.scss']
})
export class TeambuilderComponent {
  constructor(private pokemonService: PokemonService, private moveService: MoveService, private typeService:TypeService, private abilityService: AbilityService, private itemService: ItemService, private teamService: TeamService, public dialog: MatDialog){
    this.pokemonService.getList()
    this.moveService.getList()
    this.typeService.getList()
    this.abilityService.getList()
    this.itemService.getList()

    this.pokemonService.pokemons.subscribe((pokemons: PokemonModel[]) => this.pokemons = pokemons.filter(this._filterOutSelected))
    this.moveService.moves.subscribe((moves: MoveModel[]) => this.moves = moves.sort((e1: MoveModel, e2: MoveModel) => e1.name > e2.name? 1 : -1))
    this.typeService.types.subscribe((types: TypeModel[]) => this.types = types.sort((e1: TypeModel, e2: TypeModel) => e1.name > e2.name? 1 : -1))
    this.abilityService.abilities.subscribe((abilities: AbilityModel[]) => this.abilities = abilities.sort((e1: AbilityModel, e2: AbilityModel) => e1.name > e2.name? 1 : -1))
    this.itemService.items.subscribe((items: ItemModel[]) => this.items = items.sort((e1: ItemModel, e2: ItemModel) => e1.name > e2.name? 1 : -1))

  }

  _pokemons: PokemonModel[] = []
  pokemons: PokemonModel[] = []
  moves: MoveModel[] = []
  types: TypeModel[] = []
  abilities: AbilityModel[] = []
  items: ItemModel[] = []
  selected: PokemonModel[] = []
  _filterOutSelected = (pokemon: PokemonModel):boolean => !this.selected.find((selectedPokemon: PokemonModel) => pokemon._id == selectedPokemon._id)
  _sortPokemons = (pokemon1: PokemonModel, pokemon2: PokemonModel):number => pokemon1.number - pokemon2.number

  getType(type: string): TypeModel{
    return this.types.find((_type: TypeModel) => _type.name == type) || _type
  }

  isSelected(element: PokemonModel){
    return this.selected.find(el => el.name == element.name)
  }

  unselect(){
    this.selected = []
  }

  handleSelect(pokemon: PokemonModel){
    if(this.isSelected(pokemon)){
      this.selected = this.selected.filter((selectedPokemon: PokemonModel) => pokemon._id != selectedPokemon._id)
      this.pokemons.push(pokemon)
      this.pokemons.sort(this._sortPokemons)
    }
    else{
      this.selected.push(pokemon)
      this.pokemons = this.pokemons.filter((listedPokemon: PokemonModel) => pokemon._id != listedPokemon._id)
    }
  }

  openCreateDialog(){
    const dialogRef = this.dialog.open(TeamSetupComponent, {
      data: {
        pokemons: this.selected,
        types: this.types,
        moves: this.moves,
        abilities: this.abilities,
        items: this.items,
      },
      
      height: "calc(100% - 30px)",
      width: "calc(100% - 30px)",
      maxWidth: "100%",
      maxHeight: "100%",
    });
    
    dialogRef.afterClosed().subscribe((team: TeamModel) => {
      if(team){
        this.teamService.create(team)
        this.unselect()
      }
    });
  }
}
