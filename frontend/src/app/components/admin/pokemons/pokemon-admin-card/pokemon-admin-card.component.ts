import { Component, Input } from '@angular/core';
import { PokemonModel } from 'src/app/interfaces/models';

@Component({
  selector: 'app-pokemon-admin-card',
  templateUrl: './pokemon-admin-card.component.html',
  styleUrls: ['./pokemon-admin-card.component.scss']
})
export class PokemonAdminCardComponent {
  constructor(){

  }
  
  @Input()
  pokemon: PokemonModel = {
    _id:"",
    name:"",
    image:"",
    type1:"",
    type2:"",
    moves:[""],
    abilities:[""],
    stats:{
      hp: 0,
      attack: 0,
      defense: 0,
      specialAttack: 0,
      specialDefense: 0,
      speed: 0,
    },
  };

}
