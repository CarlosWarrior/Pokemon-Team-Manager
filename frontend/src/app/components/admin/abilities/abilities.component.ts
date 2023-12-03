import { Component } from '@angular/core';
import { AbilityModel } from 'src/app/interfaces/models';
import { AbilityService } from 'src/app/services/ability.service';
import { MatDialog } from '@angular/material/dialog';
import { AbilitiesCreateDialogComponent } from './dialogs/abilities-create-dialog/abilities-create-dialog.component';
import { AbilitiesEditDialogComponent } from './dialogs/abilities-edit-dialog/abilities-edit-dialog.component';
import { AbilitiesDeleteDialogComponent } from './dialogs/abilities-delete-dialog/abilities-delete-dialog.component';
import { AbilityBulkCreateComponent } from './dialogs/ability-bulk-create/ability-bulk-create.component';

@Component({
  selector: 'app-abilities',
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.scss']
})
export class AbilitiesComponent  {

  displayedColumns: string[] = [ 'name', 'effect' ];
  abilities: AbilityModel[] = [];
  selected: AbilityModel[] = [];
  constructor(private ablilityService: AbilityService, public dialog: MatDialog){
    this.ablilityService.getList()
    this.ablilityService.abilities.subscribe((abilities: AbilityModel[]) => this.abilities = abilities)
  }
  
  isSelected(ability: AbilityModel){
    return this.selected.find(ab => ab.name == ability.name)
  }

  unselect(){
    this.selected = []
  }
  
  handleSelect(ability: AbilityModel){
    if(this.isSelected(ability))
      this.selected = this.selected.filter(ab => ab.name != ability.name)
    else
      this.selected.push(ability)
  }
  
  openCreateDialog(){
    const dialogRef = this.dialog.open(AbilitiesCreateDialogComponent, {
      data: {
        abilityNames: this.abilities.map((ability: AbilityModel) => ability.name)
      }
    });
    
    dialogRef.afterClosed().subscribe((newAbility: AbilityModel) => {
      if(newAbility)
        this.ablilityService.create(newAbility)
        this.unselect()
      });
  }
  
  openEditDialog(){
    const dialogRef = this.dialog.open(AbilitiesEditDialogComponent, {
      data: {
        ability: this.selected[0],
        abilityNames: this.abilities.map((ability: AbilityModel) => ability.name).filter(ab => ab != this.selected[0].name)
      },
    });
    
    dialogRef.afterClosed().subscribe((editedAbility: AbilityModel) => {
      if(editedAbility)
        this.ablilityService.edit(editedAbility)
        this.unselect()
      });
  }
  
  openDeleteDialog(){
    const dialogRef = this.dialog.open(AbilitiesDeleteDialogComponent, {
      data: this.selected
    });
    
    dialogRef.afterClosed().subscribe((deletedAbilities: AbilityModel[]) => {
      if(deletedAbilities)
        this.ablilityService.delete(deletedAbilities.map((ability: AbilityModel) => ability._id!))
        this.unselect()
      });
  }

  openBulkCreateDialog(){
    const dialogRef = this.dialog.open(AbilityBulkCreateComponent);
    
    dialogRef.afterClosed().subscribe((data:any) => {
      if(data)
        this.ablilityService.bulk(data)
    });
  }

}
