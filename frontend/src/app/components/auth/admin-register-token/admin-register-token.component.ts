import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-admin-register-token',
  templateUrl: './admin-register-token.component.html',
  styleUrls: ['./admin-register-token.component.scss']
})
export class AdminRegisterTokenComponent {

  constructor(private authService: AuthService) {}
  email = new FormControl('', [Validators.required, Validators.email]);

  emailError() {
    if(this.email.hasError('required'))
      return 'Email required'
    if(this.email.hasError('email'))
      return 'Not a valid email'
    return ''
  }

  sendAdminRegisterToken() {
    if(this.email.valid) {
      this.authService.sendAdminRegisterToken(this.email.value!)
    }
  }
}
