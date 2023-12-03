import { Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbilityModel, MoveModel, Stats, TypeModel } from 'src/app/interfaces/models';

interface PokemonCreateDialogData{
  moveNames: string[];
  typeNames: string[];
  abilityNames: string[];
  pokemonNames: string[];
  pokemonNumbers: string[];
}
@Component({
  selector: 'app-pokemon-create-dialog',
  templateUrl: './pokemon-create-dialog.component.html',
  styleUrls: ['./pokemon-create-dialog.component.scss']
})
export class PokemonCreateDialogComponent {
  constructor( public dialogRef: MatDialogRef<PokemonCreateDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: PokemonCreateDialogData, ) {
    const uniqueNameValidator = (control: AbstractControl): ValidationErrors | null => this.data.pokemonNames.includes(control.value) ? {existsName: {value: control.value}} : null
    const uniqueNumberValidator = (control: AbstractControl): ValidationErrors | null => {
      console.log(this.data.pokemonNumbers.includes(control.value), control.value, this.data.pokemonNumbers)
      return this.data.pokemonNumbers.includes(control.value ) ? {existsNumber: {value: control.value}} : null
    }
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(32), uniqueNameValidator]),
      number: new FormControl(0, [Validators.required, Validators.pattern("^[0-9]*$"), uniqueNumberValidator]),
      image: new FormControl("", [Validators.required]),
      type1: new FormControl("", [Validators.required]),
      type2: new FormControl(),
      moves: new FormControl([], [Validators.required]),
      abilities: new FormControl([], [Validators.required]),
    })
    this.stats = {
      hp: 0,
      attack: 0,
      defense: 0,
      specialAttack: 0,
      specialDefense: 0,
      speed: 0,
    }
  }
  form: FormGroup
  stats: Stats

  numberError(){
    if(this.form.controls['number'].hasError('required'))
      return 'Name required'
    if(this.form.controls['number'].hasError('pattern'))
      return 'Must be a number'
    if(this.form.controls['number'].hasError('existsNumber'))
      return 'Pokemon exists'
    return ''
  }

  nameError(){
    if(this.form.controls['name'].hasError('required'))
      return 'Name required'
    if(this.form.controls['name'].hasError('minlength'))
      return 'Minimum 3 charaters'
    if(this.form.controls['name'].hasError('existsName'))
      return 'Pokemon exists'
    return ''
  }

  imageError(){
    if(this.form.controls['image'].hasError('required'))
      return 'Image required'
    return ''
  }

  action(){
    if(this.form.valid)
      this.dialogRef.close({...this.form.value, stats: this.stats})
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
