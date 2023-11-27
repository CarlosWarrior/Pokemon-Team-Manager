import { Component } from '@angular/core';
import { TypeModel } from '../../../interfaces/models'
import { TypeService } from 'src/app/services/type.service';
import { MatDialog } from '@angular/material/dialog';
import { TypeEditDialogComponent } from './dialogs/type-edit-dialog/type-edit-dialog.component';
import { TypeCreateDialogComponent } from './dialogs/type-create-dialog/type-create-dialog.component';
import { TypeDeleteDialogComponent } from './dialogs/type-delete-dialog/type-delete-dialog.component';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss']
})
export class TypesComponent {
  displayedColumns: string[] = [ 'name', 'image', 'teracrystalImage' ];
  types: TypeModel[] = [];
  selected: TypeModel[] = [];
  constructor(private typeService: TypeService, public dialog: MatDialog){
    this.typeService.getList()
    this.typeService.types.subscribe((types: TypeModel[]) => this.types = types)
  }
  
  isSelected(element: TypeModel){
    return this.selected.find(el => el.name == element.name)
  }
  
  handleSelect(element: TypeModel){
    if(this.isSelected(element))
      this.selected = this.selected.filter(el => el.name != element.name)
    else
      this.selected.push(element)
  }
  
  openCreateDialog(){
    const dialogRef = this.dialog.open(TypeCreateDialogComponent);
    
    dialogRef.afterClosed().subscribe((newType: TypeModel) => {
      if(newType)
        this.typeService.create(newType)
    });
  }
  
  openEditDialog(){
    const dialogRef = this.dialog.open(TypeEditDialogComponent, {
      data: this.selected[0],
    });
    
    dialogRef.afterClosed().subscribe((editedType: TypeModel) => {
      if(editedType)
        this.typeService.edit(editedType)
    });
  }
  
  openDeleteDialog(){
    const dialogRef = this.dialog.open(TypeDeleteDialogComponent, {
      data: this.selected
    });
    
    dialogRef.afterClosed().subscribe((deletedTypes: TypeModel[]) => {
      if(deletedTypes)
        this.typeService.delete(deletedTypes.map((type: TypeModel) => type._id!))
    });
  }
}