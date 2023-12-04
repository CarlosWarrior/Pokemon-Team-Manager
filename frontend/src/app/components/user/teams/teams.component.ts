import { Component, NgZone, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { io, Socket } from 'socket.io-client';
import { TeamService } from 'src/app/services/team.service';
import { AbilityModel, ItemModel, MoveModel, PokemonModel, PokemonSlot, Ranking, TeamModel, TypeModel } from 'src/app/interfaces/models';
import { TypeService } from 'src/app/services/type.service';
import { DeleteTeamDialogComponent } from './dialogs/delete-team-dialog/delete-team-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TeamSetupComponent } from '../slots/team-setup/team-setup.component';
import { ItemService } from 'src/app/services/item.service';
import { AbilityService } from 'src/app/services/ability.service';
import { MoveService } from 'src/app/services/move.service';
import { PokemonService } from 'src/app/services/pokemon.service';

const _ranking: Ranking = {
  "teamsCoverageRanking": [""],
  "teamsDefenseRanking": [""],
  "teamsCoverage": {},
  "teamsDefense": {},
  "teamsStates": {}
}

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent{
  socket: Socket
  constructor(private pokemonService: PokemonService, private moveService: MoveService, private typeService:TypeService, private abilityService: AbilityService, private itemService: ItemService, private teamService: TeamService, public dialog: MatDialog, private ngZone: NgZone){
    const token = localStorage.getItem(environment.tokenName)
    this.socket = io(environment.api, { auth: { token } })
    this.teamService.getList()
    this.pokemonService.getList()
    this.moveService.getList()
    this.typeService.getList()
    this.abilityService.getList()
    this.itemService.getList()
    
    this.teamService.teams.subscribe((teams: TeamModel[]) => this.teams = teams)
    this.pokemonService.pokemons.subscribe((pokemons: PokemonModel[]) => this.pokemons = pokemons)
    this.moveService.moves.subscribe((moves: MoveModel[]) => this.moves = moves.sort((e1: MoveModel, e2: MoveModel) => e1.name > e2.name? 1 : -1))
    this.typeService.types.subscribe((types: TypeModel[]) => this.types = types.sort((e1: TypeModel, e2: TypeModel) => e1.name > e2.name? 1 : -1))
    this.abilityService.abilities.subscribe((abilities: AbilityModel[]) => this.abilities = abilities.sort((e1: AbilityModel, e2: AbilityModel) => e1.name > e2.name? 1 : -1))
    this.itemService.items.subscribe((items: ItemModel[]) => this.items = items.sort((e1: ItemModel, e2: ItemModel) => e1.name > e2.name? 1 : -1))
    this.socket.on('client-RankingUpdated', (state: Ranking) => this.rankingUpdated(this.ngZone, state))
  }
  teams: TeamModel[] = []
  pokemons: PokemonModel[] = []
  moves: MoveModel[] = []
  types: TypeModel[] = []
  abilities: AbilityModel[] = []
  items: ItemModel[] = []
  ranking?: Ranking
  
  rankingUpdated(ngZone: NgZone, state: Ranking){
    ngZone.run(()=>{
      this.ranking = state
      console.log(this.ranking)
    })
  }

  getCoverageRanking = (teamId: string)=>{
    if(this.ranking)
      return this.ranking.teamsCoverageRanking.findIndex((team: string) => team == teamId ) + 1
    return 0
  }
  getDefenseRanking = (teamId: string)=>{
    if(this.ranking)
      return this.ranking.teamsDefenseRanking.findIndex((team: string) => team == teamId ) + 1
    return 0
  }

  getType = ((typeName: string) => this.types.find((type: TypeModel) => type.name == typeName))

  openEditDialog(team: TeamModel){
    const dialogRef = this.dialog.open(TeamSetupComponent, {
      data: {
        team,
        pokemons: team.slots.map((slot: PokemonSlot) => slot.pokemon),
        types: this.types,
        moves: this.moves,
        abilities: this.abilities,
        items: this.items,
      },
      
      height: "calc(100% - 30px)",
      width: "calc(100% - 30px)",
      maxWidth: "100%",
      maxHeight: "100%",
    });
    
    dialogRef.afterClosed().subscribe((editedTeam: TeamModel) => {
      if(editedTeam)
        this.teamService.edit(editedTeam)
    });
  }

  openDeleteDialog(team: TeamModel){
    console.log("asdasd", team)
    const dialogRef = this.dialog.open(DeleteTeamDialogComponent, {
      data: team._id
    });
    
    dialogRef.afterClosed().subscribe((teamId: string) => {
      console.log({teamId})
      if(teamId)
        this.teamService.delete([teamId])
      });
  }
}
