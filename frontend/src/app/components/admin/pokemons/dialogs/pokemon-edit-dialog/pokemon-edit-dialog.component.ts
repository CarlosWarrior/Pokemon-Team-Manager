import { Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbilityModel, MoveModel, PokemonModel, Stats, TypeModel } from 'src/app/interfaces/models';

interface PokemonEditDialogData{
  moveNames: string[]
  typeNames: string[]
  abilityNames: string[]
  pokemonNames: string[]
  pokemonNumbers: string[]
  pokemon: PokemonModel
}
@Component({
  selector: 'app-pokemon-edit-dialog',
  templateUrl: './pokemon-edit-dialog.component.html',
  styleUrls: ['./pokemon-edit-dialog.component.scss']
})
export class PokemonEditDialogComponent {
  constructor( public dialogRef: MatDialogRef<PokemonEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: PokemonEditDialogData, ) {
    const uniquenameValidator = (control: AbstractControl): ValidationErrors | null => control.value != this.data.pokemon.name && this.data.pokemonNames.includes(control.value ) ? {existsName: {value: control.value}} : null
    const uniqueNumberValidator = (control: AbstractControl): ValidationErrors | null => control.value != this.data.pokemon.number && this.data.pokemonNumbers.includes(control.value ) ? {existsNumber: {value: control.value}} : null
    this.form = new FormGroup({
      name: new FormControl(this.data.pokemon.name, [Validators.required, Validators.minLength(3), Validators.maxLength(32), uniquenameValidator]),
      number: new FormControl(this.data.pokemon.number, [Validators.required, Validators.pattern("^[0-9]*$"), uniqueNumberValidator]),
      image: new FormControl(this.data.pokemon.image, [Validators.required]),
      type1: new FormControl(this.data.pokemon.type1, [Validators.required]),
      type2: new FormControl(this.data.pokemon.type2),
      moves: new FormControl(this.data.pokemon.moves, [Validators.required]),
      abilities: new FormControl(this.data.pokemon.abilities, [Validators.required]),
    })
    this.stats = this.data.pokemon.stats
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
    console.log(this.form.valid, this.form)
    if(this.form.valid)
      this.dialogRef.close({...this.form.value, stats: this.stats, _id: this.data.pokemon._id})
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}