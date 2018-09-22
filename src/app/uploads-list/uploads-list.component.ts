// import { Component, OnInit } from '@angular/core';

// import { UploadFileService } from '../services/uploadfile.service';
// import { FileUpload } from '../form-upload/fileupload';

// import { Observable } from 'rxjs/Observable';

// @Component({
//   selector: 'uploads-list',
//   templateUrl: './uploads-list.component.html'
// })
// export class UploadsListComponent implements OnInit {

//   uploads: Observable<FileUpload[]>;
//   showSpinner = true;

//   constructor(private upSvc: UploadFileService) { }

//   ngOnInit() {
//     this.uploads = this.upSvc.getUploads();
//     this.uploads.subscribe(() => this.showSpinner = false);
//   }
// }
