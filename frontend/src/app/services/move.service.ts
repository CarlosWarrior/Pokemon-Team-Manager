import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MoveCategory, MoveModel } from '../interfaces/models';
import { BehaviorSubject } from 'rxjs';
import { notifyError } from '../utils/errors';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

const _moves: MoveModel[] = []
const _moveSort = (a: MoveModel, b: MoveModel) => a.name > b.name ? 1 : -1

@Injectable({
  providedIn: 'root'
})
export class MoveService {
  constructor(private httpClient: HttpClient,  private snackbar: MatSnackBar) { }
  _request_snackbar_config: MatSnackBarConfig = { horizontalPosition: 'center', verticalPosition: 'top', duration: 10000}
  moves: BehaviorSubject<MoveModel[]> = new BehaviorSubject(_moves)

  getList(){
    const token = localStorage.getItem(environment.tokenName)
    if(token)
      this.httpClient.get<MoveModel[]>(`${environment.api}/admin/move/`, { headers: { token } }).subscribe({
        next: (res: MoveModel[]) => this.moves.next(res),
        error: (e: HttpErrorResponse) => notifyError(e, "admin/moves/list", this.snackbar, this._request_snackbar_config)
      })
  }
  
  create(move: MoveModel){
    const token = localStorage.getItem(environment.tokenName)
    if(token){
      this.httpClient.post<MoveModel>(`${environment.api}/admin/move/`, move, { headers: { token } }).subscribe({
        next:(move: MoveModel) => {
          const _moves: MoveModel[] = this.moves.getValue()
          _moves.push(move)
          _moves.sort(_moveSort)
          this.moves.next([..._moves])
        },
        error:(e: HttpErrorResponse) => notifyError(e, "admin/moves/create", this.snackbar, this._request_snackbar_config)
      })
    }

  }

  edit(move: MoveModel){
    const token = localStorage.getItem(environment.tokenName)
    if(token){
      this.httpClient.put<MoveModel>(`${environment.api}/admin/move/`, move, { headers: { token } }).subscribe({
        next:(move: MoveModel) => this.moves.next(this.moves.getValue().map((_move: MoveModel) => _move._id == move._id?move:_move)),
        error:(e: HttpErrorResponse) => notifyError(e, "admin/moves/edit", this.snackbar, this._request_snackbar_config)
      })
    }

  }

  delete(moves: string[]){
    const token = localStorage.getItem(environment.tokenName)
    if(token){
      this.httpClient.delete<string[]>(`${environment.api}/admin/move/`, { body: { moves }, headers: { token } }).subscribe({
        next:(moves: string[]) => this.moves.next(this.moves.getValue().filter((_move: MoveModel) => !moves.includes(_move._id!))),
        error:(e: HttpErrorResponse) => notifyError(e, "admin/moves/delete", this.snackbar, this._request_snackbar_config)
      })
    }

  }

}