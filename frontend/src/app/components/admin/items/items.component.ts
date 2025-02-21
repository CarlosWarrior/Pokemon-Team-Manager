import { Component } from '@angular/core';
import { ItemModel } from '../../../interfaces/models'
import { ItemService } from 'src/app/services/item.service';
import { MatDialog } from '@angular/material/dialog';
import { ItemEditDialogComponent } from './dialogs/item-edit-dialog/item-edit-dialog.component';
import { ItemCreateDialogComponent } from './dialogs/item-create-dialog/item-create-dialog.component';
import { ItemDeleteDialogComponent } from './dialogs/item-delete-dialog/item-delete-dialog.component';
import { ItemBulkCreateComponent } from './dialogs/item-bulk-create/item-bulk-create.component';


@Component({
  selector: 'app-items',
  styleUrls: ['./items.component.scss'],
  templateUrl: './items.component.html',
})
export class ItemsComponent {
  displayedColumns: string[] = ['name', 'description', 'image'];
  items: ItemModel[] = [];
  selected: ItemModel[] = [];
  constructor(private itemService: ItemService, public dialog: MatDialog){
    this.itemService.getList()
    this.itemService.items.subscribe((items: ItemModel[]) => this.items = items)
  }
  
  isSelected(element: ItemModel){
    return this.selected.find(el => el.name == element.name)
  }
  
  handleSelect(element: ItemModel){
    if(this.isSelected(element))
      this.selected = this.selected.filter(el => el.name != element.name)
    else
      this.selected.push(element)
  }
  
  openCreateDialog(){
    const dialogRef = this.dialog.open(ItemCreateDialogComponent, {
      data: {
        itemNames: this.items.map((item: ItemModel) => item.name)
      }
    });
    
    dialogRef.afterClosed().subscribe((newItem: ItemModel) => {
      if(newItem)
        this.itemService.create(newItem)
    });
  }
  
  openEditDialog(){
    const dialogRef = this.dialog.open(ItemEditDialogComponent, {
      data: {
        item: this.selected[0],
        itemNames: this.items.map((item: ItemModel) => item.name).filter(it => it != this.selected[0].name)
      },
    });
    
    dialogRef.afterClosed().subscribe((editedItem: ItemModel) => {
      if(editedItem)
        this.itemService.edit(editedItem)
    });
  }
  
  openDeleteDialog(){
    const dialogRef = this.dialog.open(ItemDeleteDialogComponent, {
      data: this.selected
    });
    
    dialogRef.afterClosed().subscribe((deletedItems: ItemModel[]) => {
      if(deletedItems)
        this.itemService.delete(deletedItems.map((item: ItemModel) => item._id!))
    });
  }

  openBulkCreateDialog(){
    const dialogRef = this.dialog.open(ItemBulkCreateComponent);
    
    dialogRef.afterClosed().subscribe((data:any) => {
      if(data)
        this.itemService.bulk(data)
    });
  }
}