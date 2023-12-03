import { Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemModel } from 'src/app/interfaces/models';


interface ItemCreateDialogData{
  itemNames: [string]
}

@Component({
  selector: 'app-item-create-dialog',
  templateUrl: './item-create-dialog.component.html',
  styleUrls: ['./item-create-dialog.component.scss']
})
export class ItemCreateDialogComponent {
  constructor( public dialogRef: MatDialogRef<ItemCreateDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: ItemCreateDialogData, ) {
    const uniqueValidator = (control: AbstractControl): ValidationErrors | null => this.data.itemNames.includes(control.value ) ? {exists: {value: control.value}} : null
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(32), uniqueValidator]),
      description:new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
      image:new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
    })
  }

  form: FormGroup
  
  nameError(){
    if(this.form.controls['name'].hasError('required'))
      return 'Name required'
    if(this.form.controls['name'].hasError('minlength'))
      return 'Minimum 3 charaters'
    if(this.form.controls['name'].hasError('exists'))
      return 'Item exists'
    return ''
  }

  descriptionError(){
    if(this.form.controls['description'].hasError('required'))
      return 'Effect required'
    if(this.form.controls['description'].hasError('minlength'))
      return 'Minimum 3 charaters'
    return ''
  }

  imageError(){
    if(this.form.controls['image'].hasError('required'))
      return 'Effect required'
    if(this.form.controls['image'].hasError('minlength'))
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
