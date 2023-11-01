import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './password-reset-token.component.html',
  styleUrls: ['./password-reset-token.component.scss']
})
export class PasswordResetTokenComponent {
  constructor(private authService: AuthService) {}
  email = new FormControl('', [Validators.required, Validators.email]);

  emailError() {
    if(this.email.hasError('required'))
      return 'Email required'
    if(this.email.hasError('email'))
      return 'Not a valid email'
    return ''
  }

  resetPasswordToken() {
    if(this.email.valid) {
      this.authService.resetPasswordToken(this.email.value!)
    }
  }

}
