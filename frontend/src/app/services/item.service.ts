import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ItemModel } from '../interfaces/models';
import { BehaviorSubject } from 'rxjs';
import { notifyError } from '../utils/errors';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

const _items: ItemModel[] = []
const _itemSort = (a: ItemModel, b: ItemModel) => a.name > b.name ? 1 : -1

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private httpClient: HttpClient,  private snackbar: MatSnackBar) { }
  _request_snackbar_config: MatSnackBarConfig = { horizontalPosition: 'center', verticalPosition: 'top', duration: 10000}
  items: BehaviorSubject<ItemModel[]> = new BehaviorSubject(_items)

  getList(){
    const token = localStorage.getItem(environment.tokenName)
    if(token)
      this.httpClient.get<ItemModel[]>(`${environment.api}/admin/item/`, { headers: { token } }).subscribe({
        next: (res: ItemModel[]) => this.items.next(res),
        error: (e: HttpErrorResponse) => notifyError(e, "admin/items/list", this.snackbar, this._request_snackbar_config)
      })
  }
  
  create(item: ItemModel){
    const token = localStorage.getItem(environment.tokenName)
    if(token){
      this.httpClient.post<ItemModel>(`${environment.api}/admin/item/`, item, { headers: { token } }).subscribe({
        next:(item: ItemModel) => {
          const items: ItemModel[] = this.items.getValue()
          items.push(item)
          items.sort(_itemSort)
          this.items.next([...items])
        },
        error:(e: HttpErrorResponse) => notifyError(e, "admin/items/create", this.snackbar, this._request_snackbar_config)
      })
    }

  }

  edit(item: ItemModel){
    const token = localStorage.getItem(environment.tokenName)
    if(token){
      this.httpClient.put<ItemModel>(`${environment.api}/admin/item/`, item, { headers: { token } }).subscribe({
        next:(item: ItemModel) => this.items.next(this.items.getValue().map((_item: ItemModel) => _item._id == item._id?item:_item)),
        error:(e: HttpErrorResponse) => notifyError(e, "admin/items/edit", this.snackbar, this._request_snackbar_config)
      })
    }

  }

  delete(items: string[]){
    const token = localStorage.getItem(environment.tokenName)
    if(token){
      this.httpClient.delete<string[]>(`${environment.api}/admin/item/`, { body: { items }, headers: { token } }).subscribe({
        next:(items: string[]) => this.items.next(this.items.getValue().filter((_item: ItemModel) => !items.includes(_item._id!))),
        error:(e: HttpErrorResponse) => notifyError(e, "admin/items/delete", this.snackbar, this._request_snackbar_config)
      })
    }

  }

}
