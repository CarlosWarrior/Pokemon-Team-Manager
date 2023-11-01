import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

const confirmedValidator = (_control:FormGroup): ValidatorFn => (control: AbstractControl): ValidationErrors | null => 
  _control.controls['password'].value != control.value ? {confirmed: {value: control.value}} : null
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor( private authService: AuthService) {
    this.form = new FormGroup({
      email:new FormControl('', [Validators.required, Validators.email]),
      name:new FormControl('', [Validators.required, Validators.minLength(3)]),
      password:new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
    })
    this.form.addControl('confirm_password', new FormControl('', [confirmedValidator(this.form)]))
  }
  
  form: FormGroup

  nameError(){
    if(this.form.controls['name'].hasError('required'))
      return 'Name required'
    if(this.form.controls['name'].hasError('minlength'))
      return 'Minimum 3 charaters'
    return ''
  }
  emailError() {
    if(this.form.controls['email'].hasError('required'))
      return 'Email required'
    if(this.form.controls['email'].hasError('email'))
      return 'Not a valid email'
    return ''
  }
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
  
  register(){
    this.authService.register(this.form.value)
  }

}
