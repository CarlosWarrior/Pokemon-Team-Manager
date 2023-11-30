import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import { TypeModel } from 'src/app/interfaces/models';

interface TypeEditDialogData{
  typeNames: String[]
  type : TypeModel
  attackAdvantage: String[]
  defenseAdvantage: String[]
  defenseWeakness: String[]
}

@Component({
  selector: 'app-type-edit-dialog',
  templateUrl: './type-edit-dialog.component.html',
  styleUrls: ['./type-edit-dialog.component.scss']
})
export class TypeEditDialogComponent {
  constructor( public dialogRef: MatDialogRef<TypeEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: TypeEditDialogData, ) {
    const uniqueValidator = (control: AbstractControl): ValidationErrors | null => this.data.typeNames.includes(control.value ) ? {exists: {value: control.value}} : null
    this.form = new FormGroup({
      name: new FormControl(data.type.name, [Validators.required, Validators.minLength(3), Validators.maxLength(32), uniqueValidator]),
      image: new FormControl(data.type.image, [Validators.required]),
      teracrystalImage: new FormControl(data.type.teracrystalImage, [Validators.required]),
      color: new FormControl(data.type.color, [Validators.required]),
      attackAdvantage: new FormControl(data.type.attackAdvantage),
      defenseAdvantage: new FormControl(data.type.defenseAdvantage),
      defenseWeakness: new FormControl(data.type.defenseWeakness),
    })
  }
  
  type: TypeModel = {name: '', image: '', teracrystalImage: '', color: '', attackAdvantage: [], defenseAdvantage: [], defenseWeakness: [],}
  form: FormGroup

  nameError(){
    if(this.form.controls['name'].hasError('required'))
      return 'Name required'
    if(this.form.controls['name'].hasError('minlength'))
      return 'Minimum 3 charaters'
    if(this.form.controls['name'].hasError('exists'))
      return 'Type exists'
    return ''
  }

  imageError(){
    if(this.form.controls['image'].hasError('required'))
      return 'Image required'
    return ''
  }

  teracrystalImageError(){
    if(this.form.controls['teracrystalImage'].hasError('required'))
      return 'Teracrystal image required'
    return ''
  }

  colorError(){
    if(this.form.controls['color'].hasError('required'))
      return 'Color required'
    return ''
  }

  action(){
    if(this.form.valid)
      this.dialogRef.close({...this.form.value,  _id: this.data.type._id})
  }

  onNoClick(): void {
    this.dialogRef.close();
  
  }
}
