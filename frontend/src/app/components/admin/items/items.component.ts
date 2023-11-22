import { Component } from '@angular/core';

export interface Item {
  name: string;
  description: string;
  image: string;
}

const ELEMENT_DATA: Item[] = [
  {name: 'Zoom Lens', description: 'Raises a move s accuracy if the holder moves after its target.', image: 'https://img.pokemondb.net/sprites/items/zoom-lens.png'}
];

@Component({
  selector: 'app-items',
  styleUrls: ['./items.component.scss'],
  templateUrl: './items.component.html',
})
export class ItemsComponent {
  displayedColumns: string[] = ['name', 'description', 'image'];
  dataSource = ELEMENT_DATA;
}
