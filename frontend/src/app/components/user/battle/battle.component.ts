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
import { MoveModel } from 'src/app/interfaces/models';

interface SelectedMove{
  [key: string]: number;
}

interface SelectedMovesData{
[key: string]: SelectedMove;
}

enum Trainer{
  User = "User",
  Enemy = "Enemy",
}

interface BattleLog{
  user: PokemonModel;
  move: String;
  targets: PokemonModel[];
  selfDamage?: PokemonModel;
  trainer: Trainer;
}

interface BattleResult{
  log: BattleLog;
  result: string;
}

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

  inBattleEnemySelectedMoves: (SelectedMovesData ) = {
    
  }

  battleLogs: BattleLog[] = [];

  battleResults: BattleResult[] = [];

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
    console.log("hi", user);
    const pokemon = this.enemySelectedPokemons[Number(user)];
    console.log(pokemon);
    const dialogRef = this.dialog.open(SelectTargetDialogComponent, {
      width: '40vw',
      data: { inBattleEnemyPokemons: this.inBattleEnemyPokemons, inBattleUserPokemons: this.inBattleUserPokemons, user },
    });


    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.createResults(pokemon!, move, result.targets, Trainer.Enemy, result.selfDamage);
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

  onChangeTeam(team: TeamModel){
      this.userSelectedPokemons = team.slots.map(slot => slot.pokemon);
      for (let i = this.userSelectedPokemons.length; i < 6; i++) {
        this.userSelectedPokemons[i] = undefined;
      }

      console.log(this.userSelectedPokemons);
  }

  onChangeMove(event: Event, index: number, user: PokemonModel) {
    if (!this.inBattleEnemySelectedMoves[user._id!]){
      this.inBattleEnemySelectedMoves[user._id!] = {};
    }

    
    this.inBattleEnemySelectedMoves[user._id!][(event.target as HTMLSelectElement).value] = index;
    
  }

  sortTurns(){
    this.enemyTurns.sort((a, b) => {
      if (a && b) {
        return b.stats.speed - a.stats.speed;
      }
      return 0;
    });
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

  createResults(user: PokemonModel, move: string , targets: PokemonModel[], trainer: Trainer, selfDamage?: PokemonModel ){
    console.log("aaaaaaa",user, move, targets, trainer, selfDamage);
    this.battleLogs.push({
      user: user,
      move: move,
      targets: targets,
      selfDamage: selfDamage,
      trainer: trainer,
    });
  }

  addResult(index: number,targetIndex:number, targetDamage: number){
    console.log(index, targetIndex, targetDamage);
    let result;
    if(targetIndex >= 0){
      result = `[${this.battleLogs[index].trainer}] El pokemon ${this.battleLogs[index].user.name} ha usado ${this.battleLogs[index].move} sobre ${this.battleLogs[index].targets.map(target => target.name).join(", ")} inflingiendo ${targetDamage} de daño.`;
      this.battleResults.push({
        log: {
          user: this.battleLogs[index].user,
          move: this.battleLogs[index].move,
          targets: [this.battleLogs[index].targets[targetIndex]],
          selfDamage: this.battleLogs[index].selfDamage ,
          trainer: this.battleLogs[index].trainer,
        },
        result: result,
      });
      this.battleLogs[index].targets.splice(targetIndex, 1);
    }
    else if(this.battleLogs[index].selfDamage){
      result = `[${this.battleLogs[index].trainer}] El pokemon ${this.battleLogs[index].user.name} ha usado ${this.battleLogs[index].move} sobre si mismo inflingiendo ${targetDamage} de daño.`;
      this.battleResults.push({
        log: {
          user: this.battleLogs[index].user,
          move: this.battleLogs[index].move,
          targets: [this.battleLogs[index].selfDamage!],
          selfDamage: this.battleLogs[index].selfDamage ,
          trainer: this.battleLogs[index].trainer,
        },
        result: result,
      });
      this.battleLogs[index].selfDamage = undefined;
    }
   
    if (this.battleLogs[index].targets.length === 0 && !this.battleLogs[index].selfDamage){
      this.battleLogs.splice(index, 1);
    }

    this.textarea?.append(result + "\n");
  }

  deleteResult(index: number, targetIndex: number){
    
    if(targetIndex >= 0){
      this.battleLogs[index].targets.splice(targetIndex, 1);
    }else if(this.battleLogs[index].selfDamage){
      this.battleLogs[index].selfDamage = undefined;
    }
    
    if (this.battleLogs[index].targets.length === 0 && !this.battleLogs[index].selfDamage){
      this.battleLogs.splice(index, 1);
    }
  }

  calcHp(){

  }

  calcSpeed(){

  }
}
