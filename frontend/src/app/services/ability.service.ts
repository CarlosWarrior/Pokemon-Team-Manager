import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AbilityModel } from '../interfaces/models';
import { BehaviorSubject } from 'rxjs';
import { notifyError } from '../utils/errors';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

const _abilities: AbilityModel[] = []
const _abilitySort = (a: AbilityModel, b: AbilityModel) => a.name > b.name ? 1 : -1

@Injectable({
  providedIn: 'root'
})
export class AbilityService {

  constructor(private httpClient: HttpClient,  private snackbar: MatSnackBar) { }
  _request_snackbar_config: MatSnackBarConfig = { horizontalPosition: 'center', verticalPosition: 'top', duration: 10000}
  abilities: BehaviorSubject<AbilityModel[]> = new BehaviorSubject(_abilities)

  getList(){
    const token = localStorage.getItem(environment.tokenName)
    if(token)
      this.httpClient.get<AbilityModel[]>(`${environment.api}/admin/ability/`, { headers: { token } }).subscribe({
        next: (res: AbilityModel[]) => this.abilities.next(res),
        error: (e: HttpErrorResponse) => notifyError(e, "admin/abilities/list", this.snackbar, this._request_snackbar_config)
      })
  }
  
  create(ability: AbilityModel){
    const token = localStorage.getItem(environment.tokenName)
    if(token){
      this.httpClient.post<AbilityModel>(`${environment.api}/admin/ability/`, ability, { headers: { token } }).subscribe({
        next:(ability: AbilityModel) => {
          const _abilities: AbilityModel[] = this.abilities.getValue()
          _abilities.push(ability)
          _abilities.sort(_abilitySort)
          this.abilities.next([..._abilities])
        },
        error:(e: HttpErrorResponse) => notifyError(e, "admin/abilities/create", this.snackbar, this._request_snackbar_config)
      })
    }

  }

  edit(ability: AbilityModel){
    const token = localStorage.getItem(environment.tokenName)
    if(token){
      this.httpClient.put<AbilityModel>(`${environment.api}/admin/ability/`, ability, { headers: { token } }).subscribe({
        next:(ability: AbilityModel) => this.abilities.next(this.abilities.getValue().map((_ability: AbilityModel) => _ability._id == ability._id?ability:_ability)),
        error:(e: HttpErrorResponse) => notifyError(e, "admin/abilities/edit", this.snackbar, this._request_snackbar_config)
      })
    }

  }

  delete(abilitiess: string[]){
    const token = localStorage.getItem(environment.tokenName)
    if(token){
      this.httpClient.delete<string[]>(`${environment.api}/admin/ability/`, { body: { abilitiess }, headers: { token } }).subscribe({
        next:(abilities: string[]) => this.abilities.next(this.abilities.getValue().filter((_ability: AbilityModel) => !abilities.includes(_ability._id!))),
        error:(e: HttpErrorResponse) => notifyError(e, "admin/abilities/delete", this.snackbar, this._request_snackbar_config)
      })
    }

  }

}
