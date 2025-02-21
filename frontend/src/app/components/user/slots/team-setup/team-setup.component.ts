import { _isNumberValue } from '@angular/cdk/coercion';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbilityModel, ItemModel, MoveModel, PokemonGender, PokemonModel, PokemonSlot, SlotSetupData, Stats, TeamModel, TypeModel } from 'src/app/interfaces/models';

interface TeamSetupData{
  team?:TeamModel
  pokemons:PokemonModel[]
  types:TypeModel[]
  items:ItemModel[]
  abilities:AbilityModel[]
  moves:MoveModel[]
}
const _stat: Stats = {
  hp: 0,
  attack: 0,
  defense: 0,
  specialAttack: 0,
  specialDefense: 0,
  speed: 0,
}

@Component({
  selector: 'app-team-setup',
  templateUrl: './team-setup.component.html',
  styleUrls: ['./team-setup.component.scss']
})
export class TeamSetupComponent {
  constructor( public dialogRef: MatDialogRef<TeamSetupComponent>, @Inject(MAT_DIALOG_DATA) public data: TeamSetupData, ) {
    console.log(this.data.team)
    if(this.data.team)
      this.name = this.data.team.name
    this.slots = this.data.pokemons.map((pokemon: PokemonModel, order: number) => {
      pokemon.moves.sort((move1: string, move2: string) => move1 > move2? 1 : -1)
      if(this.data.team)
        return this.data.team.slots.find((slot: PokemonSlot) => slot.pokemon._id == pokemon._id)!
      else
        return {
          order: order + 1,
          pokemon,
          gender: PokemonGender.Male,
          item: "",
          level: 100,
          ability: "",
          tera_type: "",
          moves: [],
          evs:_stat,
          ivs: _stat,
        }
    })
  }
  name: string = ""
  slots: PokemonSlot[] = []
  slotData: SlotSetupData = {
    typeNames: this.data.types.map((type: TypeModel) => type.name),
    itemNames: this.data.items.map((item: ItemModel) => item.name),
    abilityNames: this.data.abilities.map((ability: AbilityModel) => ability.name),
    moveNames: this.data.moves.map((move: MoveModel) => move.name),
  }

  getType(type: string): TypeModel{
    return this.data.types.find((_type: TypeModel) => _type.name == type)!
  }


  validSlots(): boolean{
    let valid = true
    this.slots.forEach((slot: PokemonSlot) =>{

      const validorder = ((_isNumberValue(slot.order) && slot.order >= 1 && slot.order <= 6 ))?true:false
      const validgender = ((slot.gender))?true:false
      const validlevel = ((slot.level >= 1 && slot.level <= 100))?true:false
      const validability = ((slot.ability && slot.ability != ""))?true:false
      const validtera_type = ((slot.tera_type && slot.tera_type != ""))?true:false
      const validmoves = ((slot.moves.length))?true:false
      const validevs = ((slot.evs))?true:false
      const validivs = ((slot.ivs))?true:false
      console.log(slot.pokemon.name, {validorder , validgender, validlevel, validability, validtera_type, validmoves , validevs , validivs})
      valid = valid && validorder && validgender&& validlevel&& validability&& validtera_type&& validmoves && validevs && validivs
    })
    return valid
  }

  action(){
    if(this.validSlots() && this.name != "")
      if(this.data.team)
        this.dialogRef.close({slots: this.slots, name: this.name, _id: this.data.team._id})
      else
        this.dialogRef.close({slots: this.slots, name: this.name})
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
