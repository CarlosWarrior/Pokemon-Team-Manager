import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AbilityModel, MoveModel, PokemonModel, TypeModel } from 'src/app/interfaces/models';
import { AbilityService } from 'src/app/services/ability.service';
import { MoveService } from 'src/app/services/move.service';
import { PokemonService } from 'src/app/services/pokemon.service';
import { TypeService } from 'src/app/services/type.service';

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
  constructor(private pokemonService: PokemonService, private moveService: MoveService, private typeService:TypeService, private abilityService: AbilityService){
    this.pokemonService.getList()
    this.moveService.getList()
    this.typeService.getList()
    this.abilityService.getList()

    this.pokemonService.pokemons.subscribe((pokemons: PokemonModel[]) => this.pokemons = pokemons.filter(this._filterOutSelected))
    this.moveService.moves.subscribe((moves: MoveModel[]) => this.moves = moves)
    this.typeService.types.subscribe((types: TypeModel[]) => this.types = types)
    this.abilityService.abilities.subscribe((abilities: AbilityModel[]) => this.abilities = abilities)    

  }

  _pokemons: PokemonModel[] = []
  pokemons: PokemonModel[] = []
  moves: MoveModel[] = []
  types: TypeModel[] = []
  abilities: AbilityModel[] = []
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
}
