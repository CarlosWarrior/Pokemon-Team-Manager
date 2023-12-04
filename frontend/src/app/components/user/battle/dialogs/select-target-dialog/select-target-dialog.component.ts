import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PokemonModel } from 'src/app/interfaces/models';
import { PokemonService } from 'src/app/services/pokemon.service';

interface SelectTargetDialogData {
  inBattleEnemyPokemons: (PokemonModel | undefined)[];
  inBattleUserPokemons: (PokemonModel | undefined)[];
}

@Component({
  selector: 'app-select-target-dialog',
  templateUrl: './select-target-dialog.component.html',
  styleUrls: ['./select-target-dialog.component.scss'],
})
export class SelectTargetDialogComponent {
  inBattleEnemyPokemons: (PokemonModel | undefined)[] = [undefined, undefined];
  inBattleUserPokemons: (PokemonModel | undefined)[] = [undefined, undefined];

  targets: (PokemonModel | undefined)[] = [
    undefined,
    undefined,
    undefined,
    undefined,
  ];

  selectedTargets: boolean[] = [false, false, false, false];

  resultTargets: (PokemonModel | undefined)[] = [];

  constructor(
    public dialogRef: MatDialogRef<SelectTargetDialogComponent>,
    private pokemonService: PokemonService,
    @Inject(MAT_DIALOG_DATA) public data: SelectTargetDialogData
  ) {
    this.targets[0] = this.data.inBattleEnemyPokemons[0];
    this.targets[1] = this.data.inBattleEnemyPokemons[1];
    this.targets[2] = this.data.inBattleUserPokemons[0];
    this.targets[3] = this.data.inBattleUserPokemons[1];
  }

  action() {
    for (let i = 0; i < this.selectedTargets.length; i++) {
      if (this.selectedTargets[i]) {
        this.resultTargets.push(this.targets[i]);
      }
    }
    this.dialogRef.close(this.resultTargets);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
