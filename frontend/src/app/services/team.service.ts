import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { notifyError } from '../utils/errors';
import { TeamModel } from '../interfaces/models';
import { BehaviorSubject } from 'rxjs';

const _teams: TeamModel[] = []
const _pokemonSort = (a: TeamModel, b: TeamModel) => Number(a.name) > Number(b.name) ? 1 : -1

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private httpClient: HttpClient,  private snackbar: MatSnackBar) { }
  _request_snackbar_config: MatSnackBarConfig = { horizontalPosition: 'center', verticalPosition: 'top', duration: 10000}
  teams: BehaviorSubject<TeamModel[]> = new BehaviorSubject(_teams)

  getList(){
    const token = localStorage.getItem(environment.tokenName)
    if(token)
      this.httpClient.get<TeamModel[]>(`${environment.api}/user/team/`, { headers: { token } }).subscribe({
        next: (res: TeamModel[]) => this.teams.next(res),
        error: (e: HttpErrorResponse) => notifyError(e, "admin/teams/list", this.snackbar, this._request_snackbar_config)
      })
  }
  
  
  create(team: TeamModel){
    const token = localStorage.getItem(environment.tokenName)
    if(token)
      this.httpClient.post<any>(`${environment.api}/user/team/`, team, { headers: { token } }).subscribe({
        next:() => {

        },
        error:(e: HttpErrorResponse) => notifyError(e, "user/team/create", this.snackbar, this._request_snackbar_config)
      })
  }

  edit(team: TeamModel){
    const token = localStorage.getItem(environment.tokenName)
    if(token){
      this.httpClient.put<TeamModel>(`${environment.api}/user/team/`, team, { headers: { token } }).subscribe({
        next:(team: TeamModel) => this.teams.next(this.teams.getValue().map((_team: TeamModel) => _team._id == team._id?team:_team)),
        error:(e: HttpErrorResponse) => notifyError(e, "admin/teams/edit", this.snackbar, this._request_snackbar_config)
      })
    }

  }

  delete(teams: string[]){
    const token = localStorage.getItem(environment.tokenName)
    if(token){
      this.httpClient.delete<string[]>(`${environment.api}/user/team/`, { body: { teams }, headers: { token } }).subscribe({
        next:(teams: string[]) => this.teams.next(this.teams.getValue().filter((_team: TeamModel) => !teams.includes(_team._id!))),
        error:(e: HttpErrorResponse) => notifyError(e, "admin/teams/delete", this.snackbar, this._request_snackbar_config)
      })
    }
  }
}
