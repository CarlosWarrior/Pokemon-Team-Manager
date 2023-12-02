import { Component } from '@angular/core';
import { MoveCategory, MoveModel, TypeModel } from '../../../interfaces/models'
import { MoveService } from 'src/app/services/move.service';
import { MatDialog } from '@angular/material/dialog';
import { MoveEditDialogComponent } from './dialogs/move-edit-dialog/move-edit-dialog.component';
import { MoveCreateDialogComponent } from './dialogs/move-create-dialog/move-create-dialog.component';
import { MoveDeleteDialogComponent } from './dialogs/move-delete-dialog/move-delete-dialog.component';
import { TypeService } from 'src/app/services/type.service';
@Component({
  selector: 'app-moves',
  templateUrl: './moves.component.html',
  styleUrls: ['./moves.component.scss']
})
export class MovesComponent {
  displayedColumns: string[] = [ "name", "type", "category", "power", "accuracy", "pp", "priority", "effect", ];
  moveCategories: MoveCategory[] = Object.values(MoveCategory)
  moves: MoveModel[] = [];
  types: TypeModel[] = [];
  selected: MoveModel[] = [];
  constructor(private moveService: MoveService, private typeService: TypeService, public dialog: MatDialog){
    this.moveService.getList()
    this.typeService.getList()
    this.moveService.moves.subscribe((moves: MoveModel[]) => this.moves = moves)
    this.typeService.types.subscribe((types: TypeModel[]) => this.types = types)
  }
  
  isSelected(element: MoveModel){
    return this.selected.find(el => el.name == element.name)
  }
  
  handleSelect(element: MoveModel){
    if(this.isSelected(element))
      this.selected = this.selected.filter(el => el.name != element.name)
    else
      this.selected.push(element)
  }
  
  openCreateDialog(){
    const dialogRef = this.dialog.open(MoveCreateDialogComponent, {
      data: { 
        
        moveNames: this.moves.map((move: MoveModel) => move.name),
        moveCategories: this.moveCategories,
        types: this.types,
      }
    });
    
    dialogRef.afterClosed().subscribe((newMove: MoveModel) => {
      if(newMove)
        this.moveService.create(newMove)
      this.unselect()
    });
  }
  
  openEditDialog(){
    const dialogRef = this.dialog.open(MoveEditDialogComponent, {
      data: {
        move: this.selected[0],
        moveNames: this.moves.map((move: MoveModel) => move.name).filter(ab => ab != this.selected[0].name),
        moveCategories: this.moveCategories,
        types: this.types,
      }
    });
    
    dialogRef.afterClosed().subscribe((editedMove: MoveModel) => {
      if(editedMove)
        this.moveService.edit(editedMove)
      this.unselect()
    });
  }
  
  openDeleteDialog(){
    const dialogRef = this.dialog.open(MoveDeleteDialogComponent, {
      data: this.selected
    });
    
    dialogRef.afterClosed().subscribe((deletedMoves: MoveModel[]) => {
      if(deletedMoves)
        this.moveService.delete(deletedMoves.map((move: MoveModel) => move._id!))
      this.unselect()
    });
  }

  unselect(){
    this.selected = []
  }
}