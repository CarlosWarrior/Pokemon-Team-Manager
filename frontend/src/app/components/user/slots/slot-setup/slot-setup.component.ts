import { Component, Input } from '@angular/core';
import { PokemonSlot, SlotSetupData } from 'src/app/interfaces/models';


@Component({
  selector: 'app-slot-setup',
  templateUrl: './slot-setup.component.html',
  styleUrls: ['./slot-setup.component.scss']
})
export class SlotSetupComponent {

  @Input()
  slot!: PokemonSlot

  @Input()
  data!: SlotSetupData

}
