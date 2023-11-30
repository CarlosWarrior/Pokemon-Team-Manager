import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PokemonModel } from '../interfaces/models';
import { BehaviorSubject } from 'rxjs';
import { notifyError } from '../utils/errors';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

const _pokemons: PokemonModel[] = []
const pokemonSort = (a: PokemonModel, b: PokemonModel) => a.name > b.name ? 1 : -1

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  constructor(private httpClient: HttpClient,  private snackbar: MatSnackBar) { }
  _request_snackbar_config: MatSnackBarConfig = { horizontalPosition: 'center', verticalPosition: 'top', duration: 10000}
  pokemons: BehaviorSubject<PokemonModel[]> = new BehaviorSubject(_pokemons)

  getList(){
    const token = localStorage.getItem(environment.tokenName)
    if(token)
      this.httpClient.get<PokemonModel[]>(`${environment.api}/admin/pokemon/`, { headers: { token } }).subscribe({
        next: (res: PokemonModel[]) => this.pokemons.next(res),
        error: (e: HttpErrorResponse) => notifyError(e, "admin/pokemons/list", this.snackbar, this._request_snackbar_config)
      })
  }
  
  create(pokemon: PokemonModel){
    const token = localStorage.getItem(environment.tokenName)
    if(token){
      this.httpClient.post<PokemonModel>(`${environment.api}/admin/pokemon/`, pokemon, { headers: { token } }).subscribe({
        next:(pokemon: PokemonModel) => {
          const _pokemons: PokemonModel[] = this.pokemons.getValue()
          _pokemons.push(pokemon)
          _pokemons.sort(pokemonSort)
          this.pokemons.next([..._pokemons])
        },
        error:(e: HttpErrorResponse) => notifyError(e, "admin/pokemons/create", this.snackbar, this._request_snackbar_config)
      })
    }

  }

  edit(pokemon: PokemonModel){
    const token = localStorage.getItem(environment.tokenName)
    if(token){
      this.httpClient.put<PokemonModel>(`${environment.api}/admin/pokemon/`, pokemon, { headers: { token } }).subscribe({
        next:(pokemon: PokemonModel) => this.pokemons.next(this.pokemons.getValue().map((pokemon: PokemonModel) => pokemon._id == pokemon._id?pokemon:pokemon)),
        error:(e: HttpErrorResponse) => notifyError(e, "admin/pokemons/edit", this.snackbar, this._request_snackbar_config)
      })
    }

  }

  delete(pokemons: string[]){
    const token = localStorage.getItem(environment.tokenName)
    if(token){
      this.httpClient.delete<string[]>(`${environment.api}/admin/pokemon/`, { body: { pokemons }, headers: { token } }).subscribe({
        next:(pokemons: string[]) => this.pokemons.next(this.pokemons.getValue().filter((pokemon: PokemonModel) => !pokemons.includes(pokemon._id!))),
        error:(e: HttpErrorResponse) => notifyError(e, "admin/pokemons/delete", this.snackbar, this._request_snackbar_config)
      })
    }

  }

}
