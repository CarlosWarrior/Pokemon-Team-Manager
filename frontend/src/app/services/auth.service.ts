import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CredentialResponse } from 'google-one-tap';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Credentials, Session, Entity, Registration } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router) {}
  private _entity$ = new BehaviorSubject<Entity | undefined>(undefined)
  public get entity(): Observable<Entity | undefined>{
    return this._entity$
  }
  
  logout(){
    localStorage.removeItem('token')
    this._entity$.next(undefined)
    this.router.navigate(['/auth/login'])
  }

  google(google: CredentialResponse){
    const url: string = `${environment.api}/auth/google`
    this.httpClient.post<Session>(url, google).subscribe({
      next: (res) => {
        this._entity$.next(res.user)
        localStorage.setItem('token', res.token)
        this.router.navigate(['/'])
      },
      error: (error) => console.log("Google Login", {error})
    })
  }
  
  login(credentials: Credentials): Subscription {
    const url: string = `${environment.api}/auth/login`
    return this.httpClient.post<Session>(url, credentials).subscribe({
      next: (res) => {
        this._entity$.next(res.user)
        localStorage.setItem('token', res.token)
        this.router.navigate(['/'])
      },
      error: (error) => console.log("Login", {error})
    })
  }
  
  register(registration: Registration){
    const url: string = `${environment.api}/auth/register`
    return this.httpClient.post(url, registration, {responseType: 'text'}).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (error) => console.log("Register", {error})
    })
  }

  admin_login(credentials: Credentials): Subscription {
    const url: string = `${environment.api}/auth/admin_login`
    return this.httpClient.post<Session>(url, credentials).subscribe({
      next: (res) => {
        this._entity$.next(res.user)
        localStorage.setItem('token', res.token)
        this.router.navigate(['/'])
      },
      error: (error) => console.log("Admin Login", {error})
    })
  }
}