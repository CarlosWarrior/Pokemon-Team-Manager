import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


const confirmedValidator = (_control:FormGroup): ValidatorFn => (control: AbstractControl): ValidationErrors | null => 
  _control.controls['password'].value != control.value ? {confirmed: {value: control.value}} : null

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.scss']
})
export class AdminRegisterComponent {
  constructor( private authService: AuthService, private route: ActivatedRoute) {
    this.form = new FormGroup({
      name:new FormControl('', [Validators.required, Validators.minLength(3)]),
      password:new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
    })
    this.form.addControl('confirm_password', new FormControl('', [confirmedValidator(this.form)]))
  }
  loading:boolean = false
  form: FormGroup

  nameError(){
    if(this.form.controls['name'].hasError('required'))
      return 'Name required'
    if(this.form.controls['name'].hasError('minlength'))
      return 'Minimum 3 charaters'
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
    if(this.form.valid) {
      if(this.route.snapshot.queryParamMap.get('token') != null){
        this.loading = true
        this.authService.admin_register(this.form.value, this.route.snapshot.queryParamMap.get('token')!, () => this.loading = false)
      }
    }
  }

}
