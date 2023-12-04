import { Component, Input } from '@angular/core';
import { PokemonModel } from 'src/app/interfaces/models';

@Component({
  selector: 'app-pokemon-user-card',
  templateUrl: './pokemon-user-card.component.html',
  styleUrls: ['./pokemon-user-card.component.scss']
})
export class PokemonUserCardComponent {
  constructor(){

  }
  
  @Input()
  pokemon: PokemonModel = {
    _id:"",
    number:0,
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
