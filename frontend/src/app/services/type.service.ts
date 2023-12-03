import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TypeModel } from '../interfaces/models';
import { BehaviorSubject } from 'rxjs';
import { notifyError } from '../utils/errors';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

const _types: TypeModel[] = []
const _typeSort = (a: TypeModel, b: TypeModel) => a.name > b.name ? 1 : -1

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private httpClient: HttpClient,  private snackbar: MatSnackBar) { }
  _request_snackbar_config: MatSnackBarConfig = { horizontalPosition: 'center', verticalPosition: 'top', duration: 10000}
  types: BehaviorSubject<TypeModel[]> = new BehaviorSubject(_types)

  getList(){
    const token = localStorage.getItem(environment.tokenName)
    if(token)
      this.httpClient.get<TypeModel[]>(`${environment.api}/admin/type/`, { headers: { token } }).subscribe({
        next: (res: TypeModel[]) => this.types.next(res),
        error: (e: HttpErrorResponse) => notifyError(e, "admin/types/list", this.snackbar, this._request_snackbar_config)
      })
  }
  
  create(type: TypeModel){
    const token = localStorage.getItem(environment.tokenName)
    if(token){
      this.httpClient.post<TypeModel>(`${environment.api}/admin/type/`, type, { headers: { token } }).subscribe({
        next:(type: TypeModel) => {
          const types: TypeModel[] = this.types.getValue()
          types.push(type)
          types.sort(_typeSort)
          this.types.next([...types])
        },
        error:(e: HttpErrorResponse) => notifyError(e, "admin/types/create", this.snackbar, this._request_snackbar_config)
      })
    }

  }

  edit(type: TypeModel){
    const token = localStorage.getItem(environment.tokenName)
    if(token){
      this.httpClient.put<TypeModel>(`${environment.api}/admin/type/`, type, { headers: { token } }).subscribe({
        next:(type: TypeModel) => this.types.next(this.types.getValue().map((_type: TypeModel) => _type._id == type._id?type:_type)),
        error:(e: HttpErrorResponse) => notifyError(e, "admin/types/edit", this.snackbar, this._request_snackbar_config)
      })
    }

  }

  delete(types: string[]){
    const token = localStorage.getItem(environment.tokenName)
    if(token){
      this.httpClient.delete<string[]>(`${environment.api}/admin/type/`, { body: { types }, headers: { token } }).subscribe({
        next:(types: string[]) => this.types.next(this.types.getValue().filter((_type: TypeModel) => !types.includes(_type._id!))),
        error:(e: HttpErrorResponse) => notifyError(e, "admin/types/delete", this.snackbar, this._request_snackbar_config)
      })
    }

  }

  bulk(data: FormData){
    const token = localStorage.getItem(environment.tokenName)
    if(token){
      this.httpClient.post<TypeModel[]>(`${environment.api}/admin/type/bulk`, data, { headers: { token } }).subscribe({
        next:(newtypes: TypeModel[]) => {
          const types: TypeModel[] = this.types.getValue()
          for (let ti = 0; ti < newtypes.length; ti++) {
            const type = newtypes[ti];
            types.push(type)
          }
          types.sort(_typeSort)
          this.types.next([...types])
        },
        error:(e: HttpErrorResponse) => notifyError(e, "admin/types/bulk", this.snackbar, this._request_snackbar_config)
      })
    }

  }

}