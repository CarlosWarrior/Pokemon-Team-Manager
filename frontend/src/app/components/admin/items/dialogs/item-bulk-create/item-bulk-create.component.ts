import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Dropzone, { DropzoneFile, DropzoneOptions } from 'dropzone';


@Component({
  selector: 'app-item-bulk-create',
  templateUrl: './item-bulk-create.component.html',
  styleUrls: ['./item-bulk-create.component.scss']
})
export class ItemBulkCreateComponent {
  constructor( public dialogRef: MatDialogRef<ItemBulkCreateComponent>,){}
  @ViewChild('dropzoneRef') dropzoneElement!: ElementRef;
  _dropzone!: Dropzone
  file: DropzoneFile | undefined
  name: string = ""
  acceptFiles: boolean = true

  ngAfterViewInit() {
    const dropzoneConfig: DropzoneOptions = {
      url: "/",
      autoProcessQueue: false,
      maxFilesize: 20,
      acceptedFiles: "application/json",
      maxFiles: 1,
    };
    
    this._dropzone = new Dropzone(this.dropzoneElement.nativeElement, dropzoneConfig);
    this._dropzone.on('addedfile', (file: any) => {
      this.name = file.upload.filename
      if(file.accepted || file.status != "error")
        this.file = file
      else
        this.remove()
    });

  }

  remove(){
    if(this.file){
      this._dropzone.removeFile(this.file)
      this.file = undefined
    }
  }

  action(){
    if(this.file){
      const formData = new FormData();
      formData.append('file', this.file);
      this.dialogRef.close(formData)
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}