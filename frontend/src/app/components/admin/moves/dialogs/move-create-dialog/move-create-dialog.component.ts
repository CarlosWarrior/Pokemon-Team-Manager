import { Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MoveCategory, MoveModel, TypeModel } from 'src/app/interfaces/models';

interface MoveCreateDialogData{
  moveNames: String[],
  moveCategories: MoveCategory[],
  types: TypeModel[]
}
@Component({
  selector: 'app-move-create-dialog',
  templateUrl: './move-create-dialog.component.html',
  styleUrls: ['./move-create-dialog.component.scss']
})
export class MoveCreateDialogComponent {
  constructor( public dialogRef: MatDialogRef<MoveCreateDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: MoveCreateDialogData, ) {
    const uniqueValidator = (control: AbstractControl): ValidationErrors | null => this.data.moveNames.includes(control.value ) ? {exists: {value: control.value}} : null
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(32), uniqueValidator]),
      power: new FormControl("", [Validators.required, Validators.min(1), Validators.max(500), Validators.pattern("^[0-9]*$")]),
      accuracy: new FormControl("", [Validators.required, Validators.max(100), Validators.pattern("^[0-9]*$")]),
      pp: new FormControl("", [Validators.required, Validators.min(1), Validators.max(100), Validators.pattern("^[0-9]*$")]),
      effect:new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
    })
  }
  move: MoveModel = {name: "", type: "", category: MoveCategory.Physical, power: 0, accuracy: 0, pp: 0, effect: "", }
  
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

  powerError(){
    if(this.form.controls['power'].hasError('required'))
      return 'Power required'
    if(this.form.controls['power'].hasError('min'))
      return 'Minimum 1'
    if(this.form.controls['power'].hasError('max'))
      return 'Maximum 500'
    if(this.form.controls['power'].hasError('pattern'))
      return 'Integer'
    return ''
  }

  accuracyError(){
    if(this.form.controls['accuracy'].hasError('required'))
      return 'Accuracy required'
    if(this.form.controls['accuracy'].hasError('max'))
      return 'Maximum 100'
    if(this.form.controls['accuracy'].hasError('pattern'))
      return 'Integer'
    return ''
  }
  

  ppError(){
    if(this.form.controls['pp'].hasError('required'))
      return 'PP required'
    if(this.form.controls['pp'].hasError('min'))
      return 'Minimum 1'
    if(this.form.controls['pp'].hasError('max'))
      return 'Maximum 100'
    if(this.form.controls['pp'].hasError('pattern'))
      return 'Integer'
    return ''
  }
  
  action(){
    if(this.form.valid)
      this.dialogRef.close({...this.form.value, type: this.move.type, category: this.move.category})
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
