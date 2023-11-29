import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MoveCategory, MoveModel, TypeModel } from 'src/app/interfaces/models';

interface MoveEditDialogData{
  move: MoveModel,
  moveNames : String[],
  types: TypeModel[],
  moveCategories: MoveCategory[],
}
@Component({
  selector: 'app-move-edit-dialog',
  templateUrl: './move-edit-dialog.component.html',
  styleUrls: ['./move-edit-dialog.component.scss']
})
export class MoveEditDialogComponent {
  constructor( public dialogRef: MatDialogRef<MoveEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: MoveEditDialogData, ) {
    const uniqueValidator = (control: AbstractControl): ValidationErrors | null => this.data.moveNames.includes(control.value ) ? {exists: {value: control.value}} : null
    this.form = new FormGroup({
      name: new FormControl(data.move.name, [Validators.required, Validators.minLength(3), Validators.maxLength(32), uniqueValidator]),
      power: new FormControl(data.move.power, [Validators.required, Validators.min(1), Validators.max(500), Validators.pattern("^[0-9]*$")]),
      accuracy: new FormControl(data.move.accuracy, [Validators.required, Validators.max(100), Validators.pattern("^[0-9]*$")]),
      pp: new FormControl(data.move.pp, [Validators.required, Validators.min(1), Validators.max(100), Validators.pattern("^[0-9]*$")]),
      effect:new FormControl(data.move.effect, [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
    })
    this.type = data.move.type
    this.category = data.move.category
  }

  form: FormGroup
  type: String = ""
  category: String = ""

  nameError(){
    if(this.form.controls['name'].hasError('required'))
      return 'Name required'
    if(this.form.controls['name'].hasError('minlength'))
      return 'Minimum 3 charaters'
    if(this.form.controls['name'].hasError('exists'))
      return 'Move exists'
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
      this.dialogRef.close({...this.form.value, type: this.type, category: this.category, _id: this.data.move._id})
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}