import { Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbilityModel } from 'src/app/interfaces/models';

interface AbilityCreateDialogData {
  abilityNames: String[]
}
@Component({
  selector: 'app-abilities-create-dialog',
  templateUrl: './abilities-create-dialog.component.html',
  styleUrls: ['./abilities-create-dialog.component.scss']
})
export class AbilitiesCreateDialogComponent {
  constructor( public dialogRef: MatDialogRef<AbilitiesCreateDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: AbilityCreateDialogData, ) {
    const uniqueValidator = (control: AbstractControl): ValidationErrors | null => this.data.abilityNames.includes(control.value ) ? {exists: {value: control.value}} : null
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(32), uniqueValidator]),
      effect:new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
    })
  }

  form: FormGroup
  
  nameError(){
    if(this.form.controls['name'].hasError('required'))
      return 'Name required'
    if(this.form.controls['name'].hasError('minlength'))
      return 'Minimum 3 charaters'
    if(this.form.controls['name'].hasError('exists'))
      return 'Ability exists'
    return ''
  }

  effectError(){
    if(this.form.controls['effect'].hasError('required'))
      return 'Effect required'
    if(this.form.controls['effect'].hasError('minlength'))
      return 'Minimum 3 charaters'
    return ''
  }
  
  action(){
    if(this.form.valid)
      this.dialogRef.close(this.form.value)
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  
}
