import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators, FormBuilder} from '@angular/forms';
import { TypeModel } from 'src/app/interfaces/models';

interface TypeCreateDialogData{
  typeNames: String[]
  attackAdvantage: String[]
  defenseAdvantage: String[]
  defenseWeakness: String[]
}

@Component({
  selector: 'app-type-create-dialog',
  templateUrl: './type-create-dialog.component.html',
  styleUrls: ['./type-create-dialog.component.scss']
})
export class TypeCreateDialogComponent {
  constructor( public dialogRef: MatDialogRef<TypeCreateDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: TypeCreateDialogData, ) {
    const uniqueValidator = (control: AbstractControl): ValidationErrors | null => this.data.typeNames.includes(control.value ) ? {exists: {value: control.value}} : null
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(32), uniqueValidator]),
      image: new FormControl("", [Validators.required]),
      teracrystalImage: new FormControl("", [Validators.required]),
      color: new FormControl("", [Validators.required]),
      attackAdvantage: new FormControl([""]),
      defenseAdvantage: new FormControl([""]),
      defenseWeakness: new FormControl([""]),
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
    console.log(this.form.value)
    if(this.form.valid)
      this.dialogRef.close(this.form.value)
  }

  onNoClick(): void {
    this.dialogRef.close();
  
  }

}
