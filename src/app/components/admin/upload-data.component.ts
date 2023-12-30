import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { FileUploadModule } from 'primeng/fileupload';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'upload-data',
  imports: [FileUploadModule],
  standalone: true,
  template: `
    <p-fileUpload
      mode="basic"
      chooseLabel="Choose"
      [customUpload]="true"
      name="demo[]"
      accept=".xlsx, .csv"
      (uploadHandler)="onUpload($event)"
    ></p-fileUpload>
  `,
  styles: [``],
})
export class UploadDataComponent implements OnInit, OnDestroy {
  constructor(private uploadService: FileUploadService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  onUpload(event){
    console.log(event);
    let fileToUpload = <File>event.files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.uploadService.uploadFile(formData).subscribe((res) => {
        console.log(res);
    });
  }
}
