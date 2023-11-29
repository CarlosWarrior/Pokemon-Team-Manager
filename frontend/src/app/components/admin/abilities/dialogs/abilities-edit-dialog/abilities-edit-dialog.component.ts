import { Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbilityModel } from 'src/app/interfaces/models';


interface AbilitiesEditDialogData{
  ability: AbilityModel,
  abilityNames: String[]
}

@Component({
  selector: 'app-abilities-edit-dialog',
  templateUrl: './abilities-edit-dialog.component.html',
  styleUrls: ['./abilities-edit-dialog.component.scss']
})
export class AbilitiesEditDialogComponent {
  constructor( public dialogRef: MatDialogRef<AbilitiesEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: AbilitiesEditDialogData, ) {
    const uniqueValidator = (control: AbstractControl): ValidationErrors | null => this.data.abilityNames.includes(control.value ) ? {exists: {value: control.value}} : null
    this.form = new FormGroup({
      name: new FormControl(data.ability.name, [Validators.required, Validators.minLength(3), Validators.maxLength(32), uniqueValidator]),
      effect:new FormControl(data.ability.effect, [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
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
