import { Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemModel } from 'src/app/interfaces/models';

interface ItemEditDialogData{
  item: ItemModel,
  itemNames: [string]
}

@Component({
  selector: 'app-item-edit-dialog',
  templateUrl: './item-edit-dialog.component.html',
  styleUrls: ['./item-edit-dialog.component.scss']
})
export class ItemEditDialogComponent {
  constructor( public dialogRef: MatDialogRef<ItemEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: ItemEditDialogData, ) {

    const uniqueValidator = (control: AbstractControl): ValidationErrors | null => this.data.itemNames.includes(control.value ) ? {exists: {value: control.value}} : null
    this.form = new FormGroup({
      name: new FormControl(data.item.name, [Validators.required, Validators.minLength(3), Validators.maxLength(32), uniqueValidator]),
      description:new FormControl(data.item.description, [Validators.required, Validators.minLength(10)]),
      image:new FormControl(data.item.image, [Validators.required]),
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

  descriptionError(){
    if(this.form.controls['description'].hasError('required'))
      return 'Effect required'
    if(this.form.controls['description'].hasError('minlength'))
      return 'Minimum 1 charaters'
    return ''
  }

  imageError(){
    if(this.form.controls['image'].hasError('required'))
      return 'Effect required'
    return ''
  }

  action(){
    if(this.form.valid)
      this.dialogRef.close({...this.form.value, _id: this.data.item._id}) 
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
