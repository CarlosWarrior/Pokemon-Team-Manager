import { Component, Input } from '@angular/core';
import { PokemonModel, TypeModel } from 'src/app/interfaces/models';

@Component({
  selector: 'app-pokemon-slot',
  templateUrl: './pokemon-slot.component.html',
  styleUrls: ['./pokemon-slot.component.scss']
})
export class PokemonSlotComponent {
  constructor(){

  }
  @Input()
  color: string = ""

  @Input()
  image: string = ""

  @Input()
  name: string = ""

}
