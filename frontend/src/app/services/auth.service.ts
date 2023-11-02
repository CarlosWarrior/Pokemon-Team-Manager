import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CredentialResponse, accounts } from 'google-one-tap';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Credentials, Session, Entity, Registration, Passwords } from '../interfaces/auth';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { ErrorResponse } from '../interfaces/requests';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router, private snackbar: MatSnackBar) {
    const token = localStorage.getItem('token')
    if(token)
      this._loadUser(token)
  }
  private _entity$ = new BehaviorSubject<Entity | undefined>(undefined)
  public get entity(): Observable<Entity | undefined>{
    return this._entity$
  }

  _request_snackbar_config: MatSnackBarConfig = { horizontalPosition: 'center', verticalPosition: 'top', duration: 10000}
  _parseErrorResponse(error: HttpErrorResponse){
    let _error:ErrorResponse | undefined
    try {
      if(typeof error.error == 'string')
      _error = JSON.parse(error.error)
      else if(error instanceof Object)
      _error = error.error
      
    } catch (e) {
      _error = undefined
    }
    return _error
  }
  _notifyError = (e: HttpErrorResponse, scope: string) => {
    const error: ErrorResponse | undefined = this._parseErrorResponse(e)
    this.snackbar.open(error && error.message || "An error occurred", "Ok", this._request_snackbar_config)
    console.log(scope, {error})
  }

  _loadUser(token: string){
    const url: string = `${environment.api}/auth/load`
    this.httpClient.post<Session>(url, {}, { headers: { token } }).subscribe({
      next: (res: Session) => this._createSession(res),
      error: () => localStorage.removeItem('token')
    })
  }

  _createSession(res: Session){
    this.snackbar.open(`Welcome ${res.user.name}`, undefined, {...this._request_snackbar_config, duration: 2000})
    this._entity$.next(res.user)
    localStorage.setItem('token', res.token)
    this.goToHome()
  }
  
  goToHome(){
    this.router.navigate(['/'])
  }
  
  logout(){
    localStorage.removeItem('token')
    this._entity$.next(undefined)
    this.router.navigate(['/auth/login'])
  }
  
  google(google: CredentialResponse){
    const url: string = `${environment.api}/auth/google`
    this.httpClient.post<Session>(url, google).subscribe({
      next: (res: Session) => this._createSession(res),
      error: (e: HttpErrorResponse) => this._notifyError(e, "auth/google")
    })
  }
  
  login(credentials: Credentials, callback: () => void): Subscription {
    const url: string = `${environment.api}/auth/login`
    return this.httpClient.post<Session>(url, credentials).subscribe({
      next: (res: Session) => {
        this._createSession(res)
        callback()
      },
      error: (e: HttpErrorResponse) => {
        this._notifyError(e, "auth/login")
        callback()
      }
    })
  }
  
  register(registration: Registration, callback: () => void){
    const url: string = `${environment.api}/auth/register`
    return this.httpClient.post(url, registration, {responseType: 'text'}).subscribe({
      next: () => {
        const register_snackbar: MatSnackBarRef<TextOnlySnackBar> = this.snackbar.open(`An email confirmation was sent to: ${registration.email}`, "Ok", this._request_snackbar_config)
        const register_callback = () => this.router.navigate(['/login'])
        register_snackbar.onAction().subscribe(register_callback)
        register_snackbar.afterDismissed().subscribe(register_callback)
        callback()
      },
      error: (e: HttpErrorResponse) => {
        this._notifyError(e, "auth/register")
        callback()
      }
    })
  }
  
  confirm(token: string, callback: () => void){
    const url: string = `${environment.api}/auth/confirm`
    return this.httpClient.post<Session>(url, {}, { headers: { token } }).subscribe({
      next: (res: Session) => {
        this._createSession(res)
        callback()
      },
      error: (e: HttpErrorResponse) => {
        this._notifyError(e, "auth/confirm")
        callback()
      }
    })
  }

  resetPasswordToken(email: string, callback: () => void){
    const url: string = `${environment.api}/auth/password_reset_token`
    return this.httpClient.post(url, {email}, {responseType: 'text'}).subscribe({
      next: () => {
        const reset_token_snackbar: MatSnackBarRef<TextOnlySnackBar> = this.snackbar.open(`An email was sent to: ${email}`, "Ok", this._request_snackbar_config)
        const reset_token_callback = () => this.router.navigate(['/login'])
        reset_token_snackbar.onAction().subscribe(reset_token_callback)
        reset_token_snackbar.afterDismissed().subscribe(reset_token_callback)
        callback()
      },
      error: (e: HttpErrorResponse) => {
        this._notifyError(e, "auth/reset")
        callback()
      }
    })
  }

  resetPassword(passwords: Passwords, token: string, callback: () => void){
    const url: string = `${environment.api}/auth/password_reset`
    return this.httpClient.post(url, passwords, {responseType: 'text', headers: { token }}).subscribe({
      next: () => {
        const reset_snackbar: MatSnackBarRef<TextOnlySnackBar> = this.snackbar.open(`Password reset successfully`, "Ok", this._request_snackbar_config)
        const reset_callback = () => this.router.navigate(['/login'])
        reset_snackbar.onAction().subscribe(reset_callback)
        reset_snackbar.afterDismissed().subscribe(reset_callback)
        callback()
      },
      error: (e: HttpErrorResponse) => {
        this._notifyError(e, "auth/reset")
        callback()
      }
    })
  }
  
  admin_login(credentials: Credentials, callback: ()=>void ): Subscription {
    const url: string = `${environment.api}/auth/admin_login`
    return this.httpClient.post<Session>(url, credentials).subscribe({
      next: (res: Session) => {
        this._createSession(res)
        callback()
      },
      error: (e: HttpErrorResponse) => {
        this._notifyError(e, "auth/admin_login")
        callback()
      }
    })
  }

  sendAdminRegisterToken(email: string, callback: ()=>void){
    const url: string = `${environment.api}/auth/admin_register_token`
    const token = localStorage.getItem('token') || ''
    return this.httpClient.post(url, {email}, {responseType: 'text', headers: {token}}).subscribe({
      next: () => {
        const reset_token_snackbar: MatSnackBarRef<TextOnlySnackBar> = this.snackbar.open(`An email was sent to: ${email}`, "Ok", this._request_snackbar_config)
        const reset_token_callback = () => this.router.navigate(['/admin'])
        reset_token_snackbar.onAction().subscribe(reset_token_callback)
        reset_token_snackbar.afterDismissed().subscribe(reset_token_callback)
        callback()
      },
      error: (e: HttpErrorResponse) => {
        this._notifyError(e, "auth/sendAdminRegisterToken")
        callback()
      }
    })
  }

  admin_register(passwords: Passwords, token: string, callback: ()=>void){
    const url: string = `${environment.api}/auth/admin_register`
    return this.httpClient.post<Session>(url, passwords, {headers: { token }}).subscribe({
      next: (res:Session) => {
        this._createSession(res)
        callback()
      },
      error: (e: HttpErrorResponse) => {
        this._notifyError(e, "auth/admin_register")
        callback()
      }
    })
  }
  
  initGoogle(ngZone: NgZone){
    
    window.google.accounts.id.initialize({
      client_id: environment.google_api_client,
      ux_mode: 'popup',
      cancel_on_tap_outside: true,
      callback: (parameters) => {
        ngZone.run(() => {
          this.google(parameters);
        });
      },
    });
    
    setTimeout(() => {
      const googlebutton = document.getElementById('google-login') as HTMLElement
      window.google.accounts.id.renderButton(googlebutton, {
        size: 'large',
        width: 320,
        theme: 'filled_black',
        shape: 'pill'
      });
    }, 100)
  }
  
}