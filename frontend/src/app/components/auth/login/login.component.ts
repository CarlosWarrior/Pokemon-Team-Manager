import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Credentials } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService: AuthService) {}
  loading:boolean = false
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]);
  

  emailError() {
    if(this.email.hasError('required'))
      return 'Email required'
    if(this.email.hasError('email'))
      return 'Not a valid email'
    return ''
  }
  passwordError() {
    if (this.password.hasError('required')) 
      return 'Password required';
    if(this.password.hasError('minlength'))
      return 'Minimum 6 charaters'
    if(this.password.hasError('maxlength'))
      return 'Maximmum 32 charaters'
    return ''
  }

  login(){
    if(this.email.valid && this.password.valid){
      this.loading = true
      const credentials: Credentials = { email: this.email.value||'', password: this.password.value||''}
      this.authService.login(credentials, () => this.loading = false)
    }
  }

}
