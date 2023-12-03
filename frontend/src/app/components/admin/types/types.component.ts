import { Component } from '@angular/core';
import { TypeModel } from '../../../interfaces/models'
import { TypeService } from 'src/app/services/type.service';
import { MatDialog } from '@angular/material/dialog';
import { TypeEditDialogComponent } from './dialogs/type-edit-dialog/type-edit-dialog.component';
import { TypeCreateDialogComponent } from './dialogs/type-create-dialog/type-create-dialog.component';
import { TypeDeleteDialogComponent } from './dialogs/type-delete-dialog/type-delete-dialog.component';
import { TypeBulkCreateComponent } from './dialogs/type-bulk-create/type-bulk-create.component';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss']
})
export class TypesComponent {

  displayedColumns: string[] = [ 'name', 'image', 'teracrystalImage', 'color', 'attackAdvantage', 'defenseAdvantage', 'defenseWeakness' ];
  types: TypeModel[] = [];
  selected: TypeModel[] = [];
  constructor(private typeService: TypeService, public dialog: MatDialog){
    this.typeService.getList()
    this.typeService.types.subscribe((types: TypeModel[]) => this.types = types)
  }
  
  isSelected(element: TypeModel){
    return this.selected.find(el => el.name == element.name)
  }

  unselect(){
    this.selected = []
  }
  
  handleSelect(element: TypeModel){
    if(this.isSelected(element))
      this.selected = this.selected.filter(el => el.name != element.name)
    else
      this.selected.push(element)
  }
  
  openCreateDialog(){
    const dialogRef = this.dialog.open(TypeCreateDialogComponent, {
      data: { 
        typeNames: this.types.map((type: TypeModel) => type.name)

      }
    });
    
    dialogRef.afterClosed().subscribe((newType: TypeModel) => {
      if(newType)
        this.typeService.create(newType)
      this.unselect()
    });
  }
  
  openEditDialog(){
    const dialogRef = this.dialog.open(TypeEditDialogComponent, {
      data: {
        type: this.selected[0],
        typeNames: this.types.map((type: TypeModel) => type.name).filter(ab => ab != this.selected[0].name),

      }
    });
    
    dialogRef.afterClosed().subscribe((editedType: TypeModel) => {
      if(editedType)
        this.typeService.edit(editedType)
      this.unselect()
    });
  }
  
  openDeleteDialog(){
    const dialogRef = this.dialog.open(TypeDeleteDialogComponent, {
      data: this.selected
    });
    
    dialogRef.afterClosed().subscribe((deletedTypes: TypeModel[]) => {
      if(deletedTypes)
        this.typeService.delete(deletedTypes.map((type: TypeModel) => type._id!))

      this.unselect()
    });
  }
  
  openBulkCreateDialog(){
    const dialogRef = this.dialog.open(TypeBulkCreateComponent);
    
    dialogRef.afterClosed().subscribe((data: FormData) => {
      if(data)
        this.typeService.bulk(data)
    });
  }
}