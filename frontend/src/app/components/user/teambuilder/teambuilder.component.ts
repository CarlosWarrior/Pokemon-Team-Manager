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
  //selected: PokemonModel[] = []
  selected: PokemonModel[] = [{"_id":"656c7642cd8778e1ab27e4c7","number":384,"name":"rayquaza","image":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/384.png","type1":"dragon","type2":"flying","moves":["swords-dance","fly","bind","headbutt","body-slam","take-down","double-edge","roar","flamethrower","hydro-pump","surf","ice-beam","blizzard","hyper-beam","strength","solar-beam","thunderbolt","thunder-wave","thunder","earthquake","toxic","mimic","double-team","fire-blast","waterfall","swift","rest","rock-slide","substitute","snore","protect","scary-face","mud-slap","icy-wind","outrage","sandstorm","endure","swagger","fury-cutter","sleep-talk","return","frustration","iron-tail","hidden-power","twister","rain-dance","sunny-day","crunch","psych-up","extreme-speed","ancient-power","rock-smash","whirlpool","uproar","facade","helping-hand","brick-break","secret-power","dive","hyper-voice","overheat","rock-tomb","cosmic-power","aerial-ace","dragon-claw","bulk-up","dragon-dance","shock-wave","water-pulse","gyro-ball","natural-gift","tailwind","u-turn","fling","aqua-tail","air-slash","dragon-pulse","focus-blast","energy-ball","earth-power","giga-impact","avalanche","shadow-claw","defog","draco-meteor","iron-head","stone-edge","stealth-rock","hone-claws","round","echoed-voice","sky-drop","incinerate","bulldoze","dragon-tail","wild-charge","hurricane","confide","dragon-ascent","brutal-swing","breaking-swipe","scale-shot","meteor-beam","tera-blast"],"abilities":["air-lock"],"stats":{"hp":105,"attack":150,"defense":90,"specialAttack":150,"specialDefense":90,"speed":95}},{"_id":"656c7239cd8778e1ab27b55a","number":249,"name":"lugia","image":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/249.png","type1":"psychic","type2":"flying","moves":["gust","whirlwind","fly","headbutt","body-slam","double-edge","roar","mist","hydro-pump","surf","ice-beam","blizzard","hyper-beam","strength","thunderbolt","thunder-wave","thunder","earthquake","toxic","psychic","mimic","double-team","recover","light-screen","reflect","waterfall","swift","dream-eater","sky-attack","flash","rest","substitute","nightmare","snore","curse","aeroblast","protect","mud-slap","zap-cannon","icy-wind","detect","sandstorm","giga-drain","endure","swagger","steel-wing","sleep-talk","return","frustration","safeguard","dragon-breath","iron-tail","hidden-power","twister","rain-dance","sunny-day","psych-up","ancient-power","shadow-ball","future-sight","rock-smash","whirlpool","hail","facade","helping-hand","trick","skill-swap","imprison","secret-power","dive","hyper-voice","weather-ball","air-cutter","signal-beam","extrasensory","aerial-ace","calm-mind","shock-wave","water-pulse","roost","brine","natural-gift","tailwind","punishment","aqua-tail","air-slash","dragon-pulse","dragon-rush","earth-power","giga-impact","avalanche","zen-headbutt","defog","iron-head","charge-beam","ominous-wind","wonder-room","psyshock","telekinesis","round","echoed-voice","sky-drop","bulldoze","dragon-tail","hurricane","confide","laser-focus","scale-shot","dual-wingbeat"],"abilities":["pressure","multiscale"],"stats":{"hp":106,"attack":90,"defense":130,"specialAttack":90,"specialDefense":154,"speed":110}},{"_id":"656c7216cd8778e1ab27b3cb","number":245,"name":"suicune","image":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/245.png","type1":"water","moves":["cut","gust","headbutt","body-slam","double-edge","leer","bite","roar","mist","water-gun","hydro-pump","surf","ice-beam","blizzard","bubble-beam","aurora-beam","hyper-beam","dig","toxic","agility","mimic","double-team","reflect","waterfall","swift","rest","substitute","snore","curse","protect","mud-slap","icy-wind","detect","sandstorm","endure","swagger","sleep-talk","return","frustration","iron-tail","hidden-power","rain-dance","sunny-day","crunch","mirror-coat","psych-up","extreme-speed","shadow-ball","rock-smash","whirlpool","hail","facade","helping-hand","secret-power","dive","weather-ball","signal-beam","extrasensory","sheer-cold","calm-mind","water-pulse","brine","natural-gift","tailwind","air-slash","giga-impact","avalanche","ice-fang","rock-climb","iron-head","ominous-wind","round","scald","quash","bulldoze","snarl","confide","laser-focus","liquidation"],"abilities":["pressure","inner-focus"],"stats":{"hp":100,"attack":75,"defense":115,"specialAttack":90,"specialDefense":115,"speed":85}},{"_id":"656c720fcd8778e1ab27b377","number":244,"name":"entei","image":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/244.png","type1":"fire","moves":["cut","stomp","headbutt","body-slam","double-edge","leer","bite","roar","ember","flamethrower","hyper-beam","strength","solar-beam","fire-spin","dig","toxic","agility","mimic","double-team","smokescreen","reflect","fire-blast","swift","flash","rest","substitute","flame-wheel","snore","curse","reversal","protect","scary-face","mud-slap","detect","sandstorm","endure","swagger","sleep-talk","return","frustration","sacred-fire","iron-tail","hidden-power","rain-dance","sunny-day","crunch","psych-up","extreme-speed","shadow-ball","rock-smash","heat-wave","will-o-wisp","facade","helping-hand","eruption","secret-power","weather-ball","overheat","extrasensory","calm-mind","natural-gift","flare-blitz","giga-impact","fire-fang","rock-climb","lava-plume","iron-head","stone-edge","flame-charge","round","incinerate","quash","bulldoze","snarl","confide","laser-focus","stomping-tantrum","scorching-sands"],"abilities":["pressure","inner-focus"],"stats":{"hp":115,"attack":115,"defense":85,"specialAttack":90,"specialDefense":75,"speed":100}},{"_id":"656c7208cd8778e1ab27b322","number":243,"name":"raikou","image":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/243.png","type1":"electric","moves":["cut","headbutt","body-slam","double-edge","leer","bite","roar","hyper-beam","strength","thunder-shock","thunderbolt","thunder-wave","thunder","dig","toxic","agility","quick-attack","mimic","double-team","light-screen","reflect","swift","flash","rest","substitute","snore","curse","protect","mud-slap","zap-cannon","detect","sandstorm","endure","swagger","spark","sleep-talk","return","frustration","iron-tail","hidden-power","rain-dance","sunny-day","crunch","psych-up","extreme-speed","shadow-ball","rock-smash","facade","charge","helping-hand","secret-power","weather-ball","signal-beam","extrasensory","howl","calm-mind","shock-wave","natural-gift","magnet-rise","aura-sphere","giga-impact","thunder-fang","rock-climb","discharge","iron-head","charge-beam","round","scald","quash","volt-switch","bulldoze","wild-charge","snarl","confide","eerie-impulse","electric-terrain","laser-focus","throat-chop","rising-voltage"],"abilities":["pressure","inner-focus"],"stats":{"hp":90,"attack":85,"defense":75,"specialAttack":115,"specialDefense":100,"speed":115}},{"_id":"656c722ccd8778e1ab27b4ce","number":248,"name":"tyranitar","image":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/248.png","type1":"rock","type2":"dark","moves":["mega-punch","fire-punch","ice-punch","thunder-punch","cut","mega-kick","headbutt","tackle","body-slam","take-down","thrash","double-edge","leer","bite","roar","flamethrower","hydro-pump","surf","ice-beam","blizzard","hyper-beam","low-kick","counter","seismic-toss","strength","thunderbolt","thunder-wave","thunder","rock-throw","earthquake","dig","toxic","mimic","screech","double-team","focus-energy","fire-blast","rest","rock-slide","substitute","nightmare","snore","curse","spite","protect","scary-face","mud-slap","icy-wind","detect","outrage","sandstorm","endure","swagger","fury-cutter","attract","sleep-talk","return","frustration","dynamic-punch","dragon-breath","iron-tail","hidden-power","rain-dance","sunny-day","crunch","ancient-power","rock-smash","whirlpool","uproar","torment","facade","focus-punch","taunt","helping-hand","superpower","revenge","brick-break","knock-off","secret-power","rock-tomb","sand-tomb","muddy-water","aerial-ace","iron-defense","block","dragon-claw","mud-shot","dragon-dance","rock-blast","shock-wave","water-pulse","natural-gift","payback","assurance","fling","rock-polish","dark-pulse","aqua-tail","dragon-pulse","power-gem","focus-blast","earth-power","giga-impact","avalanche","shadow-claw","thunder-fang","ice-fang","fire-fang","rock-climb","iron-head","stone-edge","captivate","stealth-rock","hone-claws","smack-down","heavy-slam","foul-play","round","chip-away","incinerate","retaliate","bulldoze","dragon-tail","snarl","confide","power-up-punch","high-horsepower","brutal-swing","stomping-tantrum","body-press","breaking-swipe","lash-out","tera-blast"],"abilities":["sand-stream","unnerve"],"stats":{"hp":100,"attack":134,"defense":110,"specialAttack":95,"specialDefense":100,"speed":61}}]
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
