import { Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbilityModel, MoveModel, Stats, TypeModel } from 'src/app/interfaces/models';

interface PokemonCreateDialogData{
  moveNames: String[];
  typeNames: String[];
  abilityNames: String[];
  pokemonNames: String[];
}
@Component({
  selector: 'app-pokemon-create-dialog',
  templateUrl: './pokemon-create-dialog.component.html',
  styleUrls: ['./pokemon-create-dialog.component.scss']
})
export class PokemonCreateDialogComponent {
  constructor( public dialogRef: MatDialogRef<PokemonCreateDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: PokemonCreateDialogData, ) {
    const uniqueValidator = (control: AbstractControl): ValidationErrors | null => this.data.pokemonNames.includes(control.value ) ? {exists: {value: control.value}} : null
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(32), uniqueValidator]),
      image: new FormControl("", [Validators.required]),
      type1: new FormControl("", [Validators.required]),
      type2: new FormControl(),
      moves: new FormControl([""], [Validators.required]),
      abilities: new FormControl([""], [Validators.required]),
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

  action(){
    if(this.form.valid)
      this.dialogRef.close({...this.form.value, stats: this.stats})
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
