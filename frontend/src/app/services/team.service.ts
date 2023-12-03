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

  update(){
    const token = localStorage.getItem(environment.tokenName)
    if(token)
      this.httpClient.put<any>(`${environment.api}/user/team/`, {}, { headers: { token } }).subscribe({
        next:() => {

        },
        error:(e: HttpErrorResponse) => notifyError(e, "user/team/update", this.snackbar, this._request_snackbar_config)
      })
  }

  delete(){
    const token = localStorage.getItem(environment.tokenName)
    if(token)
      this.httpClient.delete<any>(`${environment.api}/user/team/`, { body: {}, headers: { token } }).subscribe({
        next:() => {

        },
        error:(e: HttpErrorResponse) => notifyError(e, "user/team/delete", this.snackbar, this._request_snackbar_config)
      })
  }
}
