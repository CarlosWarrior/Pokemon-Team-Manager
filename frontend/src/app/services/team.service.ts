import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { notifyError } from '../utils/errors';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private httpClient: HttpClient, private snackbar: MatSnackBar) { }
  _request_snackbar_config: MatSnackBarConfig = { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 10000}
  
  create(){
    const token = localStorage.getItem(environment.tokenName)
    if(token)
      this.httpClient.post<any>(`${environment.api}/user/team/`, {}, { headers: { token } }).subscribe({
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
