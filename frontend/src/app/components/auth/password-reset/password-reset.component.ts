import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

const confirmedValidator = (_control:FormGroup): ValidatorFn => (control: AbstractControl): ValidationErrors | null => 
  _control.controls['password'].value != control.value ? {confirmed: {value: control.value}} : null
@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent {
  constructor( private authService: AuthService, private route: ActivatedRoute) {

    if(this.route.snapshot.queryParamMap.get('token') == null){
      this.form = new FormGroup({})
      this.authService.goToHome()
    }
    else{
      this.form = new FormGroup({
        password:new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
      })
      this.form.addControl('confirm_password', new FormControl('', [confirmedValidator(this.form)]))
    }

    
  }
  form: FormGroup
  
  passwordError() {
    if (this.form.controls['password'].hasError('required')) 
      return 'Password required';
    if(this.form.controls['password'].hasError('minlength'))
      return 'Minimum 6 charaters'
    if(this.form.controls['password'].hasError('maxlength'))
      return 'Maximmum 32 charaters'
    return ''
  }
  confirmPasswordError(){
    if(this.form.controls['confirm_password'].hasError('confirmed'))
      return 'Passwords must match'
    return ''
  }

  resetPassword() {
    if(this.form.valid) {
      if(this.route.snapshot.queryParamMap.get('token') != null)
        this.authService.resetPassword(this.form.value, this.route.snapshot.queryParamMap.get('token')!)
    }
  }
  


}4