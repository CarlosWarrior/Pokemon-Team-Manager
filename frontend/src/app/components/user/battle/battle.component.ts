import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { SelectPokemonDialogComponent } from './dialogs/select-pokemon-dialog/select-pokemon-dialog.component';
import { PokemonModel } from 'src/app/interfaces/models';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TeamsComponent } from '../teams/teams.component';
import { TeamService } from 'src/app/services/team.service';
import { TeamModel } from 'src/app/interfaces/models';
import { SelectTargetDialogComponent } from './dialogs/select-target-dialog/select-target-dialog.component';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
})
export class BattleComponent implements AfterContentInit {
  enemySelectedPokemons: (PokemonModel | undefined)[] = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ];

  inBattleEnemyPokemons: (PokemonModel | undefined)[] = [
    undefined,
    undefined,
  ];  

  enemyTurns = this.inBattleEnemyPokemons;

  userSelectedPokemons: (PokemonModel | undefined)[] = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ];

  inBattleUserPokemons: (PokemonModel | undefined)[] = [
    undefined,
    undefined,
  ];

  userTurns = this.inBattleUserPokemons;

  teams: TeamModel[] = [];
  team?: TeamModel;
  textarea: HTMLTextAreaElement | null | undefined;

  showSelfDamage: boolean = false;

  constructor(public dialog: MatDialog,
    private teamService: TeamService,
    
  ) {
    this.teamService.getList();
    this.teamService.teams.subscribe((teams: TeamModel[]) => this.teams = teams);

  }
  ngAfterContentInit(): void {
    this.textarea = document.getElementById("log") as HTMLTextAreaElement;
  }

  showPokemonDialog(index: number) {
    const dialogRef = this.dialog.open(SelectPokemonDialogComponent, {
      width: '40vw',
      data: { name: 'test' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result){
        this.enemySelectedPokemons[index] = result;
        for (let i = 0; i < this.inBattleEnemyPokemons.length; i++) {
          this.inBattleEnemyPokemons[i] = undefined;
        }
        this.enemyTurns = this.inBattleEnemyPokemons;
      }
    });
  }

  showEnemyTargetDialog(user: string, move: string) {
    console.log("hi");
    const dialogRef = this.dialog.open(SelectTargetDialogComponent, {
      width: '40vw',
      data: { inBattleEnemyPokemons: this.inBattleEnemyPokemons, inBattleUserPokemons: this.inBattleUserPokemons },
    });


    dialogRef.afterClosed().subscribe((result) => {
      this.createResults(user, move, result);
    });

  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.enemyTurns, event.previousIndex, event.currentIndex);
  }

  onChange(event: Event, index: number) {
    console.log(index);
    const value = +(event.target as HTMLSelectElement).value;
    this.inBattleEnemyPokemons[index] = this.enemySelectedPokemons[value];

    this.enemyTurns = [
      ...this.inBattleEnemyPokemons,
    ];

    this.sortTurns();
  }

  onChangeTeam(event: Event){

  }

  sortTurns(){
    this.enemyTurns.sort((a, b) => {
      if (a && b) {
        return b.stats.speed - a.stats.speed;
      }
      return 0;
    });
  }


  addResult(){
    console.log(this.textarea);
    this.textarea?.append('test\n');
  }

  deleteResult(){
    
  }

  downloadLog(){
    const file = new Blob([this.textarea!.value], {type: 'text/plain'});

    const a = document.createElement('a');
    const url = URL.createObjectURL(file);

    a.href = url;
    a.download = 'log.txt';
    a.click();

    URL.revokeObjectURL(url);
    a.remove();
  }

  createResults(user: string, move: string, targets: PokemonModel[]){
    console.log(user, move, targets);
  }

  calcHp(){

  }

  calcSpeed(){

  }
}
