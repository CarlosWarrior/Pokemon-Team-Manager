import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { io, Socket } from 'socket.io-client';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit{
  socket: Socket
  constructor(private teamService: TeamService){
    const token = localStorage.getItem(environment.tokenName)
    this.socket = io(environment.api, { auth: { token } })
  }
  ngOnInit(): void {
      this.socket.on('client-rankingUpdated', this.rankingUpdated)
  }
  rankingUpdated(state: any){
    console.log({state})
  }

  create(){
   this.teamService.create()
  }

  update(){
    this.teamService.update()
  }

  delete(){
    this.teamService.delete()
  }
}
