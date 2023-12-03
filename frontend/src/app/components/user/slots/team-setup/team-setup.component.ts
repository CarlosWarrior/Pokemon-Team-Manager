import { _isNumberValue } from '@angular/cdk/coercion';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbilityModel, ItemModel, MoveModel, PokemonGender, PokemonModel, PokemonSlot, SlotSetupData, Stats, TypeModel } from 'src/app/interfaces/models';

interface TeamSetupData{
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
    this.slots = this.data.pokemons.map((pokemon: PokemonModel, order: number) => {
      pokemon.moves.sort((move1: string, move2: string) => move1 > move2? 1 : -1)
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

  handleSelect(pokemon: PokemonModel){

  }

  validSlots(): boolean{
    let valid = true
    this.slots.forEach((slot: PokemonSlot) =>{
      console.log(slot)
      valid = valid &&
      ((_isNumberValue(slot.order) && slot.order >= 1 && slot.order <= 6 )?true:false) &&
      ((slot.gender)?true : false) &&
      ((slot.level >= 1 && slot.level <= 100)?true:false) &&
      ((slot.ability && slot.ability != "")?true:false) &&
      ((slot.tera_type && slot.tera_type != "")?true:false) &&
      ((slot.moves.length)?true:false) &&
      ((slot.evs)?true:false) &&
      ((slot.ivs)?true:false)
    })
    return valid
  }

  action(){
    if(this.validSlots() && this.name != "")
      this.dialogRef.close({slots: this.slots, name: this.name})
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
