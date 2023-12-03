import { Component, NgZone, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { io, Socket } from 'socket.io-client';
import { TeamService } from 'src/app/services/team.service';
import { PokemonModel, Ranking, TeamModel, TypeModel } from 'src/app/interfaces/models';
import { BehaviorSubject } from 'rxjs';
import { TypeService } from 'src/app/services/type.service';

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
  constructor(private teamService: TeamService, private typeService: TypeService, private ngZone: NgZone,){
    const token = localStorage.getItem(environment.tokenName)
    this.socket = io(environment.api, { auth: { token } })
    this.teamService.getList()
    this.typeService.getList()
    this.teamService.teams.subscribe((teams: TeamModel[]) => this.teams = teams)
    this.typeService.types.subscribe((types: TypeModel[]) => this.types = types)
    this.socket.on('client-RankingUpdated', (state: Ranking) => this.rankingUpdated(this.ngZone, state))
  }
  teams: TeamModel[] = []
  types: TypeModel[] = []
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


  update(){
    this.teamService.update()
  }

  delete(){
    this.teamService.delete()
  }
}
